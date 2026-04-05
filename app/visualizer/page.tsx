'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/code-editor';
import GraphVisualization from '@/components/graph-visualization';
import Header from '@/components/header';
import { generateGraph } from "@/lib/parser";
import { toPng } from 'html-to-image';

export default function Home() {
  const [code, setCode] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const graphRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  // ✅ FIXED RELOAD HANDLING (NO GLITCH)
  useEffect(() => {
    const isReload = sessionStorage.getItem("isReload");

    if (isReload === "true") {
      sessionStorage.removeItem("isReload");
      router.replace("/");
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("isReload", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  const handleVisualize = () => {
    if (code.trim()) {
      const graph = generateGraph(code);
      setNodes(graph.nodes);
      setEdges(graph.edges);
      setShowGraph(true);
    }
  };

  // 🔥 DOWNLOAD FUNCTION
  const handleDownload = async () => {
    if (!graphRef.current) return;

    try {
      const dataUrl = await toPng(graphRef.current, {
        cacheBust: true,
        backgroundColor: '#0f0c29',
      });

      const link = document.createElement('a');
      link.download = 'code-flow.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // 🔥 SAMPLE CODE
  const handleLoadSample = () => {
    const sampleCode = `// User Authentication Flow Example

function main() {
  login();
  dashboard();
}

function login() {
  validateUser();
}

function dashboard() {
  loadData();
  renderUI();
}

function validateUser() {}

function loadData() {}

function renderUI() {}
`;

    setCode(sampleCode);
    setShowGraph(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex h-[calc(100vh-80px)]">
        
        {/* LEFT PANEL */}
        <div className="w-1/2 border-r border-border/30 p-6 overflow-hidden flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Code Input</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Paste your JavaScript code here to visualize its structure
            </p>
          </div>

          <CodeEditor code={code} onChange={setCode} />

          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleVisualize} 
              disabled={!code.trim()} 
              className="flex-1"
            >
              ⚡ Visualize
            </Button>

            <Button 
              onClick={handleLoadSample} 
              variant="outline" 
              className="flex-1"
            >
              📄 Load Sample
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-6 overflow-hidden flex flex-col bg-muted/20">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-1">Code Graph</h2>
              <p className="text-sm text-muted-foreground">
                Interactive visualization of your code structure
              </p>
            </div>

            {/* 🔥 DOWNLOAD BUTTON */}
            <Button onClick={handleDownload}>
              ⬇ Download
            </Button>
          </div>

          {/* 🔥 WRAPPED GRAPH */}
          <div ref={graphRef} className="flex-1">
            <GraphVisualization 
              code={code} 
              showGraph={showGraph} 
              nodes={nodes}
              edges={edges}
            />
          </div>
        </div>

      </main>
    </div>
  );
}