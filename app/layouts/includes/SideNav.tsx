import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItem";
import { IconString } from "@/app/constants";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "./MenuItemFollow";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import { useEffect } from "react";

export default function SideNav() {
  const pathName = usePathname();

  const { setRandomUsers, randomUsers } = useGeneralStore();

  useEffect(() => {
    setRandomUsers();
  }, []);

  return (
    <>
      <div
        id="sideNav"
        className={`
        fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
        ${pathName === "/" ? "lg:w-[310px]" : "lg:w-[220px]"}
        `}
      >
        <div className="lg:w-full w-[55px] mx-auto">
          <Link href="/">
            <MenuItem
              iconString={IconString.forYou}
              sizeString="25"
              colorString={pathName == "/" ? "#F02C56" : ""}
            />
          </Link>
          <MenuItem
            iconString={IconString.following}
            sizeString="25"
            colorString={pathName == "/" ? "#000000" : ""}
          />
          <MenuItem
            iconString={IconString.live}
            sizeString="25"
            colorString={pathName == "/" ? "#000000" : ""}
          />

          <div className="border-b lg:ml-2 mt-2"></div>

          <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
            Suggested accounts
          </h3>

          <div className="lg:hidden block pt-3" />

          <ClientOnly>
            <div className="cursor-pointer">
              {randomUsers.map((user, index) => (
                <MenuItemFollow key={index} user={user} />
              ))}
            </div>
          </ClientOnly>

          <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
            See all
          </button>

          {/* {contextUser?.user?.id && (
            <div>
              <div className="border-b lg:ml-2 mt-2"></div>

              <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                Following accounts
              </h3>

              <div className="lg:hidden block pt-3" />

              <ClientOnly>
                <div className="cursor-pointer">
                  {randomUsers.map((user, index) => (
                    <MenuItemFollow key={index} user={user} />
                  ))}
                </div>
              </ClientOnly>

              <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
                See more
              </button>
            </div>
          )} */}

          <div className="lg:block hidden text-[11px] text-gray-500 mt-4">
            <p className="pt-4 px-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="pt-4 px-2">
              Quia, voluptatibus accusamus quas et at quidem, veritatis rem
              laboriosam porro minima quaerat unde?
            </p>
            <p className="pt-4 px-2">
              Perspiciatis ex quam officia iste laudantium sint sapiente!
            </p>
            <p className="pt-4 px-2">2025 TikTok</p>
          </div>
        </div>
      </div>
    </>
  );
}
