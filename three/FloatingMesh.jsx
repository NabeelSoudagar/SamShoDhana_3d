import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function FloatingMesh() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Smooth float
    meshRef.current.position.y = Math.sin(t) * 0.3;
    meshRef.current.rotation.y += 0.005;

    // Hover scale effect
    meshRef.current.scale.lerp(
      hovered ? { x: 1.4, y: 1.4, z: 1.4 } : { x: 1.2, y: 1.2, z: 1.2 },
      0.1
    );
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={hovered ? "#22d3ee" : "#7c3aed"}
        emissive={hovered ? "#0891b2" : "#4c1d95"}
        metalness={0.7}
        roughness={0.2}
      />

      {/* Floating Gen-Z Label */}
      {hovered && (
        <Html center>
          <div className="px-4 py-2 rounded-xl bg-black/70 text-white text-sm backdrop-blur">
            SamShoDhana ⚡
          </div>
        </Html>
      )}
    </mesh>
  );
}
