"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { UseDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
// import signup from "../../../public/assets/photos/signup/signuphero.png";
import signup from "@/../public/assets/photos/signup/signuphero1.svg";
import hrmslogo from "@/../public/assets/photos/signup/hrmslogo.svg";
import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { setEmail } from "@/redux/slices/resetPasswordSlice";
import { CiLight } from "react-icons/ci";

const Signup = () => {
  const router = useRouter();
  const email = useRef();
  const [emails, setemails] = useState("");

  const dispatch = useDispatch();
  // const password = useRef();
  // const passwordConfirm = useRef();

  const [valid, setValid] = useState(true);
  const [passMatch, setPassMatch] = useState();
  const [errMessage, setErrMessage] = useState("");

  const signupDetails = async (values) => {
    console.log("in finish");
    const data = {
      email: values.email,
      password: values.password,
      // {
      //   "email": "user@example.com",
      //   "password": "string@S123"
      // }
    };

    if (values.password === values.confirmpassword) {
      setPassMatch(true);
      try {
        console.log("data", data.emp_type);
        const response = await axios.post("/signup", data);
        console.log("response", response);
        console.log(response.message);
        if (response.status == 200) {
          dispatch(setEmail(emails));
          router.push("/signup/confirm-mail", { email: emails });
        } else {
          setValid(false);
          console.log(response);
        }
      } catch (error) {
        // console.log("error", error.response.data.message);
        console.log(error);
        console.log(emails);

        dispatch(setEmail(emails));

        // console.log(error.response.data.message);
        if (error.response.data.message == "invalid request body") {
          setErrMessage("Enter a valid Email and Password");
        } else {
          setErrMessage(error.response.data.message);
        }
        setValid(false);
      }
    } else {
      console.log(
        "Password do not match p1",
        values.password,
        "p2",
        values.confirmpassword,
        "?"
      );
    }
  };

  const handleOnSubmit = () => {
    router.push("/signup/confirm-mail");
  };

  // const handleFormValuesChange = (changedValues, allValues) => {
  //   if ("password" in changedValues) {
  //     setPassword(changedValues.password);
  //   }
  //   if ("confirmpassword" in changedValues) {
  //     setConfirmPassword(changedValues.confirmpassword);
  //   }
  //   if (password && confirmPassword) {
  //     setPassMatch(password === confirmPassword);
  //   }
  // };

  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      callback("Please enter a valid email address");
    } else {
      callback();
    }
  };

  const validatePassword = (rule, value, callback) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (value && !passwordRegex.test(value)) {
      callback(
        "Password must contain at least 8 characters including uppercase, lowercase, and numbers"
      );
    } else {
      callback();
    }
  };

  // console.log(email.current.value);
  return (
    <div className="flex justify-center items-center p-10 gap-16">
      <div className="md:w-[70vw] md:h-[88vh] bg-[#E6F7FF] rounded-3xl flex justify-center items-center">
        <Image src={signup} alt="signup" className="w-[80%]" />
      </div>
      <div className="md:w-[50vw] flex flex-col  items-start">
        <span className="flex items-center gap-3">
          <Image src={hrmslogo} alt="logo" />
          <h1 className="font-semibold text-2xl">HRMS</h1>
        </span>
        <div className="mt-12">
          <h1 className="font-semibold text-xl">Sign up</h1>
          <h2 className="text-[#A2A1A8] text-md">Create Your Account</h2>
        </div>
        <div className="mt-5">
          <Form
            className="flex flex-col "
            style={{ width: "50vh", fontSize: "1.1rem" }}
            // onFinish={() => {
            //   console.log("form submitted");
            //   router.push("/signup/confirm-mail");
            // }}
            onFinish={signupDetails}
            // onValuesChange={handleFormValuesChange}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: `${false ? "hello" : "Please enter valid email"}`,
                },
              ]}
            >
              <Input
                placeholder="Email"
                style={{ fontSize: "1.2rem" }}
                ref={email}
                required={true}
                onChange={(e) => {
                  email.current.value = e.target.value;
                  setemails(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please create your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password(8 digits at least, case sensitive)"
                style={{ fontSize: "1.1rem" }}
                size="large"
                required={true}
              />
            </Form.Item>

            {/* <Form.Item
              name="confirmpassword"
              rules={[
                {
                  required: true,
                  message: `${!passMatch && "Password does not match!"}`,
                },
              ]}
            > */}
            <Form.Item
              name="confirmpassword"
              dependencies={["password"]} // Make the validation dependent on the password field
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve(); // Passwords match, resolve the promise
                    }
                    return Promise.reject("The two passwords do not match!"); // Passwords don't match, reject the promise
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Comfirm password"
                style={{ fontSize: "1.1rem" }}
                size="large"
                required={true}
              />
            </Form.Item>
            {/* <Link href="/signup/confirm-mail"> */}
            {errMessage && (
              <p className=" text-red-500 mt-4 mb-2 text-[14px]">
                {errMessage}
              </p>
            )}

            <button
              className="w-full "
              // type="primary"
              // type="submit"
              style={{
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "5px",
                paddingTop: "5px",
                backgroundColor: "#1890FF",
                color: "white",
                borderRadius: "5px",
              }}
              size="large"
              // disabled={ !passMatch}
              // onClick={() => {
              //   handleOnSubmit();
              // }}
            >
              Create Account
            </button>
            {/* </Link> */}
          </Form>
          <br />
          <span className="">
            Have an account ?{" "}
            <Link href="/login" className="text-[#1890FF]">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
