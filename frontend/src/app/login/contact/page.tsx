import Link from "next/link";

const contactItems = [
  {
    title: "Email Support",
    description:
      "Send concerns regarding login issues, account access, and technical problems encountered in the system.",
    icon: "✉️",
    value: "support@university.edu",
  },
  {
    title: "Office Hours",
    description:
      "Support services are available during official working hours for academic and technical concerns.",
    icon: "🕒",
    value: "Monday – Friday, 8:00 AM – 5:00 PM",
  },
  {
    title: "Office Location",
    description:
      "Visit the designated office for in-person assistance and administrative support when needed.",
    icon: "📍",
    value: "MSU-Iligan Institute of Technology",
  },
  {
    title: "Technical Assistance",
    description:
      "Get help with page errors, bugs, failed actions, and other unexpected system behavior.",
    icon: "🛠️",
    value: "System Support Desk",
  },
  {
    title: "General Inquiries",
    description:
      "Ask questions about the platform, its features, navigation, and academic workflow guidance.",
    icon: "📞",
    value: "Curriculum Management Support",
  },
  {
    title: "Guided Support",
    description:
      "Be directed to the most appropriate help page or support channel based on your concern.",
    icon: "🧭",
    value: "Help Center Assistance",
  },
];

export default function ContactPage() {
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
          {/* Header section */}
          <div className="bg-gradient-to-br from-[#8c1014] via-[#7a0d12] to-[#56090d] p-5">
            <h1 className="text-2xl font-bold text-yellow-100">
              Contact Support
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-yellow-100/80">
              Reach the appropriate support channel for technical concerns,
              account assistance, and general inquiries about the Curriculum
              Management System.
            </p>
          </div>

          {/* Content section */}
          <div className="bg-[#f6ede2]/96 p-5">
            {/* Same table/card size as Help page */}
            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item, index) => (
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
                      <p className="mt-2 text-[13px] font-semibold leading-5 text-red-950 break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="mt-6 flex items-center justify-between border-t border-yellow-300/50 pt-4 text-sm">
              <Link
                href="/login/help"
                className="text-red-900 transition hover:text-red-950 hover:underline"
              >
                ← Back to Help Center
              </Link>

              <Link
                href="/login"
                className="text-red-900 transition hover:text-red-950 hover:underline"
              >
                Back to Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}