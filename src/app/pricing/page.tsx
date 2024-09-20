import { ArrowRight } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-10">Pricing</h1>

      {/* Pricing Cards Container */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
        {/* Free Plan */}
        <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-bold text-white">Free</h2>
            <p className="text-5xl font-bold text-white mt-4">$0</p>
            <p className="text-gray-400 mt-2">
             limited for 10 uses
            </p>

            {/* Checkmarks */}
            <ul className="text-white mt-6 space-y-2">
              <li>✔</li>
              <li>✔</li>
              <li>✔</li>
            </ul>
          </div>

          {/* Button */}
          <button className="bg-white text-black px-6 py-3 text-lg rounded-full font-medium flex items-center space-x-2 mt-8">
            <span>Start for free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Unlimited Plan */}
        <div className="flex-1 flex flex-col justify-between relative bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-bold text-white">Unlimited</h2>
            <div className="text-5xl font-bold text-white mt-4">
              <span className="line-through text-red-600">$9.99</span>{" "}
              <span className="text-green-400">4.99</span>
            </div>
            <p className="text-gray-400 mt-2">lifetime validity</p>

            {/* Best Deal Tag */}
            <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
              #bestdeal
            </div>

            {/* Checkmarks */}
            <ul className="text-white mt-6 space-y-2">
              <li>✔</li>
              <li>✔</li>
              <li>✔</li>
            </ul>
          </div>

          {/* Button */}
          <button className="bg-white text-black px-6 py-3 text-lg rounded-full font-medium flex items-center space-x-2 mt-8">
            <span>Get Unlimited</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
