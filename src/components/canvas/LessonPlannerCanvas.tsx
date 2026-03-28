import { useEffect, useMemo, useRef, useState } from 'react';
import type { LessonBlock } from '../../types';

const kindColors: Record<LessonBlock['kind'], string> = {
  Concept: '#d9edf7',
  Example: '#f6e7bd',
  Activity: '#dbefe8',
  Quiz: '#f7d7cf',
  Review: '#dfe4f0',
};

export function LessonPlannerCanvas({
  initialBlocks,
}: {
  initialBlocks: LessonBlock[];
}) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [dragId, setDragId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const overload = useMemo(() => {
    const total = blocks.reduce((sum, block) => sum + block.duration, 0);
    const highComplexity = blocks.filter((block) => block.complexity >= 4).length;
    return { total, highComplexity };
  }, [blocks]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    context.fillStyle = '#fbfdfe';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'rgba(16,32,51,0.08)';
    context.setLineDash([6, 8]);
    for (let x = 80; x < width; x += 220) {
      context.beginPath();
      context.moveTo(x, 30);
      context.lineTo(x, height - 30);
      context.stroke();
    }
    context.setLineDash([]);

    blocks.forEach((block, index) => {
      if (index < blocks.length - 1) {
        const next = blocks[index + 1];
        context.strokeStyle = 'rgba(16,32,51,0.22)';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(block.x + 180, block.y + 34);
        context.lineTo(next.x, next.y + 34);
        context.stroke();
      }

      context.fillStyle = kindColors[block.kind];
      context.strokeStyle = 'rgba(16,32,51,0.10)';
      context.lineWidth = 1;
      context.beginPath();
      context.roundRect(block.x, block.y, 180, 68, 20);
      context.fill();
      context.stroke();

      context.fillStyle = '#102033';
      context.font = '600 14px "Plus Jakarta Sans"';
      context.fillText(block.title, block.x + 16, block.y + 25);
      context.font = '500 12px "Plus Jakarta Sans"';
      context.fillStyle = 'rgba(16,32,51,0.68)';
      context.fillText(`${block.kind} • ${block.duration} min • complexity ${block.complexity}`, block.x + 16, block.y + 47);
    });
  }, [blocks]);

  function getBlockAtPosition(x: number, y: number) {
    return blocks.find((block) => x >= block.x && x <= block.x + 180 && y >= block.y && y <= block.y + 68) ?? null;
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const block = getBlockAtPosition(x, y);
    if (!block) return;
    dragOffset.current = { x: x - block.x, y: y - block.y };
    setDragId(block.id);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - dragOffset.current.x;
    const y = event.clientY - rect.top - dragOffset.current.y;
    setBlocks((current) =>
      current.map((block) =>
        block.id === dragId
          ? {
              ...block,
              x: Math.max(20, Math.min(x, rect.width - 200)),
              y: Math.max(20, Math.min(y, rect.height - 88)),
            }
          : block,
      ),
    );
  }

  function handlePointerUp() {
    setDragId(null);
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="h-[340px] w-full touch-none rounded-[24px] border border-slate-200 bg-white"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-[22px] bg-slate-50 p-4 text-sm text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Lecture load</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{overload.total} min</p>
          <p className="mt-1">Ideal target is 75 minutes with breathing room for questions.</p>
        </div>
        <div className="rounded-[22px] bg-slate-50 p-4 text-sm text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">High complexity blocks</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{overload.highComplexity}</p>
          <p className="mt-1">Two or fewer keeps the flow scaffolded for most learners.</p>
        </div>
        <div className="rounded-[22px] bg-slate-50 p-4 text-sm text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Recommendation</p>
          <p className="mt-2 font-semibold text-ink">Move practice earlier</p>
          <p className="mt-1">Drag modules to place retrieval before the final explanation-heavy block.</p>
        </div>
      </div>
    </div>
  );
}
