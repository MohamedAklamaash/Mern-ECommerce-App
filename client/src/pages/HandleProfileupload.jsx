import React, { useState,useEffect } from "react";
import dummyLogo from "../assets/DummyProfile.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfileUrl } from "../store/userSlice";
const HandleProfileupload = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const uploadImage = async () => {
    setLoading(true);
    if (image === "") {
      return;
    }
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "eenfugkp");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duhkiwuqq/image/upload",
        data
      );
      const imageUrl = response?.data?.secure_url;
      setUrl(imageUrl);
        
      dispatch(setProfileUrl(imageUrl));
      setPreview(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    uploadImage();
  },[uploadImage])

  return (
    <div className="flex items-center justify-center">
      {image === "" ? (
        <img
          src={dummyLogo}
          className="w-36 h-36 rounded-full"
          alt="Dummy Logo"
        />
      ) : (
        <img
          src={url}
          className="w-36 h-36 rounded-full"
          alt="User's Profile"
        />
      )}
      <input
        type="file"
        accept=".png,.jpeg,.jpg,.mkv,.svg"
        id="fileInput"
        className="hidden"
        onChange={(event) => {
          const selectedFile = event.target.files[0];
          if (selectedFile && selectedFile.type.startsWith("image/")) {
            setImage(selectedFile);
          } else {
            alert("Please select a valid image file.");
          }
        }}
      />
      <label
        htmlFor="fileInput"
        className="inline-block cursor-pointer rounded-full absolute ml-[120px] mt-20 text-4xl border border-black w-[44px] text-center h-[44px]"
        onClick={() => uploadImage()}
      >
        +
      </label>
    </div>
  );
};

export default HandleProfileupload;
