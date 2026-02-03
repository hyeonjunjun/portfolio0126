"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    Float,
    MeshTransmissionMaterial,
    Environment,
    PerspectiveCamera,
    Text,
    Center
} from '@react-three/drei'
import * as THREE from 'three'

const SunriseShader = {
    uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#FDB9C8') }, // Pink
        uColorB: { value: new THREE.Color('#FFDAB9') }, // Peach/Orange
        uResolution: { value: new THREE.Vector2() }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;

    void main() {
      // Soft organic flow for the background
      float flow = sin(vUv.x * 2.0 + uTime * 0.5) * 0.1;
      float gradient = smoothstep(0.0, 1.0, vUv.y + flow);
      
      vec3 color = mix(uColorA, uColorB, gradient);
      
      // Subtle atmospheric noise
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      color += (noise - 0.5) * 0.02;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
}

function Atmosphere() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial
            material.uniforms.uTime.value = state.clock.getElapsedTime()
            // Subtle mouse-based color shift
            material.uniforms.uColorA.value.lerp(new THREE.Color(state.mouse.x > 0 ? '#FDB9C8' : '#FFDAB9'), 0.01)
        }
    })

    return (
        <mesh ref={meshRef} scale={[100, 100, 1]}>
            <planeGeometry />
            <shaderMaterial
                {...SunriseShader}
                side={THREE.BackSide}
                transparent
            />
        </mesh>
    )
}

function Seed() {
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005
            meshRef.current.rotation.z += 0.002
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
        }
        if (groupRef.current) {
            // Parallax effect: follow mouse with lag
            const targetX = state.mouse.x * 0.5
            const targetY = state.mouse.y * 0.5
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
        }
    })

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[1, 0.4, 128, 32]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={1}
                        chromaticAberration={0.1}
                        anisotropy={0.1}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.2}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor="#ffffff"
                        color="#ffffff"
                    />
                </mesh>
            </Float>
        </group>
    )
}

function KomorebiGobo() {
    const lightRef = useRef<THREE.SpotLight>(null)

    useFrame((state) => {
        if (lightRef.current) {
            // Swaying trees effect + mouse reaction
            const t = state.clock.getElapsedTime()
            lightRef.current.position.x = 5 + Math.sin(t * 0.2) * 2 + state.mouse.x * 2
            lightRef.current.position.y = 5 + Math.cos(t * 0.3) * 2 + state.mouse.y * 2
        }
    })

    return (
        <group>
            <spotLight
                ref={lightRef}
                position={[5, 5, 5]}
                angle={0.5}
                penumbra={0.5}
                intensity={200}
                castShadow
                color="#fff4e6"
            />
        </group>
    )
}

export default function KomorebiBackground() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-zinc-950 overflow-hidden">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Soft fill light */}
                <ambientLight intensity={0.5} />

                {/* The Atmospheric Base */}
                <Atmosphere />

                {/* The "High Potential" Seed */}
                <Seed />

                {/* The Dappled Light effect (Komorebi) */}
                <KomorebiGobo />

                <Environment preset="sunset" />
            </Canvas>
        </div>
    )
}
