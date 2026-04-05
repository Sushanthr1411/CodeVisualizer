'use client';

import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function GraphVisualization({
  showGraph,
  nodes,
  edges,
}: any) {

  if (!showGraph || !nodes.length) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Graph will appear here
      </div>
    );
  }

  // 🔥 IMPROVED NODE LAYOUT + STYLING
  const rfNodes = nodes.map((n: any, index: number) => ({
    id: n.id,
    data: { label: n.data?.label || n.id },
    position: {
      x: (index % 2) * 220,
      y: Math.floor(index / 2) * 140,
    },
    style: {
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: 'white',
      borderRadius: '12px',
      padding: '10px 14px',
      fontSize: '13px',
      fontWeight: '500',
      boxShadow: '0 8px 20px rgba(99,102,241,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
    }
  }));

  // 🔥 CLEANER EDGES
  const rfEdges = edges.map((e: any, index: number) => ({
    id: `${index}`,
    source: e.source || e.from,
    target: e.target || e.to,
    animated: true,
    style: { 
      stroke: '#a78bfa',
      strokeWidth: 2,
    },
  }));

  return (
    <div className="w-full h-[400px] md:h-full rounded-xl overflow-hidden border bg-background">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}