'use client';

import ReactFlow, { Background, Controls } from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

const nodeWidth = 180;
const nodeHeight = 60;

// 🔥 DAGRE LAYOUT FUNCTION
const getLayoutedElements = (nodes: any[], edges: any[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'TB', // Top → Bottom layout
    nodesep: 80,
    ranksep: 120,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

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

  // 🔥 PREPARE NODES (NO MANUAL POSITIONING)
  const rfNodes = nodes.map((n: any) => ({
    id: n.id,
    data: { label: n.data?.label || n.id },
    position: { x: 0, y: 0 }, // dagre will handle this
    style: {
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: 'white',
      borderRadius: '12px',
      padding: '10px 14px',
      fontSize: '13px',
      fontWeight: '500',
      boxShadow: '0 8px 20px rgba(99,102,241,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
    },
  }));

  // 🔥 PREPARE EDGES
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

  // 🔥 APPLY DAGRE AUTO-LAYOUT
  const { nodes: layoutedNodes, edges: layoutedEdges } =
    getLayoutedElements(rfNodes, rfEdges);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border bg-background">
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}