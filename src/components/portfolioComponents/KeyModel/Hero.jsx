"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import KeyboardButton from "./KeyboardButton";

export default function Hero() {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{ alpha: true }}
        camera={{
          position: [0, 1.5, 6],
          fov: 35,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-5, 4, -5]}
          intensity={1}
        />

        <Environment preset="studio" />

        <KeyboardButton />
      </Canvas>
    </div>
  );
}