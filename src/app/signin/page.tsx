"use client";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs"; //
import Logo from "../../../commons/Logo"; // Adjust the path as needed

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
      {/* Logo */}
      <Logo />

      {/* Sign In Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-gray-950 to-gray-900 p-8 mt-9 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium w-full"
        >
          Sign In
        </button>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-medium mt-4 w-full"
        >
          <BsGoogle className="mr-2 w-5 h-5" />
          Sign in with Google
        </button>
      </form>

      {/* No Account Link */}
      <p className="mt-4 text-gray-400">
        Don’t have an account?{" "}
        <a href="/signup" className="text-purple-500 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
