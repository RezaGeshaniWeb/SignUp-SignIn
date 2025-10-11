"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Form({ initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/update-info", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      toast.success("Information updated successfully !")
    } else {
      toast.error(data.message)
    }
  };

  const formContainerClasses =
    "space-y-4 p-6 bg-gray-850 rounded-lg border border-gray-700";
  const titleClasses = "text-xl font-bold text-white mb-4";
  const inputClasses =
    "w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-200";
  const buttonClasses =
    "w-full py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md disabled:bg-gray-500";

  return (
    <div className={formContainerClasses}>
      <Toaster />

      <h2 className={titleClasses}>Complete your profile</h2>

      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClasses}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={inputClasses}
      />

      <input
        type="password"
        placeholder="Current or new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClasses}
      />

      <button
        onClick={submitHandler}
        className={buttonClasses}
        disabled={!name || !lastName || !password}
      >
        Send Information
      </button>
    </div>
  );
}