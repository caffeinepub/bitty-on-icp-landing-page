import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function FireworksTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const colors = [
      'oklch(0.65 0.28 340)', // neon-pink
      'oklch(0.72 0.22 45)',  // neon-orange
      'oklch(0.75 0.18 195)', // neon-cyan
      'oklch(0.85 0.15 120)', // neon-green
    ];

    const spawnParticles = (centerX: number, centerY: number) => {
      // Increased particle count from 8 to 20 for more intensity
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        // Increased speed from 2-5 to 3-8 for larger spread
        const speed = 3 + Math.random() * 5;
        const life = 60 + Math.random() * 40;
        
        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: life,
          maxLife: life,
          size: 20 + Math.random() * 15,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const drawICPSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      
      // Draw simplified ICP logo (infinity symbol style)
      ctx.strokeStyle = 'currentColor';
      ctx.lineWidth = size / 8;
      ctx.lineCap = 'round';
      
      // Left loop
      ctx.beginPath();
      ctx.arc(-size / 4, 0, size / 3, 0, Math.PI * 2);
      ctx.stroke();
      
      // Right loop
      ctx.beginPath();
      ctx.arc(size / 4, 0, size / 3, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = (timestamp: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Spawn new particles more frequently - reduced from 800ms to 400ms
      if (timestamp - lastSpawnRef.current > 400) {
        // Increased number of spawn points from 3 to 5 for more bursts
        const spawnPoints = [
          { x: rect.width * 0.15, y: rect.height * 0.25 },
          { x: rect.width * 0.35, y: rect.height * 0.4 },
          { x: rect.width * 0.5, y: rect.height * 0.5 },
          { x: rect.width * 0.65, y: rect.height * 0.4 },
          { x: rect.width * 0.85, y: rect.height * 0.25 },
        ];
        // Spawn from 2 random points instead of 1 for more intensity
        const point1 = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
        const point2 = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
        spawnParticles(point1.x, point1.y);
        spawnParticles(point2.x, point2.y);
        lastSpawnRef.current = timestamp;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.vx *= 0.98; // air resistance
        particle.vy *= 0.98;
        particle.life -= 1;
        particle.rotation += particle.rotationSpeed;

        if (particle.life <= 0) return false;

        const alpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color;
        ctx.strokeStyle = particle.color;
        
        drawICPSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation, alpha);

        // Draw glowing trail with increased intensity
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 1.5);
        gradient.addColorStop(0, particle.color.replace(')', ` / ${alpha * 0.5})`));
        gradient.addColorStop(1, particle.color.replace(')', ' / 0)'));
        ctx.fillStyle = gradient;
        ctx.fillRect(particle.x - particle.size * 1.5, particle.y - particle.size * 1.5, particle.size * 3, particle.size * 3);

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
