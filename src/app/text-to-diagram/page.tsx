"use client";
import { useEffect, useRef, useState } from "react";
import { Layout, Clipboard, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import mermaid from "mermaid";

export default function TextToDiagram() {
  const [diagramCode, setDiagramCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const diagramRef = useRef<HTMLDivElement>(null);

  // Initialize mermaid only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      mermaid.initialize({ startOnLoad: false });
    }
  }, []);

  // Render diagram when code changes
  useEffect(() => {
    const renderMermaid = async () => {
      if (diagramCode && diagramRef.current && typeof window !== "undefined") {
        try {
          const { svg } = await mermaid.render("generatedDiagram", diagramCode);
          diagramRef.current.innerHTML = svg;
        } catch (err: any) {
          setError(err.message || "Diagram render failed.");
        }
      }
    };

    renderMermaid();
  }, [diagramCode]);

  const generateDiagram = async () => {
    try {
      const response = await fetch("/api/text-to-diagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate diagram");
      }

      const data: { result: string } = await response.json();
      setDiagramCode(data.result);
      setError(null);
    } catch (err: Error | any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Layout className="w-6 h-6" />
            Text to Diagram
          </h1>
          <p className="text-gray-100 mt-2">Visualize Your Ideas with Diagrams</p>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Enter Your Text</label>
          <Button variant="ghost" onClick={generateDiagram}>
            Generate
          </Button>
          <Textarea
            placeholder="Type or paste your text here..."
            className="w-full bg-gray-900"
            rows={6}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
        </div>

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Generated Diagram</label>
          <div className="w-full h-64 bg-gray-900 rounded-sm flex items-center justify-center overflow-auto p-4">
            <div ref={diagramRef} className="w-full" />
            {!diagramCode && (
              <>
                <Image className="w-10 h-10 text-gray-400" />
                <span className="text-gray-400 ml-2">Diagram Preview</span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigator.clipboard.writeText(diagramCode)}
          >
            <Clipboard className="w-4 h-4" />
            Copy Diagram
          </Button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
