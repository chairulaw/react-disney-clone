import React from "react";
import { Link } from "react-router-dom";

const HeaderItems = ({ name, Icon, path }) => {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 font-semibold cursor-pointer hover:underline underline-offset-8 text-[1.1rem] mb-1 text-gray-500 hover:text-white duration-300 ease-in-out">
      <Icon />
      <h2>{name}</h2>
    </Link>
  );
};

export default HeaderItems;
