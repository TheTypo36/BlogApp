import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

const PostCard = ({ $id, title, featuredImage }) => {
  const [imageFile, setImageFile] = useState("");
  useEffect(() => {
    appwriteService
      .getFilePreview(featuredImage)
      .then((response) => setImageFile(response))
      .catch((error) => {
        console.log("error::previewFile::", error);
      });
    // setImageFile(appwriteService.getFilePreview(featuredImage));
  }, [featuredImage]);

  console.log(imageFile.href);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          <img src={imageFile.href} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
