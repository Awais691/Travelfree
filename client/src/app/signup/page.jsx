"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "At least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Min 6 characters"),
  role: yup.string().required(),
});

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

// ✅ Submit Handler
const onSubmit = async (data) => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success(result.message || "Signup successful!");
      router.push("/login"); // ✅ Redirect to login page
    } else {
      // ✅ Check if already exists
      if (res.status === 409 || result.message?.toLowerCase().includes("exists")) {
        toast.error("User already exists, please login!");
      } else {
        toast.error(result.message || "Signup failed!");
      }
    }
  } catch (err) {
    toast.error("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <select
              {...register("role")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="traveler">Traveler</option>
              <option value="host">Host</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <p className="text-center">
            Have an account already?{" "}
            <Link className="text-purple-600 underline" href={"/login"}>
              Sign in here!
            </Link>
          </p>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
