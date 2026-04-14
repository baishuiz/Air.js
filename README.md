# Air.js - JavaScript 模块加载器

[![GitHub](https://img.shields.io/github/license/baishuiz/Air.js)](https://github.com/baishuiz/Air.js)
[![Version](https://img.shields.io/badge/version-0.1.11-blue)](https://github.com/baishuiz/Air.js)

Air.js 是一个轻量级的 **JavaScript 模块化加载框架**，提供模块定义、依赖解析、动态加载和事件驱动的模块系统。

## 📋 目录

- [适用场景](#适用场景)
- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [基本使用](#基本使用)
- [项目结构](#项目结构)
- [API 文档](#api-文档)
- [构建和测试](#构建和测试)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 💡 适用场景

Air.js 特别适合以下场景：

### 1. **遗留系统现代化**
- 为不支持 ES6 Modules 的老旧浏览器环境提供模块化能力
- 逐步迁移传统项目，无需大规模重构

### 2. **轻量级应用开发**
- 小型网站、工具库或单页应用
- 教育项目或学习 JavaScript 模块化概念的示例

### 3. **特定需求场景**
- 需要运行时动态加载模块的应用
- 对模块加载事件有特殊监控需求的系统
- 希望保持代码库简洁、不引入复杂构建链的项目

## 🎯 功能特性

- **命名空间模块** — 支持结构化的模块命名空间定义
- **依赖管理** — 自动解析和加载模块依赖关系
- **异步加载** — 支持动态 JavaScript 文件加载，具有回调机制
- **事件驱动** — 基于 Beacon 事件系统的状态管理和通信
- **DOM 事件** — 提供 DOM 就绪事件处理机制
- **简洁 API** — 易于学习和集成的开放接口

## 🚀 快速开始

### 安装

#### 方式 1：直接引入文件

```html
<!-- 生产环境（压缩版） -->
<script src="path/to/Air.0.1.11.mini.js"></script>

<!-- 开发环境（完整版） -->
<script src="path/to/Air.0.1.11.js"></script>
```

#### 方式 2：npm 安装（如果发布到 npm）

```bash
npm install air-loader
```

然后在项目中使用：

```javascript
// 如果支持模块系统
import Air from 'air-loader';
```

### 前置条件

- 现代浏览器（支持 JavaScript）
- DOM 环境（浏览器或类浏览器环境）

## 📖 基本使用

### 1. 定义模块

使用 `Air.Module` 定义一个新模块：

```javascript
Air.Module('myApp.utils', function (require, NS) {
    function add(a, b) {
        return a + b;
    }
    
    return {
        add: add
    };
});
```

### 2. 定义带依赖的模块

```javascript
Air.Module('myApp.math', ['myApp.utils'], function (require, NS) {
    var utils = require('myApp.utils');
    
    function multiply(a, b) {
        return a * b;
    }
    
    return {
        multiply: multiply,
        add: function(a, b) {
            return utils.add(a, b);
        }
    };
});
```

### 3. 动态加载 JavaScript 文件

```javascript
Air.loadJS('path/to/module.js', function(success) {
    if (success) {
        console.log('Module loaded successfully');
    } else {
        console.log('Failed to load module');
    }
});
```

### 4. 在模块加载完成后执行代码

```javascript
Air.run(function() {
    // 所有定义的模块都已加载完成
    console.log('All modules loaded');
});
```

### 5. 创建命名空间

```javascript
var myAppNamespace = Air.NS('myApp');
```

### 6. DOM 就绪

```javascript
Air.domReady(function() {
    // DOM 完全加载和解析后执行
    console.log('DOM is ready');
});
```

## 🏗️ 项目结构

```
Air.js/
├── src/                          # 源代码
│   ├── Air.js                   # 核心框架入口
│   ├── init.js                  # 公共 API 初始化
│   ├── module/                  # 模块系统核心
│   │   ├── module.js            # 模块构造器和解析
│   │   ├── require.js           # Require 机制实现
│   │   ├── run.js               # 模块加载运行器
│   │   ├── load.js              # 动态 JS 文件加载
│   │   └── DOMReady.js          # DOM 就绪事件处理
│   ├── utile/                   # 工具函数库
│   │   └── base.js              # 基础工具（NS、merge、URL 等）
│   └── libs/                    # 外部库
│       └── beacon.0.3.10.mini.js # 事件系统库
├── dist/                         # 构建输出目录
│   ├── Air.0.1.11.js            # 完整版本
│   └── Air.0.1.11.mini.js       # 压缩版本
├── test/                         # 测试文件
│   ├── spec/                    # 测试规格文件
│   │   └── Public.API.Spec.js   # 公共 API 单元测试
│   ├── testModule*.js           # 测试模块示例
│   └── _SpecRunner2.html        # 测试运行器 HTML
├── docs/                         # 文档
│   ├── API.md                   # API 详细文档
│   └── CHANGELOG.md             # 版本历史
├── package.json                  # 项目配置文件
├── Gruntfile.js                 # Grunt 构建脚本
└── README.md                     # 本文件
```

## 📚 API 文档

### 公共 API

| API | 描述 | 参数 | 返回值 |
|-----|------|------|---------|
| `Air.run(fn)` | 模块加载完成后执行回调 | `fn: Function` | `undefined` |
| `Air.Module(name, dependencies, factory)` | 定义一个模块 | `name, deps[], factory` | `undefined` |
| `Air.loadJS(url, callback)` | 动态加载 JavaScript 文件 | `url, callback(success)` | `undefined` |
| `Air.NS(namespace)` | 创建或获取命名空间 | `namespace: String` | `Object` |
| `Air.Enum(obj)` | 创建枚举对象 | `obj: Object` | `Object` |
| `Air.domReady(fn)` | DOM 就绪时执行回调 | `fn: Function` | `undefined` |
| `Air.moduleURL(url)` | 设置模块加载基础 URL | `url: String` | `undefined` |
| `Air.setCDNTimestamp(timestamp)` | 设置 CDN 时间戳 | `timestamp: String` | `undefined` |

> 详见 [API.md](docs/API.md) 获取完整的 API 文档和示例。

## 🔨 构建和测试

### 前置条件

```bash
npm install
```

### 构建项目

```bash
# 运行默认任务（concat + uglify + jasmine）
npm test

# 仅构建，不运行测试
npm run build

# 构建并运行测试（带覆盖率报告）
npm run debug
```

### 测试

```bash
# 运行所有单元测试
npm test

# 查看测试覆盖率报告
# 打开 bin/coverage/index.html
```

### 构建输出

- **完整版本** — `dist/Air.0.1.11.js`
- **压缩版本** — `dist/Air.0.1.11.mini.js`
- **测试报告** — `bin/coverage/` （运行测试后生成）

## 💡 最佳实践

### 1. 模块命名约定

使用点号分隔符创建分层的命名空间：

```javascript
// ✅ 好的做法
Air.Module('app.ui.dialog', [...], function() { });
Air.Module('app.data.api', [...], function() { });

// ❌ 避免
Air.Module('dialog', [...], function() { });
Air.Module('api', [...], function() { });
```

### 2. 依赖管理

明确列出所有依赖，避免循环依赖：

```javascript
// ✅ 清晰的依赖列表
Air.Module('app.chart', 
    ['app.data.loader', 'app.ui.canvas'], 
    function(require) {
        var loader = require('app.data.loader');
        var canvas = require('app.ui.canvas');
        // ...
    }
);
```

### 3. 模块初始化

在 `Air.run()` 中执行应用初始化逻辑：

```javascript
Air.run(function() {
    // 所有模块已加载
    var app = require('app.main');
    app.init();
});
```

### 4. 错误处理

始终为异步操作提供错误回调：

```javascript
Air.loadJS('path/to/module.js', function(success) {
    if (!success) {
        console.error('Failed to load module');
        // 处理错误
    }
});
```

## ❓ 常见问题

### Q1: 如何在多个文件中使用同一个模块？

**A:** 只需在主 HTML 文件中引入 Air.js，然后在每个模块中使用 `require()` 获取依赖：

```html
<script src="Air.0.1.11.js"></script>
<script src="modules/utils.js"></script>
<script src="modules/main.js"></script>
```

### Q2: 是否支持条件加载？

**A:** 支持。使用 `Air.loadJS()` 在运行时动态加载模块：

```javascript
if (needsFeature) {
    Air.loadJS('path/to/feature.js', function(success) {
        if (success) {
            // 使用 feature
        }
    });
}
```

### Q3: 如何调试模块加载问题？

**A:** 
1. 检查浏览器控制台是否有错误信息
2. 查看网络标签页，确认所有脚本文件已加载
3. 使用 `Air.base.isDebug = true` 启用调试模式（如果支持）
4. 验证模块名称拼写和依赖声明

### Q4: Air.js 可以与现代模块系统（ES6、CommonJS）混用吗？

**A:** Air.js 的特点是自成一体的模块系统。如果要使用现代模块系统，建议考虑迁移到 Webpack、Rollup 或 Vite 等构建工具，但 Air.js 仍可在特定场景下使用。

## 🤝 贡献指南

欢迎贡献代码、报告问题和提交建议！

### 报告问题

在 [GitHub Issues](https://github.com/baishuiz/Air.js/issues) 中提交问题报告，请包含：
- 问题描述
- 重现步骤
- 预期行为 vs 实际行为
- 浏览器和 Air.js 版本

### 提交代码

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add your feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 提交 Pull Request

### 编码规范

- 使用 4 个空格缩进
- 添加 JSDoc 注释说明函数功能
- 为新功能添加单元测试
- 确保所有测试通过：`npm test`

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**更新时间** — 2026-04-13  
**维护者** — [@baishuiz](https://github.com/baishuiz)

有问题？欢迎在 [GitHub Issues](https://github.com/baishuiz/Air.js/issues) 中提问！
