import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState({});
  const [imagePrev, setImagePrev] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((res) => {
          if (res) {
            setPost(res);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Postpage:::getAllPost:::", error);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (post.featuredImage) {
      appwriteService
        .getFilePreview(post.featuredImage)
        .then((r) => {
          setImagePrev(r);
        })
        .catch((error) => {
          setImagePrev(null);
          console.log("Error fetching image preview:", error);
        });
    }
  }, [post.featuredImage]);

  useEffect(() => {
    if (post && userData) {
      setIsAuthor(post.userId === userData.userData.$id);
    }
  }, [post, userData]);
  // console.log(isAuthor);
  // console.log(post.userId);
  // console.log(userData.userData.$id);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {imagePrev && (
            <img src={imagePrev.href} alt={post.title} className="rounded-xl" />
          )}
        </div>
        {isAuthor && (
          <div className="mt-10">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3" BtnText="Edit" />
            </Link>
            <Button
              bgColor="bg-red-500"
              onClick={deletePost}
              BtnText="Delete"
            />
          </div>
        )}
        <div className="w-full mb-6">
          <h1>{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content || "")}</div>
      </Container>
    </div>
  );
}
