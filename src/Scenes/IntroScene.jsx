import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Balloons from "../components/Balloons";

function Particles() {
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <sphereGeometry args={[4, 32, 32]} />

      <pointsMaterial
        color="white"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function IntroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 50,
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#FF758F" />

      <Particles />
      <Balloons position={[2.2, 0.2, 0]} color="#FF4D6D" scale={0.9} speed={1.2} />
      <Balloons position={[-2.4, -0.4, -1]} color="#70D6FF" scale={0.75} speed={0.9} />
      <Balloons position={[2.8, -1.2, -1.5]} color="#FFD166" scale={0.65} speed={0.8} />

      
    </Canvas>
  );
}