import React, { useRef, useEffect } from 'react';
import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const PAWN_HEIGHT = 0.08;
const PAWN_RADIUS = 0.03;
const ANIMATION_SPEED = 0.1;

export default function PawnModel({ color = 'red', position }) {
  const groupRef = useRef();
  const targetPosition = useRef(new Vector3()).current;

  // Set the initial position and update the target when the prop changes
  useEffect(() => {
    const [x, y, z] = position;
    targetPosition.set(x, y + PAWN_HEIGHT / 2, z);

    // Set initial position without animation
    if (!groupRef.current.userData.initialized) {
      groupRef.current.position.copy(targetPosition);
      groupRef.current.userData.initialized = true;
    }
  }, [position, targetPosition]);

  // Animate the pawn's movement on each frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(targetPosition, ANIMATION_SPEED);
    }
  });

  return (
    <group ref={groupRef}>
      <Cylinder args={[PAWN_RADIUS, PAWN_RADIUS, PAWN_HEIGHT, 16]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
    </group>
  );
}
