import LoginForm from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-50 flex items-center justify-center px-4 py-12">
      
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200 blur-3xl" />
      </div>

      <section className="relative w-full max-w-md">
        
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            CSD Curriculum Management System
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to continue
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} CSD
        </p>
      </section>
    </main>
  );
}