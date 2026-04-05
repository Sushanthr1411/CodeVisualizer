'use client';

import { useEffect, useRef, useState } from 'react';

interface GraphVisualizationProps {
  code: string;
  showGraph: boolean;
  nodes: any;
  edges: any;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'function';
}

interface Edge {
  from: string;
  to: string;
}

export default function GraphVisualization({
  showGraph,
  nodes: inputNodes,
  edges: inputEdges,
}: GraphVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // ✅ FINAL BFS TREE LAYOUT (FIXES EVERYTHING)
  useEffect(() => {
    if (!showGraph || !inputNodes.length) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const rootX = 400;
    const rootY = 100;
    const levelGapY = 130;
    const siblingGapX = 200;

    const parentMap: any = {};
    inputEdges.forEach((e: any) => {
      parentMap[e.target] = e.source;
    });

    const roots = inputNodes.filter((n: any) => !parentMap[n.id]);

    const levels: any = {};
    const positions: any = {};

    // 🔥 BFS LEVEL ASSIGNMENT
    const queue: any[] = [];

    roots.forEach((r: any) => {
      queue.push({ id: r.id, level: 0 });
    });

    while (queue.length > 0) {
      const { id, level } = queue.shift();

      if (!levels[level]) levels[level] = [];
      if (!levels[level].includes(id)) {
        levels[level].push(id);
      }

      const children = inputEdges
        .filter((e: any) => e.source === id)
        .map((e: any) => e.target);

      children.forEach((child: string) => {
        queue.push({ id: child, level: level + 1 });
      });
    }

    // 🔥 POSITION EACH LEVEL CLEANLY
    Object.keys(levels).forEach((levelKey: any) => {
      const level = parseInt(levelKey);
      const nodesInLevel = levels[level];

      nodesInLevel.forEach((nodeId: string, index: number) => {
        const total = nodesInLevel.length;

        const x =
          rootX + (index - (total - 1) / 2) * siblingGapX;

        const y = rootY + level * levelGapY;

        positions[nodeId] = { x, y };
      });
    });

    const newNodes = inputNodes.map((n: any) => ({
      id: n.id,
      label: n.data.label,
      x: positions[n.id]?.x || rootX,
      y: positions[n.id]?.y || rootY,
      type: 'function',
    }));

    const newEdges = inputEdges.map((e: any) => ({
      from: e.source,
      to: e.target,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [inputNodes, inputEdges, showGraph]);

  // 🎨 DRAWING
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(20, 15, 40, 1)');
    gradient.addColorStop(1, 'rgba(25, 20, 50, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Edges
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);

      if (!fromNode || !toNode) return;

      ctx.strokeStyle = 'rgba(147, 100, 250, 0.7)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
    });

    // Nodes
    nodes.forEach((node) => {
      const radius = 28;

      ctx.fillStyle = 'rgba(102, 150, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(102, 150, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
  }, [nodes, edges]);

  if (!showGraph || nodes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Graph will appear here
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-2xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 text-sm font-semibold text-white/70">
        Function Relationship Graph
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}