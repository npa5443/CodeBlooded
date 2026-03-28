import { useEffect, useRef, useState } from 'react';
import type { WeakPoint } from '../../types';

export function HeatmapCanvas({ weakPoints }: { weakPoints: WeakPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selected, setSelected] = useState<WeakPoint | null>(weakPoints[0] ?? null);

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

    const cols = 2;
    const rows = Math.ceil(weakPoints.length / cols);
    const padding = 22;
    const cellWidth = (width - padding * 2 - 16) / cols;
    const cellHeight = (height - padding * 2 - 16) / rows;

    weakPoints.forEach((point, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = padding + col * (cellWidth + 16);
      const y = padding + row * (cellHeight + 16);
      const intensity = point.errorRate / 40;
      const fill = `rgba(223, 122, 92, ${0.22 + intensity * 0.52})`;
      const isSelected = selected?.topic === point.topic;

      context.fillStyle = fill;
      context.strokeStyle = isSelected ? '#102033' : 'rgba(16, 32, 51, 0.08)';
      context.lineWidth = isSelected ? 2.5 : 1;
      context.beginPath();
      context.roundRect(x, y, cellWidth, cellHeight, 24);
      context.fill();
      context.stroke();

      context.fillStyle = '#102033';
      context.font = '600 15px "Plus Jakarta Sans"';
      context.fillText(point.topic, x + 18, y + 32);

      context.font = '500 13px "Plus Jakarta Sans"';
      context.fillStyle = 'rgba(16, 32, 51, 0.72)';
      context.fillText(`Confidence ${point.confidence}%`, x + 18, y + 58);
      context.fillText(`Error rate ${point.errorRate}%`, x + 18, y + 80);
    });
  }, [selected, weakPoints]);

  function handleClick(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const cols = 2;
    const rows = Math.ceil(weakPoints.length / cols);
    const padding = 22;
    const cellWidth = (rect.width - padding * 2 - 16) / cols;
    const cellHeight = (rect.height - padding * 2 - 16) / rows;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clicked = weakPoints.find((_, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const startX = padding + col * (cellWidth + 16);
      const startY = padding + row * (cellHeight + 16);
      return x >= startX && x <= startX + cellWidth && y >= startY && y <= startY + cellHeight;
    });

    if (clicked) {
      setSelected(clicked);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.45fr_0.9fr]">
      <canvas
        ref={canvasRef}
        className="h-[300px] w-full rounded-[24px] border border-slate-200 bg-white"
        onPointerDown={handleClick}
      />
      <div className="rounded-[24px] bg-slate-50 p-5">
        {selected ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Selected weak point</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{selected.topic}</h3>
            </div>
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>Common errors: students can compute mechanically, but they cannot narrate why the update changes.</li>
              <li>Low-scoring question cluster: conceptual explanation prompts and graph reading.</li>
              <li>Suggested reteaching: intuition-first story, then one visual tree, then the compact equation.</li>
              <li>Recommended slide revision: split notation onto a separate slide after the analogy sequence.</li>
              <li>Recitation move: use confidence polling before and after the example to make improvement visible.</li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
