"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

// --- GHIBLI PUFFY CLOUDS ---
// Using layered spheres with varying opacity to create volume
function Cloud({ position, scale, opacity = 0.8, speed = 0.1 }: { position: [number, number, number], scale: number, opacity?: number, speed?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const initialPos = useRef(new THREE.Vector3(...position));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Slow horizontal drift
            groupRef.current.position.x = initialPos.current.x + Math.sin(time * speed) * 2;
            // Subtle vertical bobbing
            groupRef.current.position.y = initialPos.current.y + Math.cos(time * speed * 0.5) * 0.5;
        }
    });

    // Create a "cluster" of spheres for a puffy cumulus look
    const puffs = useMemo(() => {
        return [
            { pos: [0, 0, 0], s: 1 },
            { pos: [0.7, 0.3, -0.2], s: 0.85 },
            { pos: [-0.7, -0.2, 0.2], s: 0.75 },
            { pos: [0.4, -0.5, 0.3], s: 0.65 },
            { pos: [-0.5, 0.5, -0.3], s: 0.55 },
            { pos: [1.2, -0.1, -0.1], s: 0.6 },
            { pos: [-1.1, 0.2, 0.1], s: 0.5 },
        ];
    }, []);

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {puffs.map((p, i) => (
                <mesh key={i} position={p.pos as [number, number, number]} scale={p.s}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={opacity}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
}

// --- SUN-GLINT PARTICLES (Ghibli Sparkle) ---
function SunGlint() {
    const count = 40;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const particles = useMemo(() => {
        return Array.from({ length: count }, () => ({
            pos: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, Math.random() * 5],
            vel: [(Math.random() - 0.5) * 0.002, Math.random() * 0.002 + 0.001, 0],
            phase: Math.random() * Math.PI * 2,
            size: Math.random() * 0.03 + 0.01
        }));
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        particles.forEach((p, i) => {
            p.pos[0] += p.vel[0];
            p.pos[1] += p.vel[1];

            if (p.pos[1] > 10) p.pos[1] = -10;
            if (p.pos[0] > 10) p.pos[0] = -10;
            if (p.pos[0] < -10) p.pos[0] = 10;

            const scale = p.size * (1 + Math.sin(time * 2 + p.phase) * 0.5);
            dummy.position.set(p.pos[0], p.pos[1], p.pos[2]);
            dummy.scale.setScalar(scale);
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });
        if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 4, 4]} />
            <meshBasicMaterial color="#fffae6" transparent opacity={0.6} />
        </instancedMesh>
    );
}

// --- MEADOW BLOOMS (Soft Focal Plane with "Summer Breeze") ---
function MeadowBloom({ color, position, scale, opacity = 0.2 }: { color: string, position: [number, number, number], scale: number, opacity?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPos = useRef(new THREE.Vector3(...position));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Swaying breeze motion
            meshRef.current.position.x = initialPos.current.x + Math.sin(time * 0.4 + position[1]) * 0.3;
            meshRef.current.position.y = initialPos.current.y + Math.cos(time * 0.3 + position[0]) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
        </mesh>
    );
}

// --- VIBRANT GHIBLI SKY ---
function GhibliSky() {
    return (
        <mesh scale={[100, 100, 1]} position={[0, 0, -20]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    void main() {
                        vec3 top = vec3(0.0, 0.47, 0.85); // Vibrant Ghibli Blue
                        vec3 middle = vec3(0.35, 0.72, 0.96); // Summer Sky
                        vec3 bottom = vec3(0.9, 0.98, 1.0); // Horizon White
                        
                        vec3 color;
                        if (vUv.y > 0.5) {
                            color = mix(middle, top, (vUv.y - 0.5) * 2.0);
                        } else {
                            color = mix(bottom, middle, vUv.y * 2.0);
                        }
                        
                        gl_FragColor = vec4(color, 1.0);
                    }
                `}
            />
        </mesh>
    );
}

export default function SonicMistBackground() {
    return (
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-[#e0f2fe]">
            <Canvas
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
                <GhibliSky />

                {/* FAR CLOUDS */}
                <Cloud position={[8, 3, -15]} scale={4} opacity={0.4} speed={0.05} />
                <Cloud position={[-10, 4, -12]} scale={5} opacity={0.3} speed={0.04} />

                {/* MAIN PUFFY CLOUDS */}
                <Cloud position={[-6, 2, -6]} scale={3.5} opacity={0.8} speed={0.12} />
                <Cloud position={[7, 3, -8]} scale={4.5} opacity={0.75} speed={0.1} />
                <Cloud position={[0, -1, -10]} scale={7} opacity={0.45} speed={0.07} />
                <Cloud position={[-12, -2, -14]} scale={6} opacity={0.3} speed={0.05} />

                {/* MEADOW BLOOMS (Foreground depth) */}
                <MeadowBloom color="#fb923c" position={[-8, -5, 2]} scale={3.5} opacity={0.2} />
                <MeadowBloom color="#f472b6" position={[9, -6, 1]} scale={4.5} opacity={0.15} />
                <MeadowBloom color="#facc15" position={[-3, -7, 4]} scale={2.5} opacity={0.18} />
                <MeadowBloom color="#fb923c" position={[4, -5, 5]} scale={3} opacity={0.12} />
                <MeadowBloom color="#f472b6" position={[-10, 2, 3]} scale={5} opacity={0.05} />

                <SunGlint />

                <EffectComposer>
                    <Bloom intensity={0.6} luminanceThreshold={0.8} mipmapBlur />
                    <Noise opacity={0.01} />
                    <Vignette eskil={false} offset={0.1} darkness={0.2} />
                </EffectComposer>
            </Canvas>

            {/* ATMOSPHERIC OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/5 via-transparent to-white/5 pointer-events-none" />
            <div className="absolute inset-0 backdrop-blur-[2px] opacity-[0.05] pointer-events-none" />
        </div>
    );
}
