import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

export default function ButterflyParticles() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>(null);
    const rendererRef = useRef<THREE.WebGLRenderer>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const animationIdRef = useRef<number>(null);
    const composerRef = useRef<EffectComposer>(null);
    const [isRotating, setIsRotating] = useState(true);

    // Custom shader for film grain + vignette
    const filmGrainShader = {
        uniforms: {
            tDiffuse: { value: null },
            time: { value: 0 },
            grainIntensity: { value: 0.15 },
            vignetteStrength: { value: 0.5 }
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float time;
      uniform float grainIntensity;
      uniform float vignetteStrength;
      varying vec2 vUv;
      
      float random(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec4 color = texture2D(tDiffuse, vUv);
        
        // Film grain
        float grain = random(vUv * time) * grainIntensity;
        color.rgb += grain;
        
        // Vignette
        vec2 center = vUv - 0.5;
        float vignette = 1.0 - dot(center, center) * vignetteStrength;
        color.rgb *= vignette;
        
        gl_FragColor = color;
      }
    `
    };

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505); // Deep dark
        scene.fog = new THREE.Fog(0x050505, 5, 20);
        sceneRef.current = scene;

        // Camera setup - closer and more focused
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            100
        );
        // Adjusted position to frame the butterfly well
        camera.position.set(0, 0, 12);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ReinhardToneMapping;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Post-processing setup
        const composer = new EffectComposer(renderer);
        composerRef.current = composer;

        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Bloom
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.5,  // strength (Reduced from 1.5)
            0.4,  // radius
            0.1   // threshold
        );
        composer.addPass(bloomPass);

        // Grain
        const filmPass = new ShaderPass(filmGrainShader);
        composer.addPass(filmPass);

        // --- BUTTERFLY PARTICLES ---

        const createButterfly = (count: number, color: THREE.Color, scaleVal: number) => {
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const sizes = new Float32Array(count);

            const c = new THREE.Color(color);

            for (let i = 0; i < count; i++) {
                // Templeton Butterfly Parametric Equation
                // t goes from 0 to 12*PI usually for full shape
                const t = Math.random() * Math.PI * 12; // Random sampling for organic feel

                // Basic parametric
                const e_cos_t = Math.exp(Math.cos(t));
                const cos_4t = 2 * Math.cos(4 * t);
                const sin_power = Math.pow(Math.sin(t / 12), 5);

                const r = e_cos_t - 2.5 * cos_4t + sin_power; // 2.5 multiplier for wider wings

                // 3D coordinates
                // We map x/y to the butterfly shape
                let x = Math.sin(t) * r;
                let y = Math.cos(t) * r;

                // Z-depth: give it volume based on wing position
                // Wings are roughly at |x| > something. Lets give it thickness.
                // We use Math.abs(x) to curve wings backward/forward
                let z = (Math.random() - 0.5) * 0.5 + Math.abs(x) * 0.3 * Math.sin(t);

                // Scale
                x *= scaleVal;
                y *= scaleVal;
                z *= scaleVal;

                // Center offset (butterfly center isn't exactly 0,0 usually, adjust y)
                y -= scaleVal * 1.5;

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                colors[i * 3] = c.r;
                colors[i * 3 + 1] = c.g;
                colors[i * 3 + 2] = c.b;

                sizes[i] = 0.02 + Math.random() * 0.04;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: 0.1,
                vertexColors: true,
                transparent: true,
                opacity: 0.4, // Reduced from 0.8
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });

            return new THREE.Points(geometry, material);
        };

        // Main Wings (Detailed) - Dimmer white
        const butterfly = createButterfly(8000, new THREE.Color("#888888"), 0.8);
        scene.add(butterfly);

        // Inner Glow Wings (Smaller, denser) - Dimmer grey
        const innerButterfly = createButterfly(4000, new THREE.Color("#444444"), 0.5);
        scene.add(innerButterfly);

        // Ambient Dust
        const createStars = (count: number) => {
            const positions = new Float32Array(count * 3);
            const sizes = new Float32Array(count);
            for (let i = 0; i < count; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Depth
                sizes[i] = Math.random() * 0.02;
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const mat = new THREE.PointsMaterial({ color: 0x444444, size: 0.05, transparent: true, opacity: 0.4 });
            return new THREE.Points(geo, mat);
        }
        const stars = createStars(1000);
        scene.add(stars);


        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            targetRotationY = mouseX * 0.3; // More rotation
            targetRotationX = mouseY * 0.2;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Animation
        let time = 0;
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            time += 0.005;

            if (isRotating) {
                // Butterfly specific motion
                // Flapping wing effect (Simple scale on X? Or vertex shader?)
                // Simple Vertex manipulation is expensive in JS loop for 12k particles.
                // We'll rotate the whole group slightly to simulate life.

                butterfly.rotation.y = Math.sin(time * 0.5) * 0.05; // Gentle sway
                innerButterfly.rotation.y = Math.sin(time * 0.5) * 0.05;

                // Breathe
                const breathe = 1 + Math.sin(time) * 0.02;
                butterfly.scale.set(breathe, breathe, breathe);
                innerButterfly.scale.set(breathe, breathe, breathe);

                stars.rotation.y -= 0.0005;
            }

            // Update post-processing
            if (composerRef.current) {
                const passes = composerRef.current.passes;
                passes.forEach((pass: any) => {
                    if (pass.uniforms && pass.uniforms.time) {
                        pass.uniforms.time.value = time;
                    }
                });
            }

            // Smooth camera orbit
            camera.position.x += (targetRotationY * 5 - camera.position.x) * 0.05;
            camera.position.y += (targetRotationX * 3 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            // Render
            if (composerRef.current) {
                composerRef.current.render();
            } else {
                renderer.render(scene, camera);
            }
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            if (composerRef.current) {
                composerRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [isRotating]);

    return (
        // FIXED POSITIONING for Background usage
        <div className="fixed inset-0 w-full h-full bg-[#050505] -z-10">
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
}
