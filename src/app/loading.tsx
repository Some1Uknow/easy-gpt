import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-black/95 text-white m-6 rounded-2xl">
      <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
    </div>
  );
}
