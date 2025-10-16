"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // For now, we'll simulate an API call
      // In production, replace this with your actual email service (Resend, SendGrid, etc.)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 text-left">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium focus:outline-none transition-colors ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-dark focus:border-green-primary"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium focus:outline-none transition-colors ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-dark focus:border-green-primary"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium focus:outline-none transition-colors ${
            errors.phone
              ? "border-red-500 focus:border-red-500"
              : "border-gray-dark focus:border-green-primary"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      <div>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-0 py-3 bg-transparent border-b border-gray-dark text-gray-light focus:border-green-primary focus:outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="" className="bg-background-card">
            Project Type
          </option>
          <option value="palace" className="bg-background-card">
            Palace Kitchen
          </option>
          <option value="villa" className="bg-background-card">
            Villa Kitchen
          </option>
          <option value="estate" className="bg-background-card">
            Estate Kitchen
          </option>
          <option value="penthouse" className="bg-background-card">
            Penthouse Kitchen
          </option>
        </select>
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your project and vision..."
          className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium focus:outline-none transition-colors resize-none ${
            errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-gray-dark focus:border-green-primary"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-primary text-black py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 mt-8 shadow-lg shadow-green-primary/20 hover:shadow-green-vibrant/40 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "SENDING..." : "REQUEST CONSULTATION"}
      </button>

      {/* Success Message */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-primary/10 border border-green-primary/30 rounded text-green-vibrant text-center"
        >
          Thank you! We'll be in touch shortly.
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-center"
        >
          Something went wrong. Please try again or contact us directly.
        </motion.div>
      )}
    </form>
  );
}
