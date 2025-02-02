import { DisneyPlusLogo } from "../assets/Assets";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { HiHome, HiMagnifyingGlass, HiPlayCircle, HiTv } from "react-icons/hi2";
import HeaderItems from "./HeaderItems";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const menu = [
    { name: "HOME", icon: HiHome, path: "/" },
    { name: "SEARCH", icon: HiMagnifyingGlass, path: "/SearchPages" },
    { name: "SERIES", icon: HiTv, path: "/Series" },
    { name: "MOVIES", icon: HiPlayCircle, path: "/Movies" },
    { name: "ORIGINALS", icon: HiPlus, path: "/Originals" },
  ];

  return (
    <header className="flex items-center justify-between gap-8 p-5">
      <div className="flex gap-8 items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src={DisneyPlusLogo}
            alt="Disney Plus Logo"
            className="w-[5rem] md:w-[7rem] object-cover"
          />
        </Link>

        {/* Desktop Navbar Menu */}
        <div className="hidden md:flex gap-8">
          {menu.map((item, index) => (
            <HeaderItems
              key={index}
              name={item.name}
              Icon={item.icon}
              path={item.path}
            />
          ))}
        </div>

        {/* Responsive Navbar Menu */}
        <div className="flex md:hidden gap-5">
          {menu.slice(0, 3).map((item, index) => (
            <HeaderItems
              key={index}
              name=""
              Icon={item.icon}
              path={item.path}
            />
          ))}

          <div
            className="relative md:hidden"
            onClick={() => setToggle(!toggle)}
          >
            <HeaderItems name="" Icon={HiDotsVertical} />

            {toggle && (
              <div className="absolute mt-3 bg-[#121212] p-3 border-[0.063rem] border-gray-700 px-5 py-4">
                {menu.slice(3).map((item, index) => (
                  <HeaderItems
                    key={index}
                    name={item.name}
                    Icon={item.icon}
                    path={item.path}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <img
        src="https://img1.hotstarext.com/image/upload/w_200,h_200,c_fill/feature/profile/12.png"
        alt="User Profile"
        className="w-[4rem] rounded-full cursor-pointer"
      />
    </header>
  );
};

export default Header;
