"use client";

import { use, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import ClientOnly from "../../components/ClientOnly";
import MainLayout from "../../layouts/MainLayout";
import { ProfileProps } from "../../types";
import PostUser from "@/app/components/profile/Postuser";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";
import { useUser } from "@/app/context/user";
import { usePostStore } from "@/app/stores/post";
import { useProfileStore } from "@/app/stores/profile";
import { useGeneralStore } from "@/app/stores/general";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";

export default function Profile({ params }: ProfileProps) {
  const { id } = use(params);
  const contextUser = useUser();
  const { postsByUser, setPostsByUser } = usePostStore();
  const { currentProfile, setCurrentProfile } = useProfileStore();
  const { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore();

  useEffect(() => {
    setPostsByUser(id);
    setCurrentProfile(id);
  }, []);

  return (
    <>
      {isEditProfileOpen && <EditProfileOverlay />}
      <MainLayout>
        <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
          <div className="flex w-[calc(100vw-230px)]">
            <ClientOnly>
              {true ? (
                <img
                  className="w-[120px] min-w-[120px] rounded-full"
                  src={useCreateBucketUrl(currentProfile?.image || "")}
                  alt="profile"
                />
              ) : (
                <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
              )}
            </ClientOnly>

            <div className="w-full ml-5">
              <ClientOnly>
                {currentProfile?.name ? (
                  <div>
                    <p className="text-[30px] font-bold truncate">
                      {currentProfile.name}
                    </p>
                    <p className="text-[18px] truncate">
                      {currentProfile.name}
                    </p>
                  </div>
                ) : (
                  <div className="h-[60px]" />
                )}
              </ClientOnly>

              {contextUser?.user?.id == id ? (
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="flex items-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                >
                  <BsPencil size={18} className="mt-0.5 mr-1" />
                  <span>Edit profile</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    alert("Feature in progress...");
                  }}
                  className="flex items-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]"
                >
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center pt-4">
            <div className="mr-4">
              <span className="font-bold">{`${Math.floor(
                Math.random() * 10
              )}K`}</span>
              <span className="font-light text-gray-500 text-[15px] pl-1.5">
                Following
              </span>
            </div>

            <div className="mr-4">
              <span className="font-bold">{`${Math.floor(
                Math.random() * Math.random() * 10
              )}K`}</span>
              <span className="font-light text-gray-500 text-[15px] pl-1.5">
                Followers
              </span>
            </div>
          </div>

          <ClientOnly>
            <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
              {currentProfile?.bio}
            </p>
          </ClientOnly>

          <ul className="w-full flex items-center pt-4 border-b">
            <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">
              Videos
            </li>
            {/* <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">
              Likes
            </li> */}
          </ul>

          <ClientOnly>
            <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
              {postsByUser.map((post, index) => (
                <PostUser key={index} post={post} />
              ))}
            </div>
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
