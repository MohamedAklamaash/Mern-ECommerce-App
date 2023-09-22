import React, { useState } from "react";
import HandleProfileupload from "./HandleProfileupload";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { profileUrl } = useSelector((state) => state.user);
  if(!profileUrl)
  {
    return(
      <div>
        <h1>
          error in uploading the image
        </h1>
      </div>
    )
  }
  console.log("Profile url in signUp page:", profileUrl[0]);
  //upload image in avatar.url
  const HandleLogin = async () => {
    const data = await fetch("http://localhost:5001/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: {
          url: profileUrl[0],
        },
        name,
        email,
        password,
      }),
    });
    const json = await data.json();
    localStorage.setItem("user_id",json.user._id);
    console.log("ID:",localStorage.getItem("user_id"));
    if (!json.success) {
      navigate("/signup");
      return;
    }
    if (json.success) {
      return (
        <div className=" z-10 text-2xl font-medium">
          <h1>
            Thanks for logging in!💕
            {navigate("/")}
          </h1>
        </div>
      );
    }
    alert("There are some missing credentials!");
    navigate("/signup");
  };
  if(localStorage.getItem("user_id"))
  {
    return (
      <div className="flex items-center justify-center h-[100vmin] ">
        <main>
          <h1 className="font-mono text-4xl">
            User already logged in
          </h1>
          <button onClick={()=>localStorage.removeItem("user_id")} className="flex items-center">
            <span className="text-lg font-sans">Do you want to</span>{"  "}Logout?
          </button>
        </main>
      </div>
    );
  }
  return (
    <div>
      <header className=" mt-10 text-4xl text-center font-bold ">
        SignUp Now to get Massive discounts now😍
      </header>
      <main>
        <main className="w-[100%] h-[100vmin] max-md:mb-[100px] ">
          <h1 className="text-[70px] mt-10 ml-10 font-bold">SignUp Now</h1>
          <HandleProfileupload />
          <div className="leading-10 flex flex-col justify-center items-center mb-[10rem] ">
            <label className="text-lg font-semibold ">Enter Your Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="p-2 rounded-full border-2 w-[50%] border-b-slate-500 mb-16    "
              onChange={(event) => setname(event.target.value)}
            />
            <label className="text-lg font-semibold ">
              Enter Your EmailID:
            </label>
            <input
              type="email"
              placeholder="@gmail.com"
              className="p-2 rounded-full w-[50%] border-2 border-b-slate-500 mb-16 "
              onChange={(event) => setemail(event.target.value)}
            />
            <label className="text-lg font-semibold">
              Enter Your password:
            </label>
            <input
              type="password"
              className="p-2 rounded-full w-[50%] border-2 border-b-slate-500 mb-16 "
              placeholder="password"
              onChange={(event) => setpassword(event.target.value)}
            />
            <div className="flex items-center justify-around  w-[50%]">
              <button
                type="submit"
                className="bg-black rounded-t-full rounded-br-full p-4 shadow-md font-serif text-lg text-grey text-[#fff] w-[10rem]"
                onClick={HandleLogin}
              >
                signup
              </button>
              <button>
                <span className="font-mono">Already a user?</span>
                <a
                  href="/login"
                  type="button"
                  className="bg-black rounded-t-full rounded-br-full p-4 shadow-md font-serif text-lg text-grey text-[#fff] w-[10rem] "
                >
                  Login
                </a>
              </button>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
};

export default SignUpPage;
