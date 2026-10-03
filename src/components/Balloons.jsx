import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Balloons({
  position = [0, 0, 0],
  color = "#FF4D6D",
  scale = 1,
  speed = 1,
}) {
  const groupRef = useRef();
  const initialY = position[1];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    
    // Gentle floating and swaying animation
    groupRef.current.position.y = initialY + Math.sin(t * 1.5) * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.9) * 0.05;
    groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main Balloon Sphere (slightly elongated) */}
      <mesh position={[0, 0, 0]} scale={[1, 1.22, 1]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Balloon Knot */}
      <mesh position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Balloon String */}
      <mesh position={[0, -2.1, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 2, 8]} />
        <meshBasicMaterial color="#ffffff" opacity={0.4} transparent />
      </mesh>
    </group>
  );
}
