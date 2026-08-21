"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [227 / 255, 66 / 255, 52 / 255], // Vermilion Red #E34234
  glowColor: [1, 1, 1],
  markers: [
    { location: [-6.2088, 106.8456], size: 0.05 }, // Jakarta (HQ)
    { location: [1.3521, 103.8198], size: 0.035 }, // Singapore
    { location: [35.6762, 139.6503], size: 0.035 }, // Tokyo
    { location: [37.7749, -122.4194], size: 0.04 }, // San Francisco
    { location: [40.7128, -74.006], size: 0.035 }, // New York
    { location: [51.5074, -0.1278], size: 0.035 }, // London
    { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
    { location: [25.2048, 55.2708], size: 0.03 }, // Dubai
  ],
};

export function InteractiveGlobe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta * 0.005;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth || 500;

    const globe = createGlobe(canvas, {
      ...config,
      width: width * 2,
      height: width * 2,
    });

    let animationFrameId: number;
    let phi = 0;

    const render = () => {
      if (pointerInteracting.current === null) {
        phi += 0.005;
      }
      globe.update({
        phi: phi + pointerInteractionMovement.current,
        width: (canvasRef.current?.offsetWidth || width) * 2,
        height: (canvasRef.current?.offsetWidth || width) * 2,
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, [config]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1/1] w-full max-w-[600px] flex items-center justify-center",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
