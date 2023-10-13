import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const HandleLogin = async () => {
    const data = await fetch(
      "https://aklamaash-e-commerce.vercel.app/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    ).catch(() => {
      alert("Invalid Credentials");
    });
    const json = await data.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      alert("User Logged SuccessFully!!");
      navigate("/");
    }
  };
  return (
    <div>
      <header className="  text-4xl text-center font-bold">
        Login in Now or Regret Later
      </header>
      <main>
        <main className="w-[100%] h-[100vmin] max-md:mb-[10px]  max-sm:mb-[250px] ">
          <h1 className="text-[70px] mt-10 ml-10 font-bold">Login Now😍</h1>
          <div className="leading-10 flex flex-col justify-center items-center mt-10  ">
            <label className="text-lg font-semibold text-left ">
              Enter Your EmailID:
            </label>
            <input
              type="email"
              placeholder="@gmail.com"
              className="w-[50%] px-2 max-md:w-[80%] rounded-full border-2 border-b-slate-500 mb-16 "
              onChange={(event) => setemail(event.target.value)}
            />
            <label className="text-lg font-semibold ">
              Enter Your password:
            </label>
            <input
              type="password"
              className="w-[50%] px-2 max-md:w-[80%] rounded-full  border-2 border-b-slate-500 mb-16 "
              placeholder="password"
              onChange={(event) => setpassword(event.target.value)}
            />
            <div className="flex items-center justify-evenly w-[50%]">
              <button
                type="submit"
                className="bg-black rounded-t-full rounded-br-full p-4 shadow-md font-serif text-lg text-grey text-[#fff] w-[10rem]"
                onClick={HandleLogin}
              >
                Login
              </button>
              <button>
                <span>New User</span>
                <br />
                <Link to="/signup">SignUp Now!</Link>
              </button>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
};

export default LoginPage;
