"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"merchant" | "operator">("merchant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // 这里可以添加登录逻辑
    setTimeout(() => {
      setLoading(false);
      // 登录失败示例
      // setError("手机号或密码错误");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col justify-center items-center px-4">
      <Card className="w-full max-w-sm rounded-2xl shadow-md border-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900 mb-2">
            登录
          </CardTitle>
          <div className="text-center text-xs text-gray-400">
            欢迎使用商家/运营后台
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="phone" className="block mb-1 text-gray-700">
                手机号
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl bg-[#f7f8fa] border border-gray-200 focus:ring-2 focus:ring-blue-400 transition text-base"
                autoComplete="tel"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="block mb-1 text-gray-700">
                密码
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl bg-[#f7f8fa] border border-gray-200 focus:ring-2 focus:ring-blue-400 transition text-base"
                autoComplete="current-password"
                required
              />
            </div>
            <div>
              <Label className="block mb-1 text-gray-700">身份</Label>
              <RadioGroup
                defaultValue="merchant"
                value={role}
                onValueChange={(v) => setRole(v as "merchant" | "operator")}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="merchant" id="merchant" />
                  <Label htmlFor="merchant" className="text-gray-700 text-sm">
                    商家
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="operator" id="operator" />
                  <Label htmlFor="operator" className="text-gray-700 text-sm">
                    运营
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {error && (
              <div className="text-red-500 text-xs text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-base font-semibold py-3"
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
