import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  console.log("in login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log("in login2");

    setError("");
    try {
      console.log("in login3");

      const session = await authService.login(data);
      console.log("in login4", session);

      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("in login5", userData);
        if (userData) {
          dispatch(authLogin(userData));
          console.log("in login6");
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "an expected error occured");
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight"></h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any acount?&nbsp;
          <Link
            to="/signUP"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            SignUp
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8">{error}</p>}
        <form className="mt-8" onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter the email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "email address must be a valid address",
                },
              })}
            />
            <Input
              label="password"
              placeholder="enter the password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" BtnText="Log In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
