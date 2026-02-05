import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { EarthLayer } from "../data/layers";

interface EarthModelProps {
  layers: EarthLayer[];
  selectedLayer: string | null;
  onSelectLayer: (id: string | null) => void;
  cutaway: boolean;
}

function LayerSphere({
  layer,
  isSelected,
  isAnySelected,
  onSelect,
  cutaway,
}: {
  layer: EarthLayer;
  isSelected: boolean;
  isAnySelected: boolean;
  onSelect: () => void;
  cutaway: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const opacity = isAnySelected ? (isSelected ? 0.95 : 0.15) : 0.85;

  const geometry = useMemo(() => {
    if (cutaway) {
      return new THREE.SphereGeometry(
        layer.radius,
        64,
        64,
        0,
        Math.PI * 1.5,
        0,
        Math.PI
      );
    }
    return new THREE.SphereGeometry(layer.radius, 64, 64);
  }, [layer.radius, cutaway]);

  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.scale.setScalar(
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
        );
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03
      );
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <meshPhongMaterial
          color={layer.colorHex}
          transparent
          opacity={opacity}
          side={cutaway ? THREE.DoubleSide : THREE.FrontSide}
          shininess={30}
          emissive={layer.colorHex}
          emissiveIntensity={isSelected ? 0.4 : 0.1}
        />
      </mesh>
      {isSelected && (
        <mesh ref={glowRef} geometry={geometry}>
          <meshBasicMaterial
            color={layer.glowColor}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

export function EarthModel({
  layers,
  selectedLayer,
  onSelectLayer,
  cutaway,
}: EarthModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Reverse so inner layers render first (correct z-ordering)
  const sortedLayers = useMemo(() => [...layers].reverse(), [layers]);

  return (
    <group ref={groupRef}>
      {sortedLayers.map((layer) => (
        <LayerSphere
          key={layer.id}
          layer={layer}
          isSelected={selectedLayer === layer.id}
          isAnySelected={selectedLayer !== null}
          onSelect={() =>
            onSelectLayer(selectedLayer === layer.id ? null : layer.id)
          }
          cutaway={cutaway}
        />
      ))}
    </group>
  );
}
