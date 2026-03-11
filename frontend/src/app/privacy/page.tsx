import Image from "next/image";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="login-bg min-h-[100svh] w-full flex items-start justify-center px-4 py-3 sm:py-4 overflow-hidden">
      <div className="relative w-full max-w-lg">

        {/* HEADER */}
        <div className="flex items-center justify-center gap-3 text-center mb-3 sm:mb-4">
          <div className="shrink-0">
            <div className="bg-white p-2.5 rounded-xl shadow-lg border border-white">
              <Image
                src="/msu-iit-logo.png"
                alt="MSU-IIT Logo"
                width={78}
                height={78}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-left">
            <h1 className="text-base sm:text-lg font-extrabold tracking-wide text-yellow-200 leading-tight">
              MSU-ILIGAN INSTITUTE
              <br className="hidden sm:block" />
              OF TECHNOLOGY
            </h1>
            <p className="mt-1 text-xs text-yellow-100/80">
              Curriculum Management System
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="mx-auto w-full rounded-2xl bg-[#f7efe6] shadow-2xl ring-1 ring-yellow-200/50 overflow-hidden">
          <div className="p-[2px] bg-gradient-to-r from-yellow-200/70 via-yellow-100/40 to-yellow-200/70">
            <div className="rounded-2xl bg-[#f7efe6]">

              <div className="px-5 sm:px-6 pt-5 pb-4">

                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-extrabold text-red-900">
                    Privacy Policy
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-red-900/70">
                    Data protection and privacy
                  </p>
                </div>

                <div className="mt-4 space-y-3 text-sm text-red-950/90">

                  <div className="rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 p-4">
                    <p>
                      The Curriculum Management System respects the privacy of
                      all users and ensures that personal data is handled
                      responsibly.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 p-4">
                    <p>
                      User information collected in this system is used only for
                      academic administration and curriculum management.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 p-4">
                    <p>
                      This system complies with institutional data privacy
                      policies and applicable regulations.
                    </p>
                  </div>

                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center w-full rounded-xl py-2.5 text-white font-bold text-base shadow-lg
                    bg-gradient-to-r from-red-800 via-red-700 to-red-800 hover:brightness-110 transition"
                  >
                    Back to Login
                  </Link>

                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t border-yellow-200/60 bg-[#f3e7dc] px-5 sm:px-6 py-2.5">
                <div className="flex items-center justify-center gap-5 text-sm text-red-900/70">
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

        <p className="mt-3 text-center text-xs text-yellow-100/70">
          © {new Date().getFullYear()} MSU-Iligan Institute of Technology.
        </p>

      </div>
    </div>
  );
}