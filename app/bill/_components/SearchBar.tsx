"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState(params.get("keyword") || "");
  const [range, setRange] = useState(params.get("range") || "");

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (keyword) query.set("keyword", keyword);
    if (range) query.set("range", range);
    router.push(`?${query.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow flex flex-col sm:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="搜索商户名"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 border px-3 py-2 rounded-md"
      />
      <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        <option value="">全部时间</option>
        <option value="day">近一天</option>
        <option value="week">近一周</option>
        <option value="month">近一个月</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        搜索
      </button>
    </div>
  );
}
