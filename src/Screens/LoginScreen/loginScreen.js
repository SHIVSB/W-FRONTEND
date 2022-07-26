import axios from "axios";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let headers = new Headers();
  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password,
    };

    await axios
      .post("http://localhost:4000/api/v1/signin", loginData)
      .then(function (response) {
        if (response.data.success) {
          headers.set("authorization", "Bearer" + " " + response.data.token);
          localStorage.setItem("token", "Bearer " + response.data.token);
          // console.log(localStorage.getItem("token"))
          localStorage.setItem("user", response.data.result.firstName);
          localStorage.setItem("userid", response.data.result._id);
          window.location.href = "/maincontent";
        }
      })
      .catch(function (error) {
        console.log(error);
        window.location.href = "/";
      });
  };

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <div>
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
            <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
              -----------------------
            </p>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                    Sign In
                  </h2>
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    className=""
                  >
                    Home
                  </button>
                </div>
              </div>
              <form action="" className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="username" className="text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Please insert your username"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Please insert your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type="button"
                    className="w-full py-4 bg-green-600 rounded-lg text-green-100"
                    onClick={handleLogin}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </div>
                      <div className="font-bold">Sigin</div>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <a
                      href="#"
                      className="w-full text-center font-medium text-gray-500"
                    >
                      <span className="text-green-700 mx-1  self-center px-4 py-2 rounded-md hover:cursor-pointer">
                        Recover password!
                      </span>
                    </a>
                    <a
                      href="/signup"
                      className="w-full text-center font-medium text-gray-500"
                    >
                      <span className="text-green-700 mx-1  self-center px-4 py-2 rounded-md hover:cursor-pointer">
                        Signup!
                      </span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
