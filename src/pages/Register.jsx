import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";

export default function Register() {
  // state
  const [showPassword, setShowPassword] = useState(false);

  // panggil function dari useForm
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();

  // function submit form
  const submitForm = (data) => {
    console.log(data);
  };

  // toggle password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App">
      <h1>Register Page</h1>

      <form
        className=" w-[300px] flex flex-col gap-4 mt-6 "
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className=" w-full flex flex-col gap-2 items-start ">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            className=" w-full p-2 "
            {...register("email", {
              required: { value: true, message: "email must be fill!" },
              pattern: {
                value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/,
                message: "email is not valid",
              },
            })}
          />
          {errors?.email && (
            <small className="text-red-500"> {errors?.email.message} </small>
          )}
        </div>

        <div className=" w-full flex flex-col gap-2 items-start ">
          <label htmlFor="password">password</label>
          <div className=" relative w-full flex flex-col justify-center ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className=" w-full p-2 "
              {...register("password", {
                required: { value: true, message: "password must be fill!" },
                minLength: {
                  value: 6,
                  message: "min 6 character",
                },
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                //   message:
                //     " Minimum eight characters, at least one letter and one number ",
                // },
              })}
            />
            <AiOutlineEye
              className=" absolute right-2 select-none cursor-pointer "
              onClick={togglePassword}
            />
          </div>
          {/* ketika dia true maka && tampikan di sebelah kanannya */}
          {errors?.password && (
            <small className="text-red-500"> {errors?.password.message} </small>
          )}
        </div>

        <div className=" w-full flex flex-col gap-2 items-start ">
          <label htmlFor="password2">repeat password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password2"
            className=" w-full p-2 "
            {...register("password2", {
              validate: (val) => {
                if (watch("password") !== val) {
                  return (errors.password2 = "password is not matched");
                }
              },
            })}
          />
          {errors?.password2 && (
            <small className="text-red-500">
              {" "}
              {errors?.password2.message}{" "}
            </small>
          )}
        </div>

        <div className=" w-full flex justify-end ">
          <button className=" w-[120px] bg-sky-500 text-white " type="submit">
            register
          </button>
        </div>
      </form>
    </div>
  );
}
