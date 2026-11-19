"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * HeroLiveFilmBackground
 *
 * Isolated, hero-scoped live skeuomorphic polymer film & foil sheet background.
 * Simulates a taut, moving sheet of glossy deep-navy and metallic-bronze
 * laminated packaging film (BOPP/BOPET barrier sheeting) drifting across the right
 * side of the hero section with physical light physics and interactive cursor sheen.
 */
export default function HeroLiveFilmBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Soft cursor tracking across the Hero section for physically reactive specular reflections
  const mouseX = useMotionValue(0.65);
  const mouseY = useMotionValue(0.45);

  const springConfig = { damping: 28, stiffness: 85, mass: 0.85 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const nx = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      const ny = Math.max(
        0,
        Math.min(1, e.clientY / Math.max(window.innerHeight, 1))
      );
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  // Dynamic coordinates for interactive cursor reflection
  const glintPosX = useTransform(smoothX, [0, 1], ["25%", "85%"]);
  const glintPosY = useTransform(smoothY, [0, 1], ["20%", "80%"]);
  const glintAngle = useTransform(smoothX, [0, 1], [118, 132]);
  const tiltX = useTransform(smoothX, [0, 1], [-15, 15]);
  const tiltY = useTransform(smoothY, [0, 1], [10, -10]);

  const cursorGlintGradient = useMotionTemplate`radial-gradient(
    720px circle at ${glintPosX} ${glintPosY},
    rgba(255, 255, 255, 0.28) 0%,
    rgba(248, 244, 236, 0.18) 24%,
    rgba(176, 141, 87, 0.10) 45%,
    transparent 72%
  )`;

  const cursorSpecularSheen = useMotionTemplate`linear-gradient(
    ${glintAngle}deg,
    transparent 0%,
    rgba(248, 244, 236, 0.04) 30%,
    rgba(255, 255, 255, 0.22) 50%,
    rgba(176, 141, 87, 0.06) 55%,
    transparent 78%
  )`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* ─── LAYER 1: OPTIONAL LIVE VIDEO & PROCEDURAL MACRO TEXTURE FEED ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Procedural Macro Substrate Base (Works out-of-the-box before / along with video) */}
        <div
          className="absolute inset-0 w-full h-full bg-[#091B2C]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 90% 70% at 80% 40%, #1B3D5E 0%, #0F2A44 45%, #091B2C 85%),
              linear-gradient(125deg, #091B2C 0%, #0F2A44 30%, #1B3D5E 55%, #091B2C 80%)
            `,
          }}
        />

        {/* Micro-Extrusion Striation Lines (Simulating Physical Film Orientation) */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `repeating-linear-gradient(
              125deg,
              transparent 0px,
              transparent 2px,
              rgba(248, 244, 236, 0.08) 2px,
              rgba(248, 244, 236, 0.08) 3px,
              transparent 3px,
              transparent 7px
            )`,
          }}
        />

        {/* HTML5 Live Video Layer: Blended via mix-blend-luminosity opacity-45 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-105 opacity-45 mix-blend-luminosity transition-opacity duration-1000 ${
            videoLoaded ? "opacity-45" : "opacity-0"
          }`}
        >
          <source src="/hero-live.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─── LAYER 2: MOVING SKEUOMORPHIC POLYMER RIPPLES & TENSION FOLDS ─── */}
      {/* Positioned across the right 65% of the Hero viewport */}
      <div className="absolute top-0 right-0 w-full lg:w-[70%] xl:w-[65%] h-full overflow-hidden">
        {/* Motion Plane 1: Primary Diagonal Tension Folds drifting at 125deg */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -90, 0],
                  y: [0, 62, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-[35%] w-[170%] h-[170%] opacity-90"
          style={{
            backgroundImage: `repeating-linear-gradient(
              125deg,
              #091B2C 0px,
              #091B2C 38px,
              #0F2A44 65px,
              #1B3D5E 105px,
              #264C72 130px,
              rgba(176, 141, 87, 0.35) 146px,
              rgba(255, 255, 255, 0.22) 149px,
              rgba(248, 244, 236, 0.28) 152px,
              #1B3D5E 170px,
              #0F2A44 215px,
              #091B2C 255px,
              #091B2C 310px
            )`,
          }}
        />

        {/* Motion Plane 2: Secondary Cross-Tension Wave (Undulating Elastic Sheeting) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 75, 0],
                  y: [0, -52, 0],
                  scale: [1, 1.025, 1],
                }
          }
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-[35%] w-[170%] h-[170%] mix-blend-screen opacity-70"
          style={{
            backgroundImage: `repeating-linear-gradient(
              122deg,
              transparent 0px,
              transparent 70px,
              rgba(27, 61, 94, 0.35) 130px,
              rgba(248, 244, 236, 0.22) 190px,
              rgba(255, 255, 255, 0.16) 194px,
              rgba(176, 141, 87, 0.28) 220px,
              transparent 290px,
              transparent 380px
            )`,
          }}
        />

        {/* Motion Plane 3: Anodized Metallic Barrier Foil Sheen Sweep */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [-50, 50, -50],
                  opacity: [0.65, 0.85, 0.65],
                }
          }
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-[25%] w-[150%] h-[150%] mix-blend-color-dodge opacity-75"
          style={{
            backgroundImage: `repeating-linear-gradient(
              127deg,
              transparent 0px,
              transparent 120px,
              rgba(27, 61, 94, 0.4) 180px,
              rgba(248, 244, 236, 0.26) 230px,
              rgba(255, 255, 255, 0.22) 234px,
              rgba(176, 141, 87, 0.24) 244px,
              rgba(27, 61, 94, 0.3) 290px,
              transparent 370px,
              transparent 480px
            )`,
          }}
        />

        {/* Diagonal Light Dispersion Ribbon */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.98, 1.02, 0.98],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -right-10 w-[120%] h-64 mix-blend-overlay rotate-[125deg] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(248, 244, 236, 0.4) 0%, rgba(176, 141, 87, 0.22) 35%, transparent 70%)",
          }}
        />
      </div>

      {/* ─── LAYER 3: INTERACTIVE CURSOR SPECULAR GLINT ─── */}
      <motion.div
        className="absolute inset-0 mix-blend-screen opacity-90 transition-opacity duration-300"
        style={{
          background: cursorGlintGradient,
          x: tiltX,
          y: tiltY,
        }}
      />
      <motion.div
        className="absolute inset-0 mix-blend-overlay opacity-80"
        style={{
          background: cursorSpecularSheen,
        }}
      />

      {/* ─── LAYER 4: MICRO-EMBOSSED PHYSICAL MATTE/GRAIN & EDGE VIGNETTE ─── */}
      {/* Fine Micro-Embossed Polymer Tactile Texture */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(248, 244, 236, 0.8) 1px, transparent 0)`,
          backgroundSize: "6px 6px",
        }}
      />

      {/* Smooth Left-to-Right Mask: High contrast for typography on the left 45% */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#091B2C] via-[#091B2C]/85 via-45% to-transparent pointer-events-none" />

      {/* Top Ambient Edge Vignette */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#091B2C]/80 to-transparent pointer-events-none" />

      {/* Right Edge Vignette */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#091B2C]/35 to-transparent pointer-events-none" />

      {/* ─── BOTTOM TRANSITION SEAM ─── */}
      {/* Clean seamless fade into the global ShaderBackground below the Hero */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#091B2C]/95 via-[#091B2C]/65 to-transparent pointer-events-none" />
    </div>
  );
}
