"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login-or-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
        credentials: "include", // 包含 cookie 这样，浏览器会正确接收并存储后端返回的 cookie，包括 Set-Cookie: token=xxx
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "登录失败");

      router.push("/"); // 登录成功后跳转首页或 dashboard
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      console.error("Error fetching coupons:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">手机登录</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">手机号</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入手机号"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white rounded py-2 text-sm font-medium hover:bg-blue-600 transition"
          >
            {loading ? "登录中..." : "登录 / 注册"}
          </button>
        </form>
      </div>
    </div>
  );
}
