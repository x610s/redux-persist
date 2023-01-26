import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLogin, LoginResponse } from "../../models/auth.model";
import { fetchLogin } from "../../features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logUser } from "../../features/auth/authSlice";
export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthLogin>();
  
  const { auth } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [formulario, setformState] = useState<boolean | null>(null);

  const onSubmit = async (data: AuthLogin) => {
    fetchLogin(data)
      .then((data) => {
        const { message, token, user_email, user_id }: LoginResponse =
          data.data;
        dispatch(logUser({ message, token, user_email, user_id }));
        setformState(true);
      })
      .catch((error) => {
        setformState(false);
      });
  };

  return (
    <>
      {JSON.stringify(auth)}
      {formulario == null && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white p-7 rounded mx-auto mt-5"
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                defaultValue={"nuevoUser"}
                {...register("email")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
       text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
            </div>
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                defaultValue={"nuevoUser"}
                {...register("password")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
       leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <input
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value={"  Sign Up"}
              />
            </div>
            {errors.password && <span>This field is required</span>}
          </div>
        </form>
      )}

      {formulario === false && <h2>ERROR!!!!</h2>}
      {formulario === true && <h2>ingresando</h2>}
    </>
  );
};
