"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";

export default function HomeButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setIsLoggedIn(true);
      });
  }, []);

  const signOutHandler = async () => {
    const res = await fetch("/api/auth/signOut");
    const data = await res.json();
    if (data.status === "success") {
      toast.success(data.message)
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Toaster />

      {isLoggedIn ? (
        <>
          <Link href={`/dashboard`}>
            <Button content={"Dashboard"} style={"primary"} />
          </Link>

          <Button clickFn={signOutHandler} content={"Sign Out"} style={"secondary"} />
        </>
      ) : null}

      {!isLoggedIn ? (
        <div className="flex flex-col space-y-4">
          <Link href={`/signup`}>
            <Button content={"Sign Up"} style={"secondary"} />
          </Link>

          <Link href={`/signin`}>
            <Button content={"Sign In"} style={"primary"} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
