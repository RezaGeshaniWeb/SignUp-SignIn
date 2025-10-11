import HomeButtons from "./components/HomeButtons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl transition duration-500 ease-in-out transform hover:scale-[1.02]">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight">
          SignUp & SignIn
        </h1>
        <h2 className="text-lg text-gray-500 text-center font-medium">
          Authentication & Authorization
        </h2>
        <hr className="border-t-2 border-indigo-100" />
        <HomeButtons />
      </div>
    </main>
  );
}
