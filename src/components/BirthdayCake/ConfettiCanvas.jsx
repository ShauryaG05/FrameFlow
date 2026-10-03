import { useEffect, useRef } from "react";

export default function ConfettiCanvas({ active = false, count = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      "#FF4D6D", // Pink
      "#FFD166", // Gold
      "#06D6A0", // Mint
      "#118AB2", // Cyan
      "#9B5DE5", // Purple
      "#F15BB5", // Rose
      "#FFFFFF", // White spark
      "#FCA311", // Amber
    ];

    // Create particles from bottom corners / center burst
    const particles = [];
    const numParticles = count;

    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.random() * Math.PI * 0.8) + Math.PI * 0.1; // upward spread
      const speed = Math.random() * 14 + 10;
      const isLeft = Math.random() > 0.5;

      particles.push({
        x: isLeft ? width * 0.1 + Math.random() * 50 : width * 0.9 - Math.random() * 50,
        y: height * 0.85,
        vx: (isLeft ? 1 : -1) * Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: -Math.sin(angle) * speed - Math.random() * 6,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.35,
        drag: 0.985,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
        shape: Math.random() > 0.3 ? "rect" : "star",
        opacity: 1,
      });
    }

    // Secondary center fountain burst
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 60,
        y: height * 0.5 + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.28,
        drag: 0.98,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.08,
        shape: "circle",
        opacity: 1,
      });
    }

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    let startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = (Date.now() - startTime) / 1000;

      let stillAlive = false;

      particles.forEach((p) => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx + Math.sin(p.wobble) * 1.5;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (elapsed > 2.5) {
          p.opacity -= 0.015;
        }

        if (p.opacity > 0 && p.y < height + 50) {
          stillAlive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.shape === "rect") {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else if (p.shape === "star") {
            drawStar(0, 0, 5, p.size, p.size / 2);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      });

      if (stillAlive) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, count]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
