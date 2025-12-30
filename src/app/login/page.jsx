"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const onSubmit = (data) => {
    if (data.password === "1234" && data.username === "admin") {
      localStorage.setItem("auth" , "true")
      router.push("/dashboard")
    } else {
      alert("Username or password is incorrect")
    }
  };
  
  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-gray-200 shadow-black p-10 rounded"
      >
        <h1 className="text-center text-4xl">Login</h1>
        <input
          {...register("username", { required: true })}
          type="text"
          placeholder="Username"
          className="bg-white border-black rounded-lg p-2"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="bg-white border-black rounded-lg p-2"
        />
        <input
          type="submit"
          className="bg-cyan-950 hover:bg-cyan-800 text-amber-100 border-black rounded-lg p-2"
        />
      </form>
    </div>
  );
}
