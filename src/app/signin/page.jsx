"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") router.replace("/dashboard")
      })
  }, [router]);

  const signInHandler = async () => {
    const res = await fetch("/api/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data)

    if (data.status === "success") {
      toast.success(data.message)
      router.push("/dashboard")
    } else {
      toast.error(data.message)
    }
  };

  const containerClasses =
    "flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white";

  const inputClasses =
    "w-full p-3 mb-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className={containerClasses}>
      <Toaster />

      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClasses}
        />

        <Button content={'login'} style={'primary'} clickFn={signInHandler} />

        <p className="text-center text-sm text-gray-400">
          Haven't registered yet?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-500 hover:text-blue-400"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
