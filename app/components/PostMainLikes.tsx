import { useEffect, useState } from "react";
import { Comment, Like, PostMainProps } from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGeneralStore } from "../stores/general";
import { useUser } from "../context/user";
import useGetCommentsByPostId from "../hooks/useGetCommentsByPostId";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";
import useIsLiked from "../hooks/useIsLiked";
import useCreateLike from "../hooks/useCreateLike";
import useDeleteLike from "../hooks/useDeleteLike";

export default function PostMainLikes({ post }: PostMainProps) {
  const router = useRouter();

  const { setIsLoginOpen } = useGeneralStore();
  const contextUser = useUser();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const getAllCommentsByPost = async () => {
    const result = await useGetCommentsByPostId(post.id);
    setComments(result);
  };

  const getAlllikesByPost = async () => {
    const result = await useGetLikesByPostId(post.id);
    setLikes(result);
  };

  const hasUserLikedPost = () => {
    if (!contextUser) return;

    if (likes.length < 1 || !contextUser.user?.id) {
      setUserLiked(false);
      return;
    }

    const res = useIsLiked(contextUser.user.id, post.id, likes);
    setUserLiked(res ? true : false);
  };

  useEffect(() => {
    getAllCommentsByPost();
    getAlllikesByPost();
  }, []);

  useEffect(() => {
    hasUserLikedPost();
  }, [likes, contextUser]);

  const like = async () => {
    try {
      setHasClickedLike(false);
      await useCreateLike(contextUser?.user?.id || "", post.id);
      await getAlllikesByPost();
      hasUserLikedPost();
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setHasClickedLike(false);
    }
  };

  const unlike = async (id: string) => {
    try {
      setHasClickedLike(false);
      await useDeleteLike(id);
      await getAlllikesByPost();
      hasUserLikedPost();
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setHasClickedLike(false);
    }
  };

  const likeOrUnlike = () => {
    if (!contextUser?.user) return setIsLoginOpen(true);

    let res = useIsLiked(contextUser.user.id, post.id, likes);
    if (!res) {
      like();
    } else {
      likes.forEach((like) => {
        if (
          contextUser.user?.id &&
          contextUser.user.id == like.user_id &&
          like.post_id == post.id
        ) {
          unlike(like.id);
        }
      });
    }
  };

  return (
    <>
      <div id={`postLike-${post.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 ml-1">
          <div className="pb-4 text-center">
            <button disabled={hasClickedLike} onClick={likeOrUnlike}>
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                {!hasClickedLike ? (
                  <AiFillHeart
                    color={likes.length > 0 && userLiked ? "#ff2626" : ""}
                  />
                ) : (
                  <BiLoaderCircle size={25} className="animate-spin" />
                )}
              </div>
              <span className="text-xs text-gray-800 font-semibold">
                {likes.length}
              </span>
            </button>
          </div>

          <button
            className="pb-4 text-current"
            onClick={() =>
              router.push(`/post/${post.id}/${post.profile.user_id}`)
            }
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaCommentDots size={25} />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
              {comments.length}
            </span>
          </button>

          {/* <button
            className="text-current"
            // onClick={() =>
            //   router.push(`/post/${post.id}/${post.profile.user_id}`)
            // }
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaShare size={25} />
            </div>
            <span className="text-xs text-gray-800 font-semibold">55</span>
          </button> */}
        </div>
      </div>
    </>
  );
}
