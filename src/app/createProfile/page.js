"use client";
import { useState } from "react";

export default function CreateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form submission handler to save user profile details
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const about = formData.get("about");
    const imgSrc = formData.get("imgSrc");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/saveProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, about, imgSrc }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Create Your User Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center border-2 border-solid border-gray-500 w-[25rem] p-6 rounded-lg"
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          className="text-emerald-600"
          required
        />

        <label htmlFor="about">About: </label>
        <textarea name="about" id="about" className="text-emerald-600 h-20" />

        <label htmlFor="imgSrc">Profile Image URL: </label>
        <textarea name="imgSrc" id="imgSrc" className="text-emerald-600 h-20" />

        <button
          type="submit"
          className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
