"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShowErrorObject } from "../types";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";
import { useUser } from "../context/user";
import { SiNuke } from "react-icons/si";
import useCreatePost from "../hooks/useCreatePost";

export default function Upload() {
  const router = useRouter();

  const contextUser = useUser();

  const [fileDisplay, setFileDisplay] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<ShowErrorObject | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!contextUser?.user) router.push("/");
  }, [contextUser]);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  const clearVideo = () => {
    setFileDisplay("");
    setFile(null);
  };

  const discard = () => {
    clearVideo();
    setCaption("");
  };

  const validate = () => {
    setError(null);
    let isError = false;

    if (!file) {
      setError({ type: "File", message: "A video file is required" });
      isError = true;
    } else if (!caption) {
      setError({ type: "Caption", message: "A video caption is required" });
      isError = true;
    }

    return isError;
  };

  const createNewPost = async () => {
    const isError = validate();
    if (isError || !contextUser?.user?.id || !file) return;

    try {
      setIsUploading(true);
      await useCreatePost(file, contextUser.user.id, caption);
      router.push(`/profile/${contextUser.user.id}`);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 mx-4">
          <div>
            <h1 className="text-[23px] font-semibold">Upload video</h1>
            <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
          </div>

          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <BiSolidCloudUpload size={40} color="#b3b3b1" />
                <p className="mt-4 text-[17px]">Select video to upload</p>
                <p className="mt-1.5 text-gray-400 text-[13px]">
                  Or Drag and drop a file
                </p>
                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                <p className="mt-2 text-gray-400 text-[13px]">
                  Up to 30 minutes
                </p>
                <p className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</p>

                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
                >
                  Select a file
                </label>
                <input
                  id="fileInput"
                  onChange={onChangeFile}
                  type="file"
                  hidden
                  accept=".mp4"
                />
              </label>
            ) : (
              <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
                {isUploading && (
                  <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle
                        size={30}
                        className="animate-spin"
                        color="#F12856"
                      />
                      <div className="text-white font-bold">Uploading...</div>
                    </div>
                  </div>
                )}

                <img
                  src="/images/mobile-case.png"
                  alt=""
                  className="absolute z-20 pointer-events-none"
                />

                <img
                  src="/images/tiktok-logo-white.png"
                  alt=""
                  width={90}
                  className="absolute z-20 right-4 bottom-6"
                />
                <video
                  src={fileDisplay}
                  autoPlay
                  muted
                  loop
                  className="absolute rounded-xl object-cover z-10 w-full h-full p-[13px]"
                />

                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300 pl-4">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle size={16} className="min-w-[16px]" />
                    <p className="text-[11px] pl-3 truncate text-ellipsis">
                      {file ? file.name : ""}
                    </p>
                  </div>
                  <div
                    onClick={clearVideo}
                    className="text-[11px] ml-2 font-semibold"
                  >
                    Change
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 mb-6">
              <div className="flex bg-[#F8F8F8] py-4 px-6">
                <div>
                  <PiKnifeLight size={20} className="mr-4" />
                </div>
                <div>
                  <div className="text-semibold text-[15px] mb-1.5">
                    Divide videos and edit
                  </div>
                  <div className="text-semibold text-[13px] text-gray-400">
                    You can quickly divide videos into multiple parts, remove
                    reduntant parts and turn landscape into portrait videos
                  </div>
                </div>
                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                  <button className="text-white rounded-sm text-[15px] bg-[#F02C56] px-8 py-1.5">
                    Edit
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">Caption</div>
                  <div className="text-gray-400 text-[12px]">
                    {caption.length}/150
                  </div>
                </div>

                <input
                  type="text"
                  maxLength={150}
                  value={caption}
                  className="w-full border p-2.5 rounded-md focus:outline-none"
                  onChange={(event) => setCaption(event.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isUploading}
                  onClick={discard}
                  className="px-10 py-2.5 mt-8 border text-[16px] rounded-sm hover:bg-gray-100"
                >
                  Disard
                </button>

                <button
                  disabled={isUploading}
                  onClick={createNewPost}
                  className="px-10 py-2.5 mt-8 border text-[16px] text-white rounded-sm bg-[#F02C56]"
                >
                  {isUploading ? (
                    <BiLoaderCircle
                      className="animate-spin"
                      color="#FFFFFF"
                      size={25}
                    />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 text-red-600">{error.message}</div>
              )}
            </div>
          </div>
        </div>
      </UploadLayout>
    </>
  );
}
