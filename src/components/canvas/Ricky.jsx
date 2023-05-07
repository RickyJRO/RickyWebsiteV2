import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Model from "./Model";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  return <Model position={[0.025, -1.5, 0]} />;
};

const Ricky = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 2, 12.25], fov: 4 }}>
      <ambientLight intensity={0.7} />
      <directionalLight
        color={"rgb(26, 219, 250)"}
        intensity={3}
        position={[-30, 5, -15]}
      />

      <Suspense fallback={<CanvasLoader />}>
        <Model position={[0.025, -1.5, 0]} />
      </Suspense>
      <OrbitControls
        enableDamping={false}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default Ricky;
