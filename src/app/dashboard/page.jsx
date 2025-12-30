"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      router.push("/login");
    } else {
        setIsLoading(false)
    }
  }, []);

  return (
    isLoading ? <p> page is loading...</p> : (
    <ul>
      <Link href="/dashboard/users">users</Link>
    </ul>
    )
  )
}
