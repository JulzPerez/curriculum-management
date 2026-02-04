export default function Dashboard() {
  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Login Successful!</h1>
      <p className="text-xl text-gray-600">
        You are now authenticated with the FastAPI Backend.
      </p>
    </div>
  );
}
