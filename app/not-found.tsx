import Link from "next/link";
import Image from "next/image";

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Kitchen Core Logo"
            width={200}
            height={67}
            className="h-16 w-auto"
          />
        </div>

        {/* 404 Number */}
        <div className="relative mb-8">
          <div className="text-[200px] md:text-[300px] font-serif text-green-primary/10 leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-green-primary animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-light mb-12 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back to exploring our luxury kitchens.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/en"
            className="bg-green-primary text-black px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-xl shadow-green-primary/20"
          >
            BACK TO HOME
          </Link>
          <Link
            href="/en#portfolio"
            className="border-2 border-green-primary text-green-primary px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-primary/10 transition-all duration-300"
          >
            VIEW PORTFOLIO
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <Link href="/en#services" className="group">
            <div className="text-green-vibrant text-3xl mb-2">
              <svg
                className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-light group-hover:text-green-primary transition-colors">
              Our Services
            </div>
          </Link>
          <Link href="/en#about" className="group">
            <div className="text-green-vibrant text-3xl mb-2">
              <svg
                className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-light group-hover:text-green-primary transition-colors">
              About Us
            </div>
          </Link>
          <Link href="/en#contact" className="group">
            <div className="text-green-vibrant text-3xl mb-2">
              <svg
                className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-light group-hover:text-green-primary transition-colors">
              Contact
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
