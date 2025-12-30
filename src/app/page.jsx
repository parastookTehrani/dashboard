import Link from "next/link";

export default function Home() {
  return (
    <>
    <ul className="flex justify-center gap-5 p-5">
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
      
    </ul>
    </>
  );
}
