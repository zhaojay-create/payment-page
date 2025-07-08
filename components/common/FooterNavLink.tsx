import Link from "next/link";
import React, { FC } from "react";

const FooterNavLink: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center shadow">
      <Link href="/" className="text-blue-500 font-semibold">
        首页
      </Link>
      <Link href="/bill" className="text-gray-500">
        账单
      </Link>
      <Link href="/profile" className="text-gray-500">
        我的
      </Link>
    </div>
  );
};

export default FooterNavLink;
