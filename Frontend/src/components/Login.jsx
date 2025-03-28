import { useState } from "react";
import { useForm } from "react-hook-form";
import login from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { LOGIN_FAILURE, LOGIN_SUCCESS, get_USER_SUCCESS } from "../Redux/actionTypes";
import { url2 } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setLoading(true); // Show loader
    try {
      const data = { email, pass };
      let res = await fetch(`${url2}users/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      let dataa = await res.json();

      if (res.ok) {
        localStorage.setItem("token", JSON.stringify(dataa.token));
        dispatch({ type: LOGIN_SUCCESS });
        dispatch({ type: get_USER_SUCCESS });

        toast({
          title: dataa.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => navigate("/"), 1500);
      } else {
        toast({
          title: dataa.msg,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      dispatch({ type: LOGIN_FAILURE });
    }
    setLoading(false); // Hide loader
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-purple-800 to-gray-900">
      <section>
        <div className="flex max-w-[978px] w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-center justify-center py-12 px-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Login</h2>
            <span className="text-gray-500 text-lg mb-6">Login to meet your furry friend</span>
            <form id="form" className="flex flex-col w-80 gap-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

              <input
                type="password"
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

              <button
                type="submit"
                className={`bg-blue-600 text-white py-2 px-4 rounded flex justify-center items-center 
                  ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  "Log In"
                )}
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <img src={login} alt="Login" className="w-[520px] h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
