import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function LoginProfessional() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email === "professional@example.com" && data.password === "password123") {
      toast.success("Login successful! Redirecting...", { position: "top-center" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error("Invalid email or password.", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Professional Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/api/user/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
