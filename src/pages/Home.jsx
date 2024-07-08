import React, { useEffect, useState } from "react";
import appwriteSerivce from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    appwriteSerivce
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {});
  }, []);
  console.log("homePost", posts.length);
  if (posts.length === 0) {
    return (
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              {authStatus === false ? "Login to read Posts" : "No post to show"}
            </h1>
          </div>
        </div>
      </Container>
    );
  }
  return (
    <div>
      <Container>
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home;
