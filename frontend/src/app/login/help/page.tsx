import Link from "next/link";

const helpItems = [
  {
    title: "About the System",
    description: "Understand the purpose and core features of the system.",
    icon: "📘",
    href: "/login",
  },
  {
    title: "Getting Started",
    description: "Learn how to navigate and use essential features.",
    icon: "🧑‍💻",
    href: "/login",
  },
  {
    title: "Academic Activities",
    description: "Guidance on submissions, schedules, and evaluations.",
    icon: "📄",
    href: "/login",
  },
  {
    title: "Account & Access",
    description: "Support for login, permissions, and account issues.",
    icon: "🔐",
    href: "/login",
  },
  {
    title: "System Concerns",
    description: "Report bugs or unexpected issues in the system.",
    icon: "⚠️",
    href: "/login/contact",
  },
  {
    title: "Contact & Support",
    description: "Reach out for help and technical assistance.",
    icon: "📞",
    href: "/login/contact",
  },
];

export default function HelpPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#7f0c10] via-[#990f14] to-[#6f0d17]">

      {/* BACKGROUND SAME STYLE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,102,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_26%)]" />
      </div>

      {/* ✅ SAME WRAPPER AS LOGIN */}
      <div className="relative mx-auto flex min-h-screen w-full items-center justify-center px-4 py-5 sm:px-5 lg:px-6">

        {/* ✅ SAME SIZE AS LOGIN */}
        <div className="w-full max-w-[960px] overflow-hidden rounded-[22px] border border-yellow-100/15 bg-[#6d0f12]/20 shadow-[0_24px_60px_rgba(20,5,5,0.34)] backdrop-blur-xl">

          {/* TOP SECTION */}
          <div className="bg-gradient-to-br from-[#8c1014] via-[#7a0d12] to-[#56090d] p-5">
            <h1 className="text-2xl font-bold text-yellow-100">
              Help Center
            </h1>
            <p className="mt-2 text-sm text-yellow-100/80">
              Find guidance and support for using the Curriculum Management System.
            </p>
          </div>

          {/* CONTENT */}
          <div className="bg-[#f6ede2]/96 p-5">
            <div className="grid gap-4 sm:grid-cols-2">

              {helpItems.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-yellow-300/40 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-xs text-yellow-700 font-semibold">
                        0{index + 1}
                      </p>
                      <h3 className="text-sm font-bold text-red-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-red-900/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

            </div>

            {/* FOOTER ACTION */}
            <div className="mt-6 flex justify-between items-center border-t border-yellow-300/50 pt-4 text-sm">
              <Link href="/login" className="text-red-900 hover:underline">
                ← Back to Login
              </Link>

              <Link href="/login/contact" className="text-red-900 hover:underline">
                Contact Support →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}