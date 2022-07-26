import React, { useState } from "react";
import axios from "axios";

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const loginData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      //   console.log(process.env.BASE_URL);
      const data = await axios.post(
        "http://localhost:4000/api/v1/signup",
        loginData
      );
      console.log(data);
      if (data.status === 200) {
        window.location.href = "http://localhost:3000";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div>
            <div className="flex flex-col w-full ">
              <div className="flex justify-center">
                <svg
                  className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <h1 className="text-5xl text-gray-800 font-bold">WYSA</h1>
              <p className="mt-2 mb-6 mx-auto md:mx-0 text-gray-500 text-center">
                -----------------------
              </p>
            </div>
          </div>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-4 text-2xl font-semibold text-center">
              User/Customer Sign up
            </h1>

            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstname"
              placeholder="First Name"
            />

            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastname"
              placeholder="Last Name"
            />

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />

            <button
              onClick={() => {
                handleSignup();
              }}
              type="submit"
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a className="no-underline border-b border-blue text-blue" href="/">
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
