import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

function Headphones({ color }: { color: string }) {
  const { scene } = useGLTF("/models/product.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const material = object.material;

        if (Array.isArray(material)) {
          material.forEach((mat) => {
            if ("color" in mat) {
              mat.color.set(color);
            }
          });
        } else if ("color" in material) {
          material.color.set(color);
        }
      }
    });
  }, [scene, color]);

  return (
    <Center>
      <primitive object={scene} scale={6.5} />
    </Center>
  );
}

function Loading() {
  return (
    <Html center>
      <div className="loading" role="status" aria-live="polite">
        Loading 3D...
      </div>
    </Html>
  );
}

type ThreeSceneProps = {
  color: string;
  autoRotate: boolean;
  reducedMotion: boolean;
};

export default function ThreeScene({
  color,
  autoRotate,
  reducedMotion,
}: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.15]}
      frameloop="demand"
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <Suspense fallback={<Loading />}>
        <Headphones color={color} />
        <Environment preset="studio" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        autoRotate={autoRotate && !reducedMotion}
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}