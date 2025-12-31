"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Users from "./users/page";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!auth || !expiresAt) {
      router.push("/login");
      return;
    }

    if (Date.now() > Number(expiresAt)) {
      localStorage.removeItem("auth");
      localStorage.removeItem("expiresAt");
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
  return (
    <div className="flex justify-center items-center h-80">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-lg text-cyan-700 font-semibold">
        Loading dashboard...
      </span>
    </div>
  );
}


  return (
    <Users />
  )
}
