import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EarthModel } from "./EarthModel";
import { earthLayers } from "../data/layers";

interface EarthSceneProps {
  selectedLayer: string | null;
  onSelectLayer: (id: string | null) => void;
  cutaway: boolean;
}

export function EarthScene({ selectedLayer, onSelectLayer, cutaway }: EarthSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 7], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -3, 2]} intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fbbf24" distance={5} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <EarthModel
        layers={earthLayers}
        selectedLayer={selectedLayer}
        onSelectLayer={onSelectLayer}
        cutaway={cutaway}
      />
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={15}
        enableDamping
        dampingFactor={0.05}
        autoRotate={!selectedLayer}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
