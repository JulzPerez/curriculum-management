import Link from "next/link";

const privacyItems = [
  {
    title: "Information Collected",
    description:
      "The system collects basic user data, account details, and academic-related information necessary for functionality.",
    icon: "📊",
  },
  {
    title: "Use of Information",
    description:
      "Collected data is used for system access, academic processes, and platform operations.",
    icon: "⚙️",
  },
  {
    title: "Data Protection",
    description:
      "Measures are implemented to protect information from unauthorized access or misuse.",
    icon: "🛡️",
  },
  {
    title: "User Responsibility",
    description:
      "Users must maintain account confidentiality and ensure proper use of the system.",
    icon: "👤",
  },
  {
    title: "Policy Updates",
    description:
      "Policies may be updated to reflect institutional or system changes.",
    icon: "🔄",
  },
  {
    title: "Compliance & Usage",
    description:
      "Using the system means acceptance of the policies and proper handling of data.",
    icon: "📄",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#7f0c10] via-[#990f14] to-[#6f0d17]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,102,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,190,120,0.07),transparent_28%)]" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-200/10 blur-3xl" />
        <div className="absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-[#ffcc70]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[-5rem] h-96 w-96 rounded-full bg-[#5c0b12]/30 blur-3xl" />
      </div>

      {/* Same wrapper / same rectangle size */}
      <div className="relative mx-auto flex min-h-screen w-full items-center justify-center px-4 py-5 sm:px-5 lg:px-6">
        <div className="w-full max-w-[960px] overflow-hidden rounded-[22px] border border-yellow-100/15 bg-[#6d0f12]/20 shadow-[0_24px_60px_rgba(20,5,5,0.34)] backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#8c1014] via-[#7a0d12] to-[#56090d] p-5">
            <h1 className="text-2xl font-bold text-yellow-100">
              Privacy Policy
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-yellow-100/80">
              Learn how the system handles your data, protects your
              information, and supports secure and responsible use within the
              platform.
            </p>
          </div>

          {/* Content */}
          <div className="bg-[#f6ede2]/96 p-5">
            {/* Same table/card size as Help page */}
            <div className="grid gap-4 sm:grid-cols-2">
              {privacyItems.map((item, index) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-yellow-300/40 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-yellow-700">
                        0{index + 1}
                      </p>
                      <h3 className="text-sm font-bold text-red-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-red-900/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="mt-6 flex items-center justify-between border-t border-yellow-300/50 pt-4 text-sm">
              <Link
                href="/login"
                className="text-red-900 transition hover:text-red-950 hover:underline"
              >
                ← Back to Login
              </Link>

              <div className="flex items-center gap-4">
                <Link
                  href="/login/help"
                  className="text-red-900 transition hover:text-red-950 hover:underline"
                >
                  Help Center
                </Link>
                <Link
                  href="/login/contact"
                  className="text-red-900 transition hover:text-red-950 hover:underline"
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}