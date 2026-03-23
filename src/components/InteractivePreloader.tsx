import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  Mesh,
  Points,
  ShaderMaterial,
  Vector3,
} from "three";

// GLSL Shaders
const vertexShader = `
uniform float uTime;
uniform vec3 uMousePos;
uniform float uEffectRadius;
uniform float uExplode;

varying vec3 vColor;
varying float vAlpha;

// Simplex 3D Noise 
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vColor = color;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    float distToMouse = distance(worldPos.xyz, uMousePos);
    
    // Влияние курсора (радиус растворения и оттяжки)
    float influence = 1.0 - smoothstep(0.0, uEffectRadius, distToMouse);
    
    // Idle дыхание
    float breathNoise = snoise(position * 1.5 + uTime * 0.4);
    vec3 idlePosition = position;
    idlePosition.z += breathNoise * 0.05;
    
    // Hover: Волочение (Draggable Physics) + Хаос (Melt)
    vec3 swirlNoise = vec3(
        snoise(position.yzx * 3.0 + uTime),
        snoise(position.zxy * 3.0 + uTime),
        snoise(position.xyz * 3.0 + uTime)
    );
    // Направление хаоса (плавление материи)
    vec3 meltDir = normalize(vec3(swirlNoise.x, swirlNoise.y, swirlNoise.z + 1.0));
    
    // Направление стягивания к курсору (волочение/Spring effect)
    vec3 toMouse = uMousePos - worldPos.xyz;
    // Комбинируем хаотичное выталкивание и пружинистое волочение за курсором
    vec3 dragOffset = toMouse * 0.8;
    vec3 hoverOffset = (meltDir * 1.5 + dragOffset) * influence * (1.0 - uExplode);
    
    // Transition: Кинематографичный Взрыв (Explosion)
    // Разлетаются от центра (0,0) мощно и хаотично во все стороны
    vec3 explodeDir = normalize(position + swirlNoise * 0.5);
    float explodeForce = uExplode * (15.0 + snoise(position * 5.0) * 10.0);
    vec3 explodeOffset = explodeDir * explodeForce;

    // Итоговая позиция
    vec3 newPosition = idlePosition + hoverOffset + explodeOffset;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Размер: при наведении "плавится" (уменьшается). При взрыве - растягивается/увеличивается.
    float baseSize = 14.0 + breathNoise * 6.0;
    gl_PointSize = baseSize * (1.0 / -mvPosition.z) * (1.0 - influence * 0.8) * (1.0 + uExplode * 2.0);
    
    // Opacity: исчезает под мышкой (плавится), а также полностью уходит в 0 при взрыве
    vAlpha = (1.0 - smoothstep(0.0, 0.8, influence)) * (1.0 - uExplode);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;
uniform float uExplode;

void main() {
    if (vAlpha <= 0.01) discard;

    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.1, 0.5, d);
    
    if (strength <= 0.01) discard;
    
    // Эффект Bloom: во время взрыва интенсивность света вырастает до "выбеливания" (flash)
    float bloomMultiplier = 2.0 + uExplode * 10.0;
    gl_FragColor = vec4(vColor * bloomMultiplier, strength * vAlpha);
}
`;

const PreloaderParticles = ({ exploding }: { exploding: boolean }) => {
  const materialRef = useRef<ShaderMaterial>(null);
  const hitMeshRef = useRef<Mesh>(null);
  const meshRef = useRef<Points>(null);
  
  const targetMousePos = useRef(new Vector3(9999, 9999, 9999));
  const currentMousePos = useRef(new Vector3(9999, 9999, 9999));
  const explodeProgress = useRef(0);

  const { raycaster, mouse, camera } = useThree();

  const geometry = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return new BufferGeometry();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1600, 400);

    ctx.fillStyle = 'white';
    ctx.font = '900 240px Inter, sans-serif'; // $10,000 Style: Bold & Tight
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    canvas.style.letterSpacing = '-0.05em'; 
    ctx.fillText('Точка Связи', 800, 200);

    const imgData = ctx.getImageData(0, 0, 1600, 400).data;
    const positions = [];
    const colors = [];
    const brandYellow = new Color("#F2FF00");

    // Sample pixels densely for 15k-20k points
    for (let y = 0; y < 400; y += 3) {
      for (let x = 0; x < 1600; x += 3) {
        const idx = (y * 1600 + x) * 4;
        const brightness = imgData[idx]; 
        
        if (brightness > 128) {
          // Generate 2 points per bright pixel for depth / volume
          for(let p = 0; p < 2; p++) {
             // Coordinate scaling
             const px = (x - 800) * 0.0035 + (Math.random() - 0.5) * 0.02;
             const py = -(y - 200) * 0.0035 + (Math.random() - 0.5) * 0.02;
             const pz = (Math.random() - 0.5) * 0.15;

             positions.push(px, py, pz);

             const shade = 0.7 + Math.random() * 0.3;
             colors.push(brandYellow.r * shade, brandYellow.g * shade, brandYellow.b * shade);
          }
        }
      }
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMousePos: { value: new Vector3(9999, 9999, 9999) },
    uEffectRadius: { value: 1.5 }, 
    uExplode: { value: 0 },
  }), []);

  useFrame((state, delta) => {
    if (!exploding) {
       raycaster.setFromCamera(mouse, camera);
       if (hitMeshRef.current) {
           const intersects = raycaster.intersectObject(hitMeshRef.current);
           if (intersects.length > 0) {
               targetMousePos.current.copy(intersects[0].point);
           } else {
               targetMousePos.current.set(9999, 9999, 9999);
           }
       }
    } else {
       // Если идет взрыв, курсор улетает, а взрыв прогрессирует
       targetMousePos.current.set(9999, 9999, 9999);
       explodeProgress.current = MathUtils.lerp(explodeProgress.current, 1.0, delta * 2.5);
    }

    // Мягкая физика (Spring effect)
    currentMousePos.current.lerp(targetMousePos.current, delta * 8.0);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMousePos.value.copy(currentMousePos.current);
      materialRef.current.uniforms.uExplode.value = explodeProgress.current;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.05}>
      <group>
        <points ref={meshRef} geometry={geometry}>
          <shaderMaterial
            ref={materialRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent
            vertexColors
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>

        {!exploding && (
            <mesh ref={hitMeshRef} visible={false} position={[0, 0, 0.1]}>
                <planeGeometry args={[10, 4]} />
                <meshBasicMaterial />
            </mesh>
        )}
      </group>
    </Float>
  );
};

export default function InteractivePreloader({ onFinish }: { onFinish: () => void }) {
  const [exploding, setExploding] = useState(false);
  const finishTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (finishTimeoutRef.current !== null) {
        window.clearTimeout(finishTimeoutRef.current);
      }
    };
  }, []);

  const handleStart = () => {
     if (exploding) {
       return;
     }

     setExploding(true);
     // Через 1.5 секунды взрыва, когда opacity ушло в 0, размонтируем
     finishTimeoutRef.current = window.setTimeout(() => {
        onFinish();
     }, 1500);
  };

  return (
     <motion.div 
       className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden pointer-events-auto"
       initial={{ opacity: 1 }}
       animate={{ opacity: exploding ? 0 : 1 }}
       transition={{ duration: 1.5, ease: "easeInOut" }}
     >
       <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
             <PreloaderParticles exploding={exploding} />
          </Canvas>
       </div>
       
       <div className="absolute bottom-20 z-10">
          <AnimatePresence>
            {!exploding && (
               <motion.button
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                 transition={{ duration: 0.8, delay: 0.5 }}
                 onClick={handleStart}
                 disabled={exploding}
                 className="group px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg
                            backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]
                            hover:bg-white/10 hover:shadow-[0_0_40px_rgba(242,255,0,0.2)] 
                            transition-all duration-300 pointer-events-auto cursor-pointer flex items-center gap-2"
               >
                 Узнать, что такое Точка Связи
                 <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
               </motion.button>
            )}
          </AnimatePresence>
       </div>
     </motion.div>
  );
}
