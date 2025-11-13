"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Founder {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  education: string[];
  recognition: string[];
  quote: string;
  published: boolean;
}

export default function FounderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [founder, setFounder] = useState<Founder | null>(null);

  // Form state
  const [education, setEducation] = useState<string[]>([""]);
  const [recognition, setRecognition] = useState<string[]>([""]);

  useEffect(() => {
    fetchFounder();
  }, []);

  const fetchFounder = async () => {
    try {
      const res = await fetch("/api/founder");
      if (!res.ok) throw new Error("Failed to fetch founder data");
      const data = await res.json();

      if (data === null) {
        setFounder(null);
        setEducation([""]);
        setRecognition([""]);
      } else {
        setFounder(data);
        setEducation(
          data.education && data.education.length > 0 ? data.education : [""],
        );
        setRecognition(
          data.recognition && data.recognition.length > 0
            ? data.recognition
            : [""],
        );
      }
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load founder data",
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      title: formData.get("title"),
      image: formData.get("image"),
      bio: formData.get("bio"),
      quote: formData.get("quote"),
      education: education.filter((e) => e.trim()),
      recognition: recognition.filter((r) => r.trim()),
      published: formData.get("published") === "on",
    };

    try {
      const res = await fetch("/api/founder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save founder data");
      }

      const updated = await res.json();
      setFounder(updated);
      setSuccess(true);
      setSaving(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save founder data. Please try again.",
      );
      setSaving(false);
    }
  };

  const addEducation = () => {
    setEducation([...education, ""]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, value: string) => {
    const updated = [...education];
    updated[index] = value;
    setEducation(updated);
  };

  const addRecognition = () => {
    setRecognition([...recognition, ""]);
  };

  const removeRecognition = (index: number) => {
    if (recognition.length > 1) {
      setRecognition(recognition.filter((_, i) => i !== index));
    }
  };

  const updateRecognition = (index: number, value: string) => {
    const updated = [...recognition];
    updated[index] = value;
    setRecognition(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-gray-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            Founder Management
          </h1>
          <p className="text-gray-light">
            Manage founder profile and biography content
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-primary text-green-vibrant">
            Founder data saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Basic Information
            </h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={founder?.name || ""}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="Bassam Fouad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Title/Role *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={founder?.title || ""}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="Founder & CEO"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">
                  Portrait Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  required
                  defaultValue={founder?.image || ""}
                  className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-light mt-1">
                  Professional headshot or portrait photo
                </p>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Biography</h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Bio/About *
              </label>
              <textarea
                name="bio"
                required
                rows={8}
                defaultValue={founder?.bio || ""}
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                placeholder="Tell the founder's story, journey, and vision..."
              />
            </div>
          </div>

          {/* Quote */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">
              Signature Quote
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                Personal Quote or Philosophy *
              </label>
              <textarea
                name="quote"
                required
                rows={3}
                defaultValue={founder?.quote || ""}
                className="w-full bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none resize-none"
                placeholder="A meaningful quote that represents the founder's philosophy..."
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-background-card border border-gray-dark p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-white">
                Education & Qualifications
              </h2>
              <button
                type="button"
                onClick={addEducation}
                className="text-green-primary hover:text-green-vibrant text-sm font-medium"
              >
                + Add Education
              </button>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={edu}
                    onChange={(e) => updateEducation(index, e.target.value)}
                    className="flex-1 bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                    placeholder="Bachelor of Engineering - Cairo University (2010)"
                  />
                  {education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="px-4 py-3 border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recognition & Awards */}
          <div className="bg-background-card border border-gray-dark p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-white">
                Recognition & Awards
              </h2>
              <button
                type="button"
                onClick={addRecognition}
                className="text-green-primary hover:text-green-vibrant text-sm font-medium"
              >
                + Add Recognition
              </button>
            </div>
            <div className="space-y-4">
              {recognition.map((rec, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={rec}
                    onChange={(e) => updateRecognition(index, e.target.value)}
                    className="flex-1 bg-black border border-gray-dark text-white px-4 py-3 focus:border-green-primary focus:outline-none"
                    placeholder="Industry Excellence Award 2023"
                  />
                  {recognition.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRecognition(index)}
                      className="px-4 py-3 border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Publishing */}
          <div className="bg-background-card border border-gray-dark p-6">
            <h2 className="text-xl font-serif text-white mb-4">Publishing</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                defaultChecked={founder?.published ?? true}
                className="w-5 h-5 bg-black border border-gray-dark text-green-primary focus:ring-green-primary focus:ring-2"
              />
              <span className="text-gray-light">
                Display founder section on About page
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-primary text-black px-8 py-3 hover:bg-green-vibrant transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Founder Data"}
            </button>
            <Link
              href="/admin"
              className="border border-gray-dark text-white px-8 py-3 hover:border-green-primary/50 transition-colors font-medium inline-block text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
