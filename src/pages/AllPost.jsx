import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/conf";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((res) => {
        console.log(res);
        setPosts(res.documents);
      })
      .catch((error) => {
        console.log("allPostPages::getPost", error);
      });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {console.log("post", posts)}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
