import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="login-bg min-h-[100svh] w-full flex items-start sm:items-center justify-center px-4 py-2 overflow-hidden">
      <div className="relative w-full max-w-lg">
        {/* TOP BRAND HEADER */}
        <div className="flex items-center justify-center gap-3 text-center mb-2 sm:mb-3">
          <div className="shrink-0">
            <div className="bg-white p-2 rounded-xl shadow-lg border border-white">
              <Image
                src="/msu-iit-logo.png"
                alt="MSU-IIT Logo"
                width={72}
                height={72}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-left">
            <h1 className="text-sm sm:text-base font-extrabold tracking-wide text-yellow-200 leading-tight">
              MSU-ILIGAN INSTITUTE
              <br className="hidden sm:block" />
              OF TECHNOLOGY
            </h1>
            <p className="mt-0.5 text-[11px] text-yellow-100/80">
              Curriculum Management System
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="mx-auto w-full rounded-2xl bg-[#f7efe6] shadow-2xl ring-1 ring-yellow-200/50 overflow-hidden">
          <div className="p-[2px] bg-gradient-to-r from-yellow-200/70 via-yellow-100/40 to-yellow-200/70">
            <div className="rounded-2xl bg-[#f7efe6]">
              <div className="px-5 sm:px-6 pt-4 pb-3">
                <div className="text-center">
                  <h2 className="text-base sm:text-lg font-extrabold text-red-900">
                    Contact
                  </h2>
                  <p className="mt-0.5 text-xs text-red-900/70">
                    Get in touch with the system administrator
                  </p>
                </div>

                {/* Content */}
                <div className="mt-3 space-y-2 text-sm text-red-950/90">
                  <div className="rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 p-3">
                    <p className="font-semibold text-red-900">Office</p>
                    <p className="mt-1">College of Computer Studies / IT Office</p>
                    <p className="text-red-900/70">
                      MSU-Iligan Institute of Technology
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 p-3">
                    <p className="font-semibold text-red-900">Email</p>
                    <p className="mt-1">admin@msuiit.edu.ph</p>
                  </div>

                  <div className="rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 p-3">
                    <p className="font-semibold text-red-900">Phone</p>
                    <p className="mt-1">(Optional) +63 9XX XXX XXXX</p>
                  </div>

                  <div className="pt-1">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center w-full rounded-xl py-2 text-white font-bold text-base shadow-lg
                                 bg-gradient-to-r from-red-800 via-red-700 to-red-800 hover:brightness-110 transition"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer links */}
              <div className="border-t border-yellow-200/60 bg-[#f3e7dc] px-5 sm:px-6 py-2">
                <div className="flex items-center justify-center gap-4 text-sm text-red-900/70">
                  <Link href="/help" className="hover:text-red-900 hover:underline">
                    Help
                  </Link>
                  <span className="opacity-40">•</span>
                  <Link href="/privacy" className="hover:text-red-900 hover:underline">
                    Privacy
                  </Link>
                  <span className="opacity-40">•</span>
                  <Link href="/contact" className="hover:text-red-900 hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page footer */}
        <p className="mt-2 text-center text-[11px] text-yellow-100/70">
          © {new Date().getFullYear()} MSU-Iligan Institute of Technology. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}