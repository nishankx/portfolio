"use client";

import { useEffect, useState } from "react";
import KeyboardKey from "./KayboardKey";

export default function KeyboardButton() {
  const [currentKey, setCurrentKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKey((prev) => (prev + 1) % 3);
    }, 2450);

    return () => clearInterval(interval);
  }, []);

  return <KeyboardKey activeIndex={currentKey} />;
}