import Logo from "../../commons/Logo"; // Adjust the path as needed

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="flex flex-col items-center max-w-screen-xl mx-auto px-4">
        {/* Logo */}
        <div className="mb-4">
          <Logo />
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <a href="/about" className="text-gray-400 hover:text-white">About</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
          <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EasyGPT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
