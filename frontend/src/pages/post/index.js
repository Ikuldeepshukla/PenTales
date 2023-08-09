import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/index";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/reducers/postSlice";
import ViewPost from "../../components/view-post/index";
import { useParams } from "react-router-dom";

const Index = () => {
  const [post, setPost] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts());
    } else {
      const postObj =
        Array.isArray(posts) && posts.find((post) => post._id === id);
      setPost(postObj);
    }
    // return () => null;
  }, [posts]);

  return (
    <Layout>
      {post && Object.keys(post).length && <ViewPost {...post} />}
    </Layout>
  );
};

export default Index;
