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
 * Simulates a taut, moving sheet of glossy Imperial Oxblood and Antique Brass
 * laminated packaging film drifting across the right side of the hero section.
 */
export default function HeroLiveFilmBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Soft cursor tracking across the Hero section
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
    rgba(246, 242, 235, 0.18) 24%,
    rgba(166, 134, 76, 0.10) 45%,
    transparent 72%
  )`;

  const cursorSpecularSheen = useMotionTemplate`linear-gradient(
    ${glintAngle}deg,
    transparent 0%,
    rgba(246, 242, 235, 0.04) 30%,
    rgba(255, 255, 255, 0.22) 50%,
    rgba(166, 134, 76, 0.06) 55%,
    transparent 78%
  )`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* ─── LAYER 1: OPTIONAL LIVE VIDEO & PROCEDURAL MACRO TEXTURE FEED ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Procedural Macro Substrate Base */}
        <div
          className="absolute inset-0 w-full h-full bg-[#27080F]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 90% 70% at 80% 40%, #3D0E18 0%, #27080F 45%, #1A050A 85%),
              linear-gradient(125deg, #27080F 0%, #3D0E18 30%, #27080F 55%, #1A050A 80%)
            `,
          }}
        />

        {/* Micro-Extrusion Striation Lines */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `repeating-linear-gradient(
              125deg,
              transparent 0px,
              transparent 2px,
              rgba(246, 242, 235, 0.08) 2px,
              rgba(246, 242, 235, 0.08) 3px,
              transparent 3px,
              transparent 7px
            )`,
          }}
        />

        {/* HTML5 Live Video Layer */}
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
              #27080F 0px,
              #27080F 38px,
              #3D0E18 65px,
              #4D1220 105px,
              #5C1626 130px,
              rgba(166, 134, 76, 0.35) 146px,
              rgba(255, 255, 255, 0.22) 149px,
              rgba(246, 242, 235, 0.28) 152px,
              #3D0E18 170px,
              #27080F 215px,
              #1A050A 255px,
              #1A050A 310px
            )`,
          }}
        />

        {/* Motion Plane 2: Secondary Cross-Tension Wave */}
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
              rgba(61, 14, 24, 0.35) 130px,
              rgba(246, 242, 235, 0.22) 190px,
              rgba(255, 255, 255, 0.16) 194px,
              rgba(166, 134, 76, 0.28) 220px,
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
              rgba(61, 14, 24, 0.4) 180px,
              rgba(246, 242, 235, 0.26) 230px,
              rgba(255, 255, 255, 0.22) 234px,
              rgba(166, 134, 76, 0.24) 244px,
              rgba(61, 14, 24, 0.3) 290px,
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
              "radial-gradient(ellipse at center, rgba(246, 242, 235, 0.4) 0%, rgba(166, 134, 76, 0.22) 35%, transparent 70%)",
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
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(246, 242, 235, 0.8) 1px, transparent 0)`,
          backgroundSize: "6px 6px",
        }}
      />

      {/* Smooth Left-to-Right Mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#27080F] via-[#27080F]/85 via-45% to-transparent pointer-events-none" />

      {/* Top Ambient Edge Vignette */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#27080F]/80 to-transparent pointer-events-none" />

      {/* Right Edge Vignette */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#27080F]/35 to-transparent pointer-events-none" />

      {/* ─── BOTTOM TRANSITION SEAM ─── */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#27080F]/95 via-[#27080F]/65 to-transparent pointer-events-none" />
    </div>
  );
}
