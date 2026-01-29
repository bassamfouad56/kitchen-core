"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  honeypot: string; // Spam protection - should always be empty
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("validation.phoneRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check - if filled, it's a bot
    if (formData.honeypot) {
      // Silently reject spam submissions
      setSubmitStatus("success");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { honeypot, ...submitData } = formData;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
          honeypot: "",
        });
        setTimeout(() => setSubmitStatus("idle"), 8000);
      } else {
        const errorData = await response.json();
        console.error("Form submission failed:", errorData);

        // Set specific error message based on response
        if (response.status === 429) {
          setErrorMessage(t("errors.tooManyRequests"));
        } else if (errorData.details && Array.isArray(errorData.details)) {
          // Validation errors
          const fieldErrors = errorData.details.map((d: { field: string; message: string }) => d.message).join(". ");
          setErrorMessage(fieldErrors || t("errors.validationFailed"));
        } else if (errorData.error) {
          setErrorMessage(errorData.error);
        } else {
          setErrorMessage(t("error"));
        }
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(t("errors.networkError"));
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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-light max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto space-y-6 text-left">
          {/* Honeypot field - hidden from users, visible to bots */}
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
            <label htmlFor="honeypot">Leave this field empty</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-light mb-2 font-light">
                {t("name")} <span className="text-green-primary">{t("required")}</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("namePlaceholder")}
                className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium/50 focus:outline-none transition-colors ${
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
              <label htmlFor="email" className="block text-sm text-gray-light mb-2 font-light">
                {t("email")} <span className="text-green-primary">{t("required")}</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("emailPlaceholder")}
                className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium/50 focus:outline-none transition-colors ${
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
            <label htmlFor="phone" className="block text-sm text-gray-light mb-2 font-light">
              {t("phone")} <span className="text-green-primary">{t("required")}</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("phonePlaceholder")}
              className={`w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-gray-medium/50 focus:outline-none transition-colors ${
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
            <label htmlFor="projectType" className="block text-sm text-gray-light mb-2 font-light">
              {t("projectType")}
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-gray-dark text-gray-light focus:border-green-primary focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-background-card">
                {t("projectTypePlaceholder")}
              </option>
              <option value="modern-kitchen" className="bg-background-card">
                {t("projectTypes.modernKitchen")}
              </option>
              <option value="classic-kitchen" className="bg-background-card">
                {t("projectTypes.classicKitchen")}
              </option>
              <option value="aluminum-kitchen" className="bg-background-card">
                {t("projectTypes.aluminumKitchen")}
              </option>
              <option value="wardrobes" className="bg-background-card">
                {t("projectTypes.wardrobes")}
              </option>
              <option value="washbasins" className="bg-background-card">
                {t("projectTypes.washbasins")}
              </option>
              <option value="tv-units" className="bg-background-card">
                {t("projectTypes.tvUnits")}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-gray-light mb-2 font-light">
              {t("message")} <span className="text-gray-medium text-xs">({t("optional")})</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t("messagePlaceholder")}
              className="w-full px-0 py-3 bg-transparent border-b border-gray-dark text-white placeholder:text-gray-medium/50 focus:outline-none focus:border-green-primary transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-primary text-black py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 mt-8 shadow-lg shadow-green-primary/20 hover:shadow-green-vibrant/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>

          {/* Success Message */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-green-primary/10 border border-green-primary/30 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-vibrant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-vibrant font-medium">{t("success.title")}</span>
              </div>
              <p className="text-gray-light text-sm">
                {t("success.description")} <span className="text-green-primary font-medium">{t("success.time")}</span>.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{t("errors.title")}</span>
              </div>
              <p className="text-sm">{errorMessage || t("error")}</p>
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
}
