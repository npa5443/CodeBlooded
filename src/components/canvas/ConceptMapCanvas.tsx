import { useEffect, useRef, useState } from 'react';
import type { TopicEdge, TopicNode } from '../../types';

const statusColors = {
  stable: '#1f5f54',
  watch: '#c59f43',
  critical: '#df7a5c',
};

export function ConceptMapCanvas({
  nodes,
  edges,
}: {
  nodes: TopicNode[];
  edges: TopicEdge[];
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeNode, setActiveNode] = useState<TopicNode | null>(null);

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

    context.fillStyle = '#f8fbfd';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'rgba(16, 32, 51, 0.12)';
    context.lineWidth = 2;

    edges.forEach((edge) => {
      const from = nodes.find((node) => node.id === edge.from);
      const to = nodes.find((node) => node.id === edge.to);

      if (!from || !to) {
        return;
      }

      const startX = from.x * width;
      const startY = from.y * height;
      const endX = to.x * width;
      const endY = to.y * height;

      context.beginPath();
      context.moveTo(startX, startY);
      context.bezierCurveTo(startX + 90, startY - 40, endX - 90, endY + 40, endX, endY);
      context.stroke();
    });

    nodes.forEach((node) => {
      const x = node.x * width;
      const y = node.y * height;
      const color = statusColors[node.status];
      const isActive = activeNode?.id === node.id;

      context.beginPath();
      context.fillStyle = `${color}22`;
      context.arc(x, y, isActive ? 34 : 28, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, isActive ? 18 : 14, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = '#102033';
      context.font = '600 14px "Plus Jakarta Sans"';
      context.textAlign = 'center';
      context.fillText(node.label, x, y + 48);
    });
  }, [activeNode, edges, nodes]);

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hovered = nodes.find((node) => {
      const dx = x - node.x * rect.width;
      const dy = y - node.y * rect.height;
      return Math.sqrt(dx * dx + dy * dy) < 26;
    });

    setActiveNode(hovered ?? null);
  }

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        className="h-[320px] w-full rounded-[24px] border border-slate-200 bg-white"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setActiveNode(null)}
      />
      <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm text-slate-600">
        {activeNode ? (
          <p>
            <span className="font-semibold text-ink">{activeNode.label}</span> is currently marked as{' '}
            <span className="font-semibold">{activeNode.status}</span>. Hover across the map to inspect conceptual dependencies.
          </p>
        ) : (
          <p>Interactive topic graph: stable areas are green, watch points are brass, and critical blind spots are coral.</p>
        )}
      </div>
    </div>
  );
}
