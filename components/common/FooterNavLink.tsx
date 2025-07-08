import React, { FC } from "react";
import { NavLink } from "./NavLink";

const FooterNavLink: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center shadow">
      <NavLink href="/dashboard" className="text-gray-500">
        首页
      </NavLink>
      <NavLink href="/dashboard/bill" className="text-gray-500">
        账单
      </NavLink>
      <NavLink href="/dashboard/profile" className="text-gray-500">
        我的
      </NavLink>
    </div>
  );
};

export default FooterNavLink;
