import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import InteractiveTextLogo from "./InteractiveTextLogo";

const Scene = () => {
  return (
    <>
      <InteractiveTextLogo />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
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
