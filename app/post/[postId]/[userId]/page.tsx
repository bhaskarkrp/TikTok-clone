"use client";

import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import Link from "next/link";
import { use, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import { Post as PostType, PostPageProps } from "@/app/types";
import { usePostStore } from "@/app/stores/post";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comments";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";

export default function Post({ params }: PostPageProps) {
  const router = useRouter();
  const { userId, postId } = use(params);

  const { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
  const { setLikesByPost } = useLikeStore();
  const { setCommentsByPost } = useCommentStore();

  useEffect(() => {
    if (postId && userId) {
      setPostById(postId);
      setCommentsByPost(postId);
      setLikesByPost(postId);
      setPostsByUser(userId);
    }
  }, [userId, postId]);

  const loopThroughPostUp = () => {
    postsByUser.forEach((post) => {
      if (post.id > postId) {
        router.push(`/post/${post.id}/${userId}`);
      }
    });
  };

  const loopThroughPostDown = () => {
    postsByUser.forEach((post) => {
      if (post.id < postId) {
        router.push(`/post/${post.id}/${userId}`);
      }
    });
  };

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/profile/${userId}`}
            className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <AiOutlineClose size="27" />
          </Link>

          <div>
            <button
              onClick={() => loopThroughPostUp()}
              className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronUp size="30" color="#FFFFFF" />
            </button>

            <button
              onClick={() => loopThroughPostDown()}
              className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronDown size="30" color="#FFFFFF" />
            </button>
          </div>

          <img
            className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
            width="45"
            src="/images/tiktok-logo-small.png"
          />

          <ClientOnly>
            {postById?.video_url && (
              <video
                className="fixed object-cover w-full my-auto z-[0] h-screen"
                src={useCreateBucketUrl(postById?.video_url)}
              />
            )}

            <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
              {postById?.video_url && (
                <video
                  autoPlay
                  controls
                  loop
                  muted
                  className="h-screen mx-auto"
                  src={useCreateBucketUrl(postById?.video_url)}
                />
              )}
            </div>
          </ClientOnly>
        </div>

        <div
          id="InfoSection"
          className="lg:max-w-[550px] relative w-full h-full bg-white"
        >
          <div className="py-7" />

          <ClientOnly>
            {postById?.video_url ? (
              <CommentsHeader post={postById} params={{ postId, userId }} />
            ) : null}
          </ClientOnly>
          <Comments params={{ postId, userId }} />
        </div>
      </div>
    </>
  );
}
