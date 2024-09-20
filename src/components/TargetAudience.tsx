import { Book, Briefcase, Camera, BarChart, Search, Users } from "lucide-react";

export default function TargetAudience() {
  const audiences = [
    {
      title: "For Students",
      description:
        "Leverage AI tools for efficient study materials, summarizing lectures, and enhancing learning experiences.",
      icon: <Book className="h-16 w-16 mb-4" />,
    },
    {
      title: "For Professionals",
      description:
        "Utilize AI for report generation, meeting summaries, and enhancing productivity.",
      icon: <Briefcase className="h-16 w-16 mb-4" />,
    },
    {
      title: "For Content Creators",
      description:
        "Create engaging content effortlessly with AI-powered writing and design tools.",
      icon: <Camera className="h-16 w-16 mb-4" />,
    },
    {
      title: "For Marketers",
      description:
        "Generate insightful market analysis, campaign summaries, and impactful social media content.",
      icon: <BarChart className="h-16 w-16 mb-4" />,
    },
    {
      title: "For Researchers",
      description:
        "Summarize academic papers, generate literature reviews, and enhance research productivity.",
      icon: <Search className="h-16 w-16 mb-4" />,
    },
    {
      title: "For Educators",
      description:
        "Develop course materials, summarize teaching resources, and improve student engagement.",
      icon: <Users className="h-16 w-16 mb-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      {/* Section Heading */}
      <h1 className="text-4xl font-bold mb-10">Our Target Audiences</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl">
        {audiences.map((audience, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            {audience.icon}
            <h2 className="text-2xl font-bold text-center">{audience.title}</h2>
            <p className="text-gray-400 mt-4 text-center">
              {audience.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
