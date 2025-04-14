'use client'
import { useState } from "react";
import { FileText, Clipboard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ImageToText() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("/api/image-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Error generating caption for the image.");
      }
      if (data.description) {
        setExtractedText(data.description);
      } else {
        setExtractedText("Error generating caption for the image. Please try again.");
      }
    } catch (error) {
      setExtractedText("Error generating caption for the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Image to Text
          </h1>
          <p className="text-gray-100 mt-2">Extract Text from Images Using AI</p>
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Upload Image</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={handleUpload}
              disabled={!imageFile || loading}
            >
              <Upload className="w-4 h-4" />
              {loading ? "Processing..." : "Extract Text"}
            </Button>
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-6">
            <label className="block text-gray-100 font-medium mb-2">Image Preview</label>
            <div className="w-full max-h-[300px] overflow-hidden rounded-lg">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Extracted Text</label>
          <Textarea
            readOnly
            value={extractedText}
            placeholder="The extracted text will appear here..."
            className="w-full bg-gray-800"
            rows={6}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={handleCopy}
            disabled={!extractedText}
          >
            <Clipboard className="w-4 h-4" />
            Copy Text
          </Button>
        </div>
      </div>
    </div>
  );
}
