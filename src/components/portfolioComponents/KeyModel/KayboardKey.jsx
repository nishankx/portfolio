"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Center, useAnimations, useGLTF } from "@react-three/drei";
import keyboardKeys from "../../../libs/keyboardKeys";

function KeyModel({ model, visible }) {
  const group = useRef();

  const { scene, animations } = useGLTF(model);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!visible) return;

    const action = Object.values(actions)[0];

    if (!action) return;

    action.stop();
    action.reset();

    action.setLoop(THREE.LoopOnce, 1);

    action.clampWhenFinished = true;

    action.timeScale = 1.5;

    const timer = setTimeout(() => {
      action.play();
    }, 2000);

    return () => clearTimeout(timer);

  }, [actions, visible]);

  return (
    <group
      ref={group}
      visible={visible}
    >
      <primitive
        object={clonedScene}
        scale={0.8}
        rotation={[0.5, 0.7, -0.45]}
      />
    </group>
  );
}

export default function KeyboardKey({ activeIndex }) {
  return (
    <Center>
      {keyboardKeys.map((key, index) => (
        <KeyModel
          key={key.id}
          model={key.model}
          visible={activeIndex === index}
        />
      ))}
    </Center>
  );
}

keyboardKeys.forEach((key) => {
  useGLTF.preload(key.model);
});