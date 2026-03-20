import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const GlassSphere = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.3}
          anisotropy={0.2}
          distortion={0.5}
          distortionScale={0.4}
          temporalDistortion={0.2}
          roughness={0}
          color={color}
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} position={[2, 0.5, -1]} scale={0.6}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
};

const FloatingBox = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={[-2.2, -0.3, -0.5]} scale={0.55}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#4488ff" />
      <pointLight position={[-5, 3, 2]} intensity={0.5} color="#8844ff" />
      <spotLight position={[0, 8, 0]} intensity={0.6} angle={0.5} penumbra={1} color="#ffffff" />
      
      <GlassSphere position={[0, 0.2, 0]} scale={1.5} color="#1a1a3e" />
      <FloatingTorus />
      <FloatingBox />
      
      <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={2.5} far={4} />
      <Environment preset="night" />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
