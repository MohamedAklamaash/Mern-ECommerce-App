import React,{useState} from 'react'
import dummyLogo from "../assets/DummyProfile.png";
import {Image} from "cloudinary-react";
import gif from "../assets/ben-redblock-loading.gif";
const HandleProfileupload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    console.log(image);
    data.append("upload_preset", process.env.upload_preset);
    data.append("cloud_name", process.env.cloud_name);
    data.append("folder", "Mern-e-commerce-users-profile-pic");
    console.log("process.env.upload_preset:", process.env.upload_preset);
    try {
      //url below is broken need to fix it
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setUrl(res.public_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className="flex items-center justify-center">
      {console.log(url)}
      <img src={dummyLogo || url} className='w-36 h-36' />
      <input type="file" accept=".png,.jpeg,.jpg,.mkv,.svg" id="fileInput" className='hidden' onChange={handleImageChange} />
      <label for="fileInput" className='inline-block cursor-pointer rounded-full absolute ml-[70px] mt-16 text-4xl border border-black w-[44px] text-center h-[44px]' onClick={uploadImage}>+</label>
    </div>
  );
}

export default HandleProfileupload