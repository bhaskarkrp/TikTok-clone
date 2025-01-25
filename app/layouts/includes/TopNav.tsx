import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useSearchProfilesByName from "@/app/hooks/userSearchProfilesByName";
import { useGeneralStore } from "@/app/stores/general";
import { User } from "@/app/types";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

export default function TopNav() {
  const router = useRouter();
  const pathName = usePathname();

  const contextUser = useUser();

  const { setIsEditProfileOpen, setIsLoginOpen } = useGeneralStore();

  const [searchProfiles, setSearchProfiles] = useState<User[]>([]);
  const [showMenu, setshowMenu] = useState<boolean>(false);
  const [value, setvalue] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  useEffect(() => {
    setIsEditProfileOpen(false);
  }, []);

  const handleSearchChange = debounce(async (value: string) => {
    if (value.trim() === "") return setSearchProfiles([]);
    setIsSearching(true);
    try {
      const result = await useSearchProfilesByName(value);
      if (result) return setSearchProfiles(result);
      setSearchProfiles([]);
    } catch (error) {
      console.error(error);
      setSearchProfiles([]);
      alert(error);
    } finally {
      setIsSearching(false);
    }
  }, 500);

  const goTo = () => {
    if (!contextUser) return setIsLoginOpen(true);

    router.push("/upload");
  };

  return (
    <div
      id="TopNav"
      className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]"
    >
      <div
        className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
          pathName == "/" ? "max-w-[1150px]" : ""
        }`}
      >
        <Link href="/">
          <Image
            src="/images/tiktok-logo.png"
            alt="logo"
            width={110}
            height={110}
          />
        </Link>

        <div className="relative hidden md:flex items-center justify-end bg-[#f1f1f2] p-1 rounded-full max-w-[430px] w-full">
          <input
            type="text"
            placeholder="Search accounts"
            onChange={(event) => {
              setvalue(event.target.value);
              handleSearchChange(event.target.value);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
          />

          {searchProfiles.length > 0 ? (
            <div className="bg-white max-w-[910px] h-auto w-full z-20 border p-1 absolute left-0 top-14 ">
              {searchProfiles.map((profile, index) => (
                <div className="p-1" key={index}>
                  <Link
                    href={`/profile/${profile.id}`}
                    className="flex items-center justify-between cursor-pointer p-1 px-2 hover:text-white hover:bg-[#F12B56]"
                  >
                    <div className="flex items-center">
                      <img
                        src={useCreateBucketUrl(profile.image)}
                        alt="profile-avatar"
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <p className="truncate ml-2">{profile.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : isActive && value && isSearching ? (
            <div className="bg-white max-w-[910px] h-auto w-full z-20 border p-1 absolute left-0 top-14 ">
              <p>Searching accounts for you</p>
            </div>
          ) : isActive &&
            value &&
            !isSearching &&
            searchProfiles.length === 0 ? (
            <div className="bg-white max-w-[910px] h-auto w-full z-20 border p-1 absolute left-0 top-14 ">
              <p>No account found</p>
            </div>
          ) : null}

          <div className="border-l-gray-300 border-l px-3 py-1">
            <BiSearch color="#A1A2A7" size={22} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center border pl-1.5 py-[6px] rounded-sm hover:bg-gray-100"
            onClick={() => goTo()}
          >
            <AiOutlinePlus size={22} color="#000000" />
            <span className="px-2 font-medium text-[15px]">Upload</span>
          </button>

          {!contextUser?.user?.id ? (
            <div className="flex items-center">
              <button
                className="flex items-center text-white border rounded-md bg-[#F02C56] px-3 py-[6px]"
                onClick={() => setIsLoginOpen(true)}
              >
                <span className="font-medium text-[15px] mx-4 whitespace-nowrap">
                  Log in
                </span>
              </button>
              <BsThreeDotsVertical size={22} color="#161724" />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setshowMenu((showMenu) => !showMenu)}
                  className="mt-1 border border-gray-200 rounded-full"
                >
                  <img
                    className="rounded-full w-[35px] h-[35px] cursor-pointer"
                    src={useCreateBucketUrl(contextUser?.user?.image || "")}
                    alt="profile image"
                  />
                </button>
                {showMenu && (
                  <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
                    <button
                      onClick={() => {
                        router.push(`/profile/${contextUser.user?.id}`);
                        setshowMenu(false);
                      }}
                      className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <BiUser size={20} />
                      <span className="pl-2 font-semibold text-sm">
                        Profile
                      </span>
                    </button>

                    <button
                      className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                      onClick={async () => {
                        await contextUser.logout();
                        setshowMenu(false);
                      }}
                    >
                      <FiLogOut size={20} />
                      <span className="pl-2 font-semibold text-sm">
                        Log Out
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
