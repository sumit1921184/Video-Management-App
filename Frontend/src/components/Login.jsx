import { useState } from 'react'
import { useForm } from 'react-hook-form';
import login from "../assets/login.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_FAILURE, LOGIN_SUCCESS, get_USER_SUCCESS } from '../Redux/actionTypes';
import { url2 } from '../api';

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  

  const onSubmit = async () => {
    try {
      const data = { email, pass };
      let res = await fetch(`${url2}users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      let dataa = await res.json();
      console.log(dataa);

      if (res.ok) {
        setTimeout(() => {
          navigate("/")
        }, 1500);
        const tok = localStorage.setItem("token", JSON.stringify(dataa.token));
        dispatch({ type: LOGIN_SUCCESS });
        toast({
          title: dataa.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        dispatch({ type: get_USER_SUCCESS });
      } else {
        toast({
          title: dataa.msg,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }

    } catch (err) {
      console.log(err.res);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      dispatch({ type: LOGIN_FAILURE });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-purple-800 to-gray-900">
      <section>
        <div className="flex max-w-[978px] w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col items-center justify-center py-12 px-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Login</h2>
            <span className="text-gray-500 text-lg mb-6">Login to meet your furry friend</span>
            <form
              id="form"
              className="flex flex-col w-80 gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("email", { required: true ,
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: 'Invalid email address'
                }
              })}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email?.message}
                </span>
              )}
              <input
                type="password"
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("password")}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
              />
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Log In
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <img
              src={login}
              alt=""
              className="w-[520px] h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
