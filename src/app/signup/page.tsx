"use client";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs"; //
import Logo from "../../../commons/Logo"; // Adjust the path as needed

const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  // Add more countries as needed
];

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(countries[0].code);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
      {/* Logo */}
      <Logo />

      {/* Sign Up Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-gray-950 to-gray-900 p-8 mt-8 rounded-lg shadow-lg w-full max-w-xl" // Make the form wider
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

        {/* First Name and Last Name Inputs in the same row */}
        <div className="flex flex-col md:flex-row mb-4">
          <div className="md:flex-1 md:mr-2">
            <label className="block text-sm mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="md:flex-1 md:ml-2">
            <label className="block text-sm mb-2" htmlFor="lastName">
              Last Name (Optional)
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter your last name"
            />
          </div>
        </div>

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
            placeholder="Create a password"
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4 flex items-center">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="bg-gray-700 text-white rounded-l-md p-2 focus:outline-none focus:ring focus:ring-purple-500"
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-r-md focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Enter your phone number (optional)"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium w-full"
        >
          Sign Up
        </button>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-medium mt-4 w-full"
        >
          <BsGoogle className="mr-2 w-5 h-5" />
          Sign up with Google
        </button>
      </form>

      {/* Existing User Link */}
      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <a href="/signin" className="text-purple-500 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
