import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Mesh,
  ShaderMaterial,
  Vector3,
} from "three";

// Vertex Shader: Localized melting and dissolve based on uMousePos (3D distance)
const vertexShader = `
uniform float uTime;
uniform vec3 uMousePos;
uniform float uEffectRadius;

varying vec3 vColor;
varying float vAlpha;

// Simplex 3D Noise (Simplex Noise)
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
    
    // Influence: 1.0 directly under mouse, 0.0 at edge of effect
    float influence = 1.0 - smoothstep(0.0, uEffectRadius, distToMouse);
    
    // No idle animation — particles stay perfectly still
    vec3 newPosition = position;
    
    // Only activate on hover (when mouse is near)
    if (influence > 0.001) {
        float breathNoise = snoise(position * 1.5 + uTime * 0.4);
        vec3 swirlNoise = vec3(
            snoise(position.yzx * 3.0 + uTime),
            snoise(position.zxy * 3.0 + uTime),
            snoise(position.xyz * 3.0 + uTime)
        );
        
        vec3 explodeDir = normalize(vec3(swirlNoise.x, swirlNoise.y, swirlNoise.z + 1.5));
        float expandDist = (1.5 + breathNoise * 2.0) * influence;
        newPosition = position + explodeDir * expandDist;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Particle size
    float baseSize = 15.0;
    gl_PointSize = baseSize * (1.0 / -mvPosition.z) * (1.0 - influence * 0.95);
    
    // Opacity: fade out under mouse
    vAlpha = 1.0 - smoothstep(0.0, 0.8, influence);
}
`;

// Fragment Shader: Soft glowing dots (Bloom effect representation)
const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    if (vAlpha <= 0.01) discard;

    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.1, 0.5, d);
    if (strength <= 0.01) discard;
    
    // Эффект интенсивного свечения "пересвета"
    gl_FragColor = vec4(vColor * 2.0, strength * vAlpha);
}
`;

const InteractiveTextLogo = () => {
  const materialRef = useRef<ShaderMaterial>(null);
  const hitMeshRef = useRef<Mesh>(null);
  
  // Координаты мыши в 3D для Raycaster
  const targetMousePos = useRef(new Vector3(9999, 9999, 9999));
  const currentMousePos = useRef(new Vector3(9999, 9999, 9999));

  const { raycaster, mouse, camera } = useThree();

  // Сэмплирование текста через Canvas API
  const geometry = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return new BufferGeometry();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1600, 400);

    ctx.fillStyle = 'white';
    ctx.font = '900 220px Inter, sans-serif'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Имитация tracking-tighter
    canvas.style.letterSpacing = '-0.05em';
    
    ctx.fillText('Точка Связи', 800, 200);

    const imgData = ctx.getImageData(0, 0, 1600, 400).data;
    const positions = [];
    const colors = [];
    
    const brandYellow = new Color("#F2FF00");

    // Сканируем пиксели канваса (с шагом для оптимизации)
    for (let y = 0; y < 400; y += 3) {
      for (let x = 0; x < 1600; x += 3) {
        const idx = (y * 1600 + x) * 4;
        const brightness = imgData[idx]; // берем R канал
        
        if (brightness > 128) {
          // Создаем кластер частиц на основе этого пикселя для "объема"
          for(let p = 0; p < 2; p++) {
             // Преобразуем координаты 2D в 3D пространство (масштаб под экран)
             const px = (x - 800) * 0.0036 + (Math.random() - 0.5) * 0.02;
             const py = -(y - 200) * 0.0036 + (Math.random() - 0.5) * 0.02;
             // Легкий разброс по Z для плотного объема
             const pz = (Math.random() - 0.5) * 0.15;

             positions.push(px, py, pz);

             // Вариация желтого оттенка для реалистичности неона
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
    uEffectRadius: { value: 1.5 }, // Радиус "дыры" или растворения
  }), []);

  useFrame((state, delta) => {
    raycaster.setFromCamera(mouse, camera);
    if (hitMeshRef.current) {
      const intersects = raycaster.intersectObject(hitMeshRef.current);
      if (intersects.length > 0) {
        targetMousePos.current.copy(intersects[0].point);
      } else {
        targetMousePos.current.set(9999, 9999, 9999);
      }
    }

    // Легкая задержка следования мыши, чтобы анимация была жидкостной
    currentMousePos.current.lerp(targetMousePos.current, delta * 12);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMousePos.value.copy(currentMousePos.current);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.05}>
      <group>
        <points geometry={geometry}>
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

        {/* Невидимая плоскость-триггер (hitbox) для просчета позиции мыши поверх текста */}
        <mesh ref={hitMeshRef} visible={false} position={[0, 0, 0.1]}>
            <planeGeometry args={[10, 4]} />
            <meshBasicMaterial />
        </mesh>
      </group>
    </Float>
  );
};

export default InteractiveTextLogo;
