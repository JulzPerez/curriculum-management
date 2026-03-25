import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#b31217_0%,#8f0d10_35%,#6f0d17_70%,#4f0910_100%)] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1380px] items-center justify-center">
        <div className="grid w-full max-w-[1220px] overflow-hidden rounded-[28px] border border-white/10 bg-[#8f0d10]/25 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md lg:grid-cols-[1.2fr_0.88fr]">
          
          {/* LEFT PANEL */}
          <section className="relative flex flex-col justify-between bg-[linear-gradient(160deg,#a30814_0%,#8d0611_45%,#7b0610_100%)] px-7 py-7 sm:px-9 sm:py-8 lg:px-10 lg:py-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,196,0,0.08),transparent_24%)]" />

            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#d9b233]/30 bg-white/10 px-4 py-2.5 text-xs font-medium tracking-wide text-[#f0c86d] shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9b233]" />
                Curriculum Management System
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[22px] bg-white shadow-[0_16px_28px_rgba(0,0,0,0.18)]">
                  <img
                    src="/msu-iit-logo.png"
                    alt="MSU-IIT Logo"
                    className="h-[54px] w-[54px] object-contain"
                  />
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e4ba63]">
                    MSU-IIT
                  </p>
                  <h1 className="max-w-[460px] text-[2rem] font-bold leading-[1.05] tracking-tight text-[#fff1bf] sm:text-[2.45rem]">
                    MSU-Iligan Institute
                    <br />
                    of Technology
                  </h1>
                </div>
              </div>

              <p className="mt-7 max-w-[620px] text-[0.96rem] leading-7 text-[#f3cfb7]">
                Access a refined workspace for managing curricula, academic
                structures, and program records with clarity, control, and confidence.
              </p>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-white/10 bg-white/10 px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e4ba63]">
                  Secure
                </p>
                <p className="mt-3 text-sm leading-6 text-[#f8d8c0]">
                  Protected access for institutional users
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/10 px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e4ba63]">
                  Organized
                </p>
                <p className="mt-3 text-sm leading-6 text-[#f8d8c0]">
                  Structured curriculum and program management
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/10 px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e4ba63]">
                  Efficient
                </p>
                <p className="mt-3 text-sm leading-6 text-[#f8d8c0]">
                  Built for faster academic workflows
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="flex items-center bg-[#f2e6db] px-7 py-7 sm:px-9 sm:py-8 lg:px-10 lg:py-9">
            <div className="mx-auto w-full max-w-[390px]">
              <div className="inline-flex rounded-full border border-[#e2c86b] bg-white/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b77472]">
                Portal Access
              </div>

              <h2 className="mt-6 text-[2.7rem] font-bold leading-none tracking-tight text-[#5d0609]">
                Welcome back
              </h2>

              <p className="mt-4 max-w-[340px] text-[0.97rem] leading-7 text-[#b17a78]">
                Sign in to continue managing curricula and academic programs.
              </p>

              <div className="mt-8">
                <LoginForm />
              </div>

              <div className="mt-7 border-t border-[#ead2ad] pt-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#b77472]">
                  <a href="/login/help" className="transition hover:text-[#8f0d10]">
                    Help
                  </a>
                  <span className="text-[#d3b7ae]">•</span>
                  <a href="/login/privacy" className="transition hover:text-[#8f0d10]">
                    Privacy
                  </a>
                  <span className="text-[#d3b7ae]">•</span>
                  <a href="/login/contact" className="transition hover:text-[#8f0d10]">
                    Contact
                  </a>
                </div>

                <p className="mt-4 text-xs leading-6 text-[#c19795]">
                  © 2026 MSU-Iligan Institute of Technology. All rights reserved.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}