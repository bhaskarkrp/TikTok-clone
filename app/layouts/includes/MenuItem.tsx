"use client";

import { IconString } from "@/app/constants";
// import { IconString } from "@/app/constants";
import { MenuItemProps } from "@/app/types";
import { AiOutlineHome } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";

export default function MenuItem({
  iconString,
  sizeString,
  colorString,
}: MenuItemProps) {
  const icons = () => {
    if (iconString === IconString.forYou)
      return <AiOutlineHome size={sizeString} color={colorString} />;
    if (iconString === IconString.following)
      return <RiGroupLine size={sizeString} color={colorString} />;
    if (iconString === IconString.live)
      return <BsCameraVideo size={sizeString} color={colorString} />;
  };
  return (
    <>
      <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
        <div className="flex items-center lg:mx-0 mx-auto">
          {icons()}
          <p
            className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}
          >
            {iconString}
          </p>
        </div>
      </div>
    </>
  );
}
