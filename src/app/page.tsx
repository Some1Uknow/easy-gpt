import Navbar from "../../components/Navbar";

export default function Page() {
  const navItems = [
    {
      title: "AI Products",
      sublinks: [
        "PDF Summary",
        "YouTube Video Summary",
        "Audio Summary",
        "Podcast Summary",
      ],
    },
    {
      title: "AI Generator",
      sublinks: [
        "Text to Image",
        "Text to Audio",
        "Text to Social Media Post",
        "Text to Diagram",
      ],
    },
    {
      title: "Pricing",
    },
  ];
  return (
    <>
      <Navbar navItems={navItems} />
    </>
  );
}
