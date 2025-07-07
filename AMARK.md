🟦 Web 前端：

- Next.js（SSR + 动态路由 + API routes）
- Tailwind CSS（组件化）
- 状态管理（React Context / Zustand）

🟩 移动端：

- React Native + Expo（跨平台开发）
- RN Router + 权限管理 + 动画 + 多语言适配

🟨 后端：

- Go + Fiber/Gin 或 Node.js + Express
- Prisma ORM（PostgreSQL 优先）
- Auth（JWT、OAuth、Session）

🟪 DevOps：

- GitHub Actions + Vercel + Railway
- Docker / Supabase 了解

🟫 通用能力：

- 项目部署 + 登录注册 + 文件上传
- 全栈项目管理（组件拆分、逻辑抽离）

商圈返利方案。大致的流程，用户在商家 A 消费后，会获得通用消费券（此次消费的 5%返利），用户也可以在商家 B 消费，商家 A 和商家 B 都属于同一个商圈，在商家 B 消费后，会继续获取（此次消费的 5%返利），让用户在商圈内流转。
B 端（商家/运营）使用，nextjs 开发，商家可以通过图表查看近期的收益状况，
C 端（商家/用户）使用，react native 开发，用户可以参与活动领取消费券，用户可以查看自己消费了多少钱，使用了多少消费券，并且内置记账系统。

1. “Can you explain the difference between useEffect and useLayoutEffect in React?”
   ”useEffect runs after the component has rendered and the browser has painted the screen. It’s good for side effects like fetching data or setting up subscriptions.”
   ”useLayoutEffect runs right after rendering but before the browser paints. It’s used when you need to measure DOM elements or apply layout changes to avoid flickering.”
   In short, useEffect is asynchronous and non-blocking, while useLayoutEffect is synchronous and blocks the painting. You should only use useLayoutEffect when you really need to manipulate the layout before the screen updates.”
