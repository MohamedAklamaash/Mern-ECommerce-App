import React,{useState} from 'react'
import axios from "axios";
import HandleProfileupload from './HandleProfileupload';
const SignUpPage = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [image, setimage] = useState("");
    const HandleLogin = async () => {
    };
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
              className="border-2 w-[50%] border-b-slate-500 mb-16    "
              onChange={(event) => setname(event.target.value)}
            />
            <label className="text-lg font-semibold ">
              Enter Your EmailID:
            </label>
            <input
              type="email"
              placeholder="@gmail.com"
              className="w-[50%] border-2 border-b-slate-500 mb-16 "
              onChange={(event) => setemail(event.target.value)}
            />
            <label className="text-lg font-semibold ">
              Enter Your password:
            </label>
            <input
              type="password"
              className="w-[50%] border-2 border-b-slate-500 mb-16 "
              placeholder="password"
              onChange={(event) => setpassword(event.target.value)}
            />
            <button
              type="submit"
              className="bg-black rounded-t-full rounded-br-full p-4 shadow-md font-serif text-lg text-grey text-[#fff] w-[10rem]"
              onClick={HandleLogin}
            >
              signup
            </button>
          </div>
        </main>
      </main>
    </div>
  );
}

export default SignUpPage