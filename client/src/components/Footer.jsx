import React from 'react'
import getItonAndroidPic from "../assets/getItonAndroidPic.png";
import getItonIOSPic from "../assets/getItonIOSPic.png";
import instagramPic from "../assets/instagram.png";
import facebookPic from "../assets/facebook.png";
import twitterPic from "../assets/twitter.png";

const Footer = () => {
  return (
    <div className="max-sm:block flex items-center justify-around bg-black text-white leading-12">
      <div className="">
        <img
          src={getItonAndroidPic}
          alt="getItonAndroidPic"
          width={300}
          height={300}
          className="cursor-pointer"
        />
        <img
          src={getItonIOSPic}
          alt="getItonIOSPic"
          width={300}
          height={300}
          className="cursor-pointer"
        />
        <h1 className="cursor-pointer font-semibold ">Download our App</h1>
        <h6 className="cursor-pointer font-semibold">
          Download App for Android and IOS devices
        </h6>
      </div>
      <div className="">
        <h1 className="text-4xl text-red-600 font-bold">E-Commerce App</h1>
        <h2 className="mt-4 font-semibold">
          High Quality is our first priority
        </h2>
        <h2 className="font-semibold">Copyrights 2023 ©</h2>
      </div>
      <div>
        <ul className="flex gap-3">
          <li>
            <a href="/">Follow Us</a>
          </li>
          <li>
            <a href="/">
              <img
                src={instagramPic}
                alt="instagramPic"
                width={30}
              />
            </a>
          </li>
          <li>
            <a>
              <img src={facebookPic} alt="instagramPic" width={30} />
            </a>
          </li>
          <li>
            <a>
              <img src={twitterPic} alt="instagramPic" width={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer