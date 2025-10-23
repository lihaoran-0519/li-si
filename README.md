# Li-Si 婚礼项目

一个现代化的婚礼管理网站，为Li-Si婚礼提供完整的数字化解决方案。

## ✨ 功能特性

- 🏠 **主页**: 欢迎展示、婚纱照轮播、倒计时功能
- 📅 **婚礼信息**: 时间安排、地点信息、联系方式
- 📸 **幸福时刻**: 照片分类展示、照片浏览
- 🙏 **感谢致辞**: 感谢致辞、祝福留言、留言展示

## 🛠️ 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **动画**: Framer Motion
- **轮播**: Swiper.js
- **表单**: React Hook Form + Zod
- **图片**: Next.js Image + Cloudinary
- **部署**: Vercel

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd li-si-wedding
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 📁 项目结构

```
li-si-wedding/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 主页
│   │   ├── info/              # 婚礼信息页面
│   │   ├── moments/           # 幸福时刻页面
│   │   ├── thanks/            # 感谢致辞页面
│   │   └── api/               # API路由
│   ├── components/            # 组件库
│   │   ├── ui/               # 基础UI组件
│   │   ├── layout/           # 布局组件
│   │   └── sections/         # 页面组件
│   ├── lib/                  # 工具函数
│   └── types/                # TypeScript类型
├── prisma/                   # 数据库相关
└── public/                   # 静态资源
```

## 🎨 设计特色

- **温馨浪漫**: 玫瑰金主题色系，营造温馨氛围
- **响应式设计**: 完美适配各种设备尺寸
- **流畅动画**: 使用Framer Motion实现优雅的页面过渡
- **现代UI**: 简洁优雅的界面设计

## 📱 页面功能

### 主页
- 动态欢迎区域，显示新人姓名和婚礼信息
- 实时倒计时，精确到秒
- 精选婚纱照轮播展示
- 快速导航到各个功能模块

### 婚礼信息
- 详细的婚礼流程时间表
- 场地信息和交通指引
- 联系方式查询

### 幸福时刻
- 照片分类浏览（婚纱照、恋爱时光等）
- 瀑布流布局展示
- 照片详情查看

### 感谢致辞
- 新人感谢致辞展示
- 宾客祝福留言功能
- 留言列表展示

## 🛠️ 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 代码检查

## 🚀 部署

项目已配置为使用Vercel进行部署：

1. 将代码推送到GitHub仓库
2. 在Vercel平台连接GitHub仓库
3. 配置环境变量
4. 自动部署完成

## 📄 许可证

MIT License

---

*Made with ❤️ for Li & Si's special day*
