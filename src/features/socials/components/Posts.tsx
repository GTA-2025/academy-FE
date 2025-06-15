"use client";
import React, { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Post } from "../types/post";
import avatar from "../../../../public/assets/avatar.png";
import { userPostStore } from "../store/useBlogStore";
import Link from "next/link";

// Add stories data
const followers = [
  { id: "1", username: "john.dev", avatar: avatar, isFollowing: false },
  { id: "2", username: "sarah.code", avatar: avatar, isFollowing: false },
  { id: "3", username: "mike.tech", avatar: avatar, isFollowing: false },
  { id: "4", username: "emma.js", avatar: avatar, isFollowing: false },
];

const Posts = () => {
  const { getPosts } = userPostStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        setError("Failed to fetch posts");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [getPosts]);

  console.log(posts);

  const getProfilePicture = (profilePic: string | null) => {
    return !profilePic || profilePic.trim() === "" ? avatar : profilePic;
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  if (posts.length === 0)
    return <div className=" mt-[10rem] ">Nothing here</div>;

  return (
    <div className="justify flex-1 space-y-4 pt-[5rem] lg:px-6 sm:ml-56">
      {/*Posts*/}
      <div className="max-w-[1500px] mx-auto flex gap-[3rem]">
        <div className="w-full">
          <div className="flex mx-auto flex-col md:px-[6rem]  xl:px-[10rem] ">
            {posts.map((post: Post) => (
              <div
                key={post._id}
                className="p-4 space-y-3 border-b md:border-t   md:border-r md:border-l   "
              >
                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/home/socials/posts/${post.authorId}`}
                    className="h-[3rem] w-[3rem] rounded-full overflow-hidden relative bg-gray-200"
                  >
                    <Image
                      src={getProfilePicture(post.profilePicture)}
                      alt={post.author || "user"}
                      fill
                      className="object-cover"
                      sizes="32px"
                      priority
                    />
                  </Link>
                  <div className="flex  flex-col">
                    <span className="font-semibold">{post.fullName}</span>
                    <span className="text-sm hover:underline decoration-blue-600  underline-offset-4 cursor-pointer  hover:text-blue-600 ">
                      @{post.author}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex flex-col gap-2  pb-4">
                  {/*{post.title && (<h2 className="font-semibold">{post.title}</h2>)}*/}
                  <p className=" text-xl w-[90%] ">{post.content}</p>
                  {post.title && (
                    <span className=" text-blue-500  font-medium">{`#${post.title}`}</span>
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5" />
                      <span>{post.likesCount} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions Sidebar */}
        <div className="hidden  lg:flex flex-col w-[350px] p-4 space-y-4 sticky top-20">
          <h3 className="text-gray-500 font-semibold">Suggested for you</h3>
          {followers.map(follower => (
            <div
              key={follower.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={follower.avatar}
                    alt={follower.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {follower.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    Suggested for you
                  </span>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-semibold hover:text-blue-700">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
