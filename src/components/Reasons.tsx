import { ArrowRight } from "lucide-react";

export default function ReasonsToChoose() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-10">Reasons to choose EasyGPT</h1>

      {/* Reasons Cards Container */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-screen-xl">
        {/* Reason 1 */}
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-lg shadow-lg flex flex-col justify-between h-[300px]">
          {/* Tag */}
          <div className="flex justify-start">
            <span className="bg-gray-700 text-xs text-white px-4 py-1 rounded-full">
              #one
            </span>
          </div>

          {/* Title and Description */}
          <div className="mt-6 flex-grow">
            <h2 className="text-2xl font-bold">Effortless Content Creation</h2>
            <p className="text-gray-400 mt-4">
              EasyGPT makes content creation a breeze. From generating blog posts to crafting social media updates, let AI handle your content creation tasks efficiently.
            </p>
          </div>
        </div>

        {/* Reason 2 */}
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-lg shadow-lg flex flex-col justify-between h-[300px]">
          {/* Tag */}
          <div className="flex justify-start">
            <span className="bg-gray-700 text-xs text-white px-4 py-1 rounded-full">
              #two
            </span>
          </div>

          {/* Title and Description */}
          <div className="mt-6 flex-grow">
            <h2 className="text-2xl font-bold">Versatile AI Tools</h2>
            <p className="text-gray-400 mt-4">
              EasyGPT offers a wide range of tools to convert text into audio, images, diagrams, and even detailed summaries for PDFs and YouTube videos.
            </p>
          </div>
        </div>

        {/* Reason 3 */}
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-lg shadow-lg flex flex-col justify-between h-[300px]">
          {/* Tag */}
          <div className="flex justify-start">
            <span className="bg-gray-700 text-xs text-white px-4 py-1 rounded-full">
              #three
            </span>
          </div>

          {/* Title and Description */}
          <div className="mt-6 flex-grow">
            <h2 className="text-2xl font-bold">Seamless Integration</h2>
            <p className="text-gray-400 mt-4">
              Integrate our platform into your workflow with ease. Whether it's for personal use or team collaboration, our tools work seamlessly across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Sign up Button */}
      <div className="mt-12">
        <button className="bg-white text-black px-6 py-3 text-lg rounded-full font-medium flex items-center space-x-2">
          <span>Sign up</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
