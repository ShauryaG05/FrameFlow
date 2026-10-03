import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Dynamic Flickering Candle Flame Mesh
function CandleFlame({ position = [0, 0, 0], isLit = true }) {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (!flameRef.current || !isLit) return;
    const t = state.clock.getElapsedTime() * 10;
    const flicker = Math.sin(t) * 0.15 + Math.cos(t * 1.7) * 0.1;
    const scaleFlicker = 1 + Math.sin(t * 1.3) * 0.12;

    flameRef.current.scale.set(scaleFlicker, scaleFlicker * 1.3, scaleFlicker);
    flameRef.current.position.x = position[0] + flicker * 0.02;
    flameRef.current.position.z = position[2] + Math.cos(t) * 0.02;

    if (lightRef.current) {
      lightRef.current.intensity = 1.8 + flicker * 0.8;
    }
  });

  if (!isLit) {
    // Soft smoke puff when extinguished
    return (
      <group position={position}>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#999999" transparent opacity={0.25} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      {/* Outer Glow Flame */}
      <mesh ref={flameRef} position={[0, 0.08, 0]}>
        <coneGeometry args={[0.06, 0.22, 16]} />
        <meshBasicMaterial color="#FFB703" />
      </mesh>

      {/* Inner Core Flame */}
      <mesh position={[0, 0.04, 0]}>
        <coneGeometry args={[0.03, 0.12, 16]} />
        <meshBasicMaterial color="#FFFBEB" />
      </mesh>

      {/* Warm Local PointLight */}
      <pointLight
        ref={lightRef}
        color="#FFAA33"
        intensity={2.2}
        distance={2.5}
        decay={2}
        position={[0, 0.15, 0]}
      />
    </group>
  );
}

// Procedural 3D Birthday Cake fallback & enhancement
function ProceduralCake({ isLit }) {
  const candlePositions = useMemo(
    () => [
      [0, 1.45, 0],
      [0.35, 1.45, 0.35],
      [-0.35, 1.45, 0.35],
      [0.35, 1.45, -0.35],
      [-0.35, 1.45, -0.35],
    ],
    []
  );

  return (
    <group position={[0, -0.5, 0]}>
      {/* Golden Plate */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.1, 48]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Bottom Cake Tier */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.7, 48]} />
        <meshStandardMaterial
          color="#FFF8E7"
          roughness={0.35}
        />
      </mesh>

      {/* Bottom Frosting Ring */}
      <mesh position={[0, 0.7, 0]}>
        <torusGeometry args={[1.22, 0.08, 16, 48]} />
        <meshStandardMaterial color="#FF6584" roughness={0.3} />
      </mesh>

      {/* Top Cake Tier */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.6, 48]} />
        <meshStandardMaterial
          color="#FFFDF7"
          roughness={0.35}
        />
      </mesh>

      {/* Top Frosting Drips */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.08, 48]} />
        <meshStandardMaterial color="#FF8FA3" roughness={0.25} />
      </mesh>

      {/* Decorative Strawberries / Cherries */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.65;
        const z = Math.sin(rad) * 0.65;
        return (
          <mesh key={i} position={[x, 1.33, z]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#D90429" roughness={0.2} />
          </mesh>
        );
      })}

      {/* Candles */}
      {candlePositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Wax Candle Stick */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#FFD166" : "#06D6A0"}
              roughness={0.2}
            />
          </mesh>
          {/* Flame */}
          <CandleFlame position={[0, 0.05, 0]} isLit={isLit} />
        </group>
      ))}
    </group>
  );
}

// GLTF Loaded Cake with fallback
function GLTFCakeModel({ isLit }) {
  try {
    const { scene } = useGLTF("/models/Birthday+Cake.glb");
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    return (
      <group position={[0, -0.6, 0]} scale={0.75}>
        <primitive object={clonedScene} />
        {/* Supplementary interactive candle flames */}
        <CandleFlame position={[0, 1.6, 0]} isLit={isLit} />
        <CandleFlame position={[0.4, 1.5, 0.3]} isLit={isLit} />
        <CandleFlame position={[-0.4, 1.5, -0.3]} isLit={isLit} />
      </group>
    );
  } catch (err) {
    // If GLTF fails or is unavailable, smoothly fallback to procedural cake
    return <ProceduralCake isLit={isLit} />;
  }
}

// Main 3D Canvas Scene
export default function Cake3D({ isLit = true, autoRotate = true }) {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 8, 5]} intensity={1.6} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#FFE4E6" />
      <pointLight position={[0, 3, 2]} intensity={isLit ? 1.5 : 0.4} color="#FFF176" />

      {/* Floating dynamic magic particles */}
      <Sparkles
        count={60}
        scale={4}
        size={isLit ? 3 : 1.5}
        speed={0.4}
        color={isLit ? "#FFD166" : "#A0AEC0"}
      />

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <GLTFCakeModel isLit={isLit} />
      </Float>

      <OrbitControls
        enableZoom={true}
        minDistance={2.5}
        maxDistance={6.5}
        maxPolarAngle={Math.PI / 2 + 0.1}
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
      />
    </Canvas>
  );
}
