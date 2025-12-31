"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("")

  const onSubmit = (data) => {
    if (data.password === "1234" && data.username === "admin") {
      const setAuth = () => {
      const expireTime = Date.now() + 30 * 60 * 1000; // 30 دقیقه
      localStorage.setItem("auth", "true");
      localStorage.setItem("expiresAt", expireTime);
      router.push("/dashboard");
    }

    setAuth();
    } else {
      setError("Username or password is incorrect ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-cyan-600 via-cyan-700 to-cyan-900 p-6">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Dashboard Login
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-3">{error}</p>
        )}

        <div className="flex flex-col gap-5">
          
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username (e.g., admin)"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password (e.g., 1234)"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-cyan-900 font-semibold hover:bg-cyan-100 transition duration-300"
          >
            Login
          </button>

        </div>
      </form>
    </div>
  );
}
