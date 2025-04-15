// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Clipboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

// Simple wrapper for pdfjs that doesn't use Promise.withResolvers
const simplePdfExtractor = async (file: File) => {
  try {
    // Dynamically import pdfjs only on client side
    const pdfJS = await import("pdfjs-dist");

    // Set up the worker source using unpkg instead of jsdelivr
    if (typeof window !== "undefined") {
      pdfJS.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.1.91/build/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfJS.getDocument({
      data: new Uint8Array(arrayBuffer),
    });

    // Manual promise handling to avoid Promise.withResolvers
    const pdf = await new Promise<pdfjsLib.PDFDocumentProxy>((resolve, reject) => {
      loadingTask.promise.then(resolve).catch(reject);
    });

    let extractedText = "";
    let pagePromises: Promise<{ pageNum: number; text: string }>[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      pagePromises.push(
        pdf.getPage(i).then((page) => {
          return page.getTextContent().then((content) => {
            const strings = content.items
              .filter((item): item is pdfjsLib.TextItem => "str" in item)
              .map((item) => item.str)
              .join(" ");
            return { pageNum: i, text: strings };
          });
        })
      );
    }

    const pageTexts = await Promise.all(pagePromises);

    // Sort by page number and join with newlines
    pageTexts
      .sort((a, b) => a.pageNum - b.pageNum)
      .forEach((page) => {
        extractedText += page.text + "\n\n";
      });

    return extractedText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

const renderPdfPreview = async (
  file: File,
  pageNumber: number,
  onComplete: (result: { image: string; pageCount: number }) => void,
  onError: (error: Error) => void
) => {
  try {
    const pdfJS = await import("pdfjs-dist");

    // Set up the worker source using unpkg instead of jsdelivr
    if (typeof window !== "undefined") {
      pdfJS.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.1.91/build/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfJS.getDocument({
      data: new Uint8Array(arrayBuffer),
    });

    const pdf = await new Promise<pdfjsLib.PDFDocumentProxy>((resolve, reject) => {
      loadingTask.promise.then(resolve).catch(reject);
    });

    if (pageNumber > pdf.numPages) {
      pageNumber = 1;
    }

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Failed to get canvas context");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    const dataUrl = canvas.toDataURL();
    onComplete({
      image: dataUrl,
      pageCount: pdf.numPages,
    });
  } catch (error) {
    console.error("Error rendering PDF:", error);
    onError(new Error("Failed to render PDF preview"));
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
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [isRenderingPage, setIsRenderingPage] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset all PDF-related states when a new file is selected
      setPdfFile(file);
      setError(null);
      setCurrentPage(1);
      setPageImage(null);  // Clear current image
      setNumPages(0);      // Reset page count
      
      // Manually trigger PDF rendering with the new file
      setIsRenderingPage(true);
      renderPdfPreview(
        file, 
        1, 
        (result) => {
          setPageImage(result.image);
          setNumPages(result.pageCount);
          setIsRenderingPage(false);
        },
        (err) => {
          setError("Failed to render PDF preview: " + err.message);
          setIsRenderingPage(false);
        }
      );
    }
  };

  // Only use this effect for page navigation, not for initial file load
  useEffect(() => {
    // Only render if we have a file AND we're not already rendering
    // AND this isn't triggered by the initial file selection (since we handle that separately)
    if (pdfFile && !isRenderingPage && pageImage !== null) {
      setIsRenderingPage(true);
      renderPdfPreview(
        pdfFile, 
        currentPage, 
        (result) => {
          setPageImage(result.image);
          setNumPages(result.pageCount);
          setIsRenderingPage(false);
        },
        (err) => {
          setError("Failed to render PDF preview: " + err.message);
          setIsRenderingPage(false);
        }
      );
    }
  }, [currentPage]); // Only depend on currentPage, not pdfFile

  const handleUpload = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const extractedText = await simplePdfExtractor(pdfFile);

      const response = await fetch("/api/pdf-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) throw new Error("Failed to start summarization.");

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError((err as Error).message || "Failed to extract or summarize text.");
      setSummary("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(summary)
      .then(() => alert("Summary copied to clipboard!"))
      .catch((err) => setError("Failed to copy: " + (err as Error).message));
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
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
                  width: "100%",
                  height: "80vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isRenderingPage ? (
                  <div className="text-gray-400 flex flex-col items-center">
                    <p>Loading page...</p>
                    <div className="mt-4 h-6 w-6 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                ) : pageImage ? (
                  <img
                    src={pageImage}
                    alt={`PDF page ${currentPage}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <p className="text-gray-400">Failed to load PDF preview.</p>
                )}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1 || isRenderingPage}
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
                  disabled={currentPage >= numPages || isRenderingPage}
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