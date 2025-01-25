import { useEffect } from "react";
import { PostMainProps } from "../types";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import PostMainLikes from "./PostMainLikes";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { useUser } from "../context/user";

export default function PostMain({ post }: PostMainProps) {
  const contextUser = useUser();

  useEffect(() => {
    const video = document.getElementById(
      `video-${post.id}`
    ) as HTMLVideoElement;
    const postMainElement = document.getElementById(`postMain-${post.id}`);

    if (postMainElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries[0].isIntersecting ? video.play() : video.pause();
        },
        { threshold: [0.6] }
      );

      observer.observe(postMainElement);
    }
  }, []);

  return (
    <>
      <div id={`postMain-${post.id}`} className="flex border-b py-6">
        <div className="cursor-pointer">
          <img
            className="rounded-full max-h-[60px]"
            src={useCreateBucketUrl(post.profile.image)}
            alt="profile image"
          />
        </div>

        <div className="pl-3 w-full px-4">
          <div className="flex items-center justify-between pb-0.5">
            <Link href={`/profile/${post.user_id}`}>
              <span className="font-bold hover:underline cursor-pointer">
                {post.profile.name}
              </span>
            </Link>

            {contextUser?.user?.id !== post.user_id && (
              <button
                onClick={() => {
                  alert("Feature in progress");
                }}
                className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md"
              >
                follow
              </button>
            )}
          </div>

          {/* <p className="text-[14px] text-gray-500 pb-0.5">
            #fun #cool #superAwesome
          </p> */}

          <p className="text-[14px] pb-0.5 flex items-center font-semibold">
            <ImMusic size={17} />
            <span className="px-1">original sound - AWESOME</span>
            <AiFillHeart size={20} />
          </p>

          <div className="mt-2.5 flex">
            <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
              <video
                id={`video-${post.id}`}
                loop
                controls
                muted
                src={useCreateBucketUrl(post.video_url)}
                className="rounded-xl object-cover mx-auto h-full"
              />

              <img
                className="absolute right-1 bottom-1"
                width={90}
                src="/images/tiktok-logo-white.png"
                alt="watermark"
              />
            </div>

            <PostMainLikes post={post} />
          </div>
          <p className="text-[15px] pb-0.5 mt-3 break-words md:max-w-[400px] max-w-[300px]">
            {post.text}
          </p>
        </div>
      </div>
    </>
  );
}
