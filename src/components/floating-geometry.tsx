import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Mesh, BufferGeometry, Material } from "three";

const FloatingGeometry = () => {
    const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x =
                Math.sin(state.clock.elapsedTime) * 0.1;
            meshRef.current.rotation.y =
                Math.cos(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={[2, 2, 2]}>
                <octahedronGeometry />
                <meshStandardMaterial
                    color="#6366f1"
                    roughness={0.1}
                    metalness={0.8}
                    envMapIntensity={1}
                />
            </mesh>
        </Float>
    );
};

const SceneContainer: React.FC = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingGeometry />
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    );
};

export default SceneContainer;
