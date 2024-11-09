"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Clipboard, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { pdfjs, Document, Page } from "react-pdf";

// Import required CSS for the text and annotation layers
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      // @ts-ignore
      const strings = content.items.map((item: { str: any }) => item.str).join(" ");
      extractedText += strings + "\n";
    }

    console.log(extractedText);
    return extractedText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};

const SummaryStreamer = ({ summary }: { summary: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < summary.length ? prevIndex + 1 : prevIndex
      );
    }, 10);

    return () => clearInterval(interval);
  }, [summary]);

  return (
    <div className="w-full bg-[#1a1a1a] p-4 rounded-lg min-h-[150px]">
      <ReactMarkdown>
        {summary.length > 0
          ? summary.slice(0, currentIndex)
          : "Choose a document and click upload to generate its summary"}
      </ReactMarkdown>
    </div>
  );
};

const PDFSummary = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setError(null);
      setCurrentPage(1); // Reset page to the first
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const extractedText = await extractTextFromPDF(pdfFile);
      const response = await fetch("/api/pdf-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) throw new Error("Failed to start summarization.");

      const data = await response.json();
      // @ts-ignore
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || "Failed to extract or summarize text.");
      setSummary("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(summary)
      .then(() => alert("Summary copied to clipboard!"));
  };

  const handleNextPage = () => {
    if (currentPage < (numPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-md rounded-lg p-8">
        
        {/* Left Column: PDF Upload and Summary */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
              <FileText className="w-6 h-6" />
              PDF Summary
            </h1>
            <p className="text-gray-300 mt-2">
              Quickly Summarize Your PDF Documents
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Upload Your PDF File
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full"
              />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleUpload}
                disabled={isLoading}
              >
                <Upload className="w-4 h-4" />
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Summary
            </label>
            <SummaryStreamer summary={summary} />
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={handleCopy}
              disabled={!summary}
            >
              <Clipboard className="w-4 h-4" />
              Copy Summary
            </Button>
          </div>
        </div>
        
        {/* Right Column: PDF Viewer */}
        <div className="bg-[#0a0a0a] p-6 rounded-lg h-full flex flex-col items-center overflow-auto">
          {pdfFile ? (
            <>
              <div
                className="pdf-container"
                style={{
                  width: "100%", // Make the container's width fill the available space
                  height: "80vh", // Limit the height of the PDF viewable area
                  overflowY: "auto", // Allow vertical scrolling
                  overflowX: "hidden", // Prevent horizontal scrolling
                  position: "relative",
                }}
              >
                <Document
                  file={pdfFile}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="mb-4"
                >
                  <Page
                    pageNumber={currentPage}
                    width={Math.min(window.innerWidth * 0.9, 800)} // Ensure the page width scales correctly
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  variant="ghost"
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-gray-300">
                  Page {currentPage} of {numPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage >= (numPages || 1)}
                  variant="ghost"
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-400">
              No PDF selected. Please upload a file to view it here.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default PDFSummary;
