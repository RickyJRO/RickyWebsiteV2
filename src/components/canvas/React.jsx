import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const ReactModel = () => {
  const earth = useGLTF("./react_logo.glb");

  return (
    <primitive object={earth.scene} scale={2.3} position-y={0} rotation-y={0} />
  );
};

const ReactCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 115,
        position: [-4, 3, 6],
      }}
    >
      <directionalLight
        color={"rgb(26, 219, 250)"}
        intensity={1}
        position={[-30, 5, -15]}
      />

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ReactModel />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ReactCanvas;
