# Air.js API 文档

完整的 Air.js 应用程序接口（API）文档，包含详细的参数说明、返回值、示例代码和最佳实践。

## 目录

- [核心 API](#核心-api)
- [模块系统](#模块系统)
- [事件处理](#事件处理)
- [工具函数](#工具函数)
- [高级用法](#高级用法)
- [示例应用](#示例应用)

---

## 核心 API

### Air.run(callback)

执行一个回调函数，确保所有已定义的模块都已加载完成。

**签名**
```javascript
Air.run(callback: Function) → void
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `callback` | `Function` | 所有模块加载完成后执行的回调函数，无参数 |

**返回值**
无

**示例**

```javascript
// 基础用法
Air.run(function() {
    console.log('All modules loaded');
});

// 获取已加载的模块
Air.run(function() {
    var module1 = require('app.module1');
    var module2 = require('app.module2');
    
    // 初始化应用
    module1.initialize();
});

// 多次调用 Air.run()
Air.run(function() {
    console.log('First callback');
});

Air.run(function() {
    console.log('Second callback');
    // 两个回调都会按顺序执行
});
```

**注意事项**
- 如果在调用 `Air.run()` 时所有模块已加载，则回调会立即执行
- 可以多次调用 `Air.run()`，所有回调都会按顺序执行
- 请勿在回调中进行长时间同步操作，以避免阻塞 UI

---

## 模块系统

### Air.Module(name, [dependencies], factory)

定义一个新模块，支持依赖声明和工厂函数。

**签名**
```javascript
Air.Module(name: String, [dependencies: String[]], factory: Function) → void
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `name` | `String` | 模块的唯一标识符，使用点号分隔符表示命名空间（如 `app.utils.math`） |
| `dependencies` | `String[]` | *可选* 模块依赖的其他模块名称数组。如果省略或为空，则 `factory` 作为第二个参数 |
| `factory` | `Function` | 模块工厂函数，返回模块的公开接口。签名：`function(require, NS)` |

**工厂函数参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `require` | `Function` | 加载依赖模块的函数。调用方式：`require('module.name')` 返回模块导出对象 |
| `NS` | `Function` | 命名空间创建函数，用于创建或访问嵌套对象结构 |

**返回值**
无

**示例**

```javascript
// 1. 简单模块（无依赖）
Air.Module('app.logger', function(require, NS) {
    function log(message) {
        console.log('[LOG] ' + message);
    }
    
    function error(message) {
        console.error('[ERROR] ' + message);
    }
    
    return {
        log: log,
        error: error
    };
});

// 2. 带依赖的模块
Air.Module('app.data.api', 
    ['app.logger'], 
    function(require, NS) {
        var logger = require('app.logger');
        
        function fetchData(url) {
            logger.log('Fetching data from ' + url);
            // 请求逻辑
        }
        
        return {
            fetchData: fetchData
        };
    }
);

// 3. 多个依赖
Air.Module('app.main', 
    ['app.logger', 'app.data.api', 'app.ui.panel'], 
    function(require, NS) {
        var logger = require('app.logger');
        var api = require('app.data.api');
        var panel = require('app.ui.panel');
        
        function init() {
            logger.log('Initializing app');
            api.fetchData('/api/data');
        }
        
        return {
            init: init
        };
    }
);

// 4. 从模块中 require 多个依赖
Air.Module('app.services', 
    ['app.logger', 'app.utils'], 
    function(require, NS) {
        var logger = require('app.logger');
        var utils = require('app.utils');
        
        return {
            startService: function() {
                logger.log('Service started');
            }
        };
    }
);

// 5. 使用返回对象
Air.run(function() {
    var logger = require('app.logger');
    logger.log('App ready');
});
```

**最佳实践**
- 使用有意义的命名空间层级：`company.product.feature.module`
- 避免循环依赖（A 依赖 B，B 反过来依赖 A）
- 让工厂函数返回明确定义的公开接口对象
- 将私有函数声明在工厂函数内部，不返回到公开接口中

**常见错误**
```javascript
// ❌ 错误：依赖数组省略，factory 作为第二个参数但被误认为依赖
Air.Module('app.utils', function(require, NS) { });
// 正确做法：
Air.Module('app.utils', function(require, NS) { });

// ❌ 错误：循环依赖
Air.Module('a', ['b'], function(require, NS) { return {}; });
Air.Module('b', ['a'], function(require, NS) { return {}; });
// 会导致加载失败

// ✅ 正确：明确的依赖层级
Air.Module('base.util', function(require, NS) { return {}; });
Air.Module('base.model', ['base.util'], function(require, NS) { return {}; });
Air.Module('app.controller', ['base.model'], function(require, NS) { return {}; });
```

### require(moduleName)

在模块工厂函数内部使用，获取依赖模块的导出对象。

**签名**
```javascript
require(moduleName: String) → Object
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `moduleName` | `String` | 已声明的模块名称 |

**返回值**
`Object` — 模块导出的对象

**示例**

```javascript
Air.Module('app.math', function(require, NS) {
    return {
        add: function(a, b) { return a + b; }
    };
});

Air.Module('app.calculator', ['app.math'], function(require, NS) {
    var math = require('app.math');
    
    return {
        compute: function(a, b) {
            return math.add(a, b);
        }
    };
});
```

**注意事项**
- 只能在模块工厂函数内部调用 `require()`
- 所有依赖必须在模块的依赖数组中声明
- `require()` 执行时依赖模块必须已加载

---

## 事件处理

### Air.loadJS(url, callback)

动态加载一个 JavaScript 文件。

**签名**
```javascript
Air.loadJS(url: String, callback: Function) → void
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `url` | `String` | 要加载的 JavaScript 文件的 URL，支持相对路径和绝对 URL |
| `callback` | `Function` | 加载完成（成功或失败）后的回调函数。签名：`function(success: Boolean)` |

**回调参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `success` | `Boolean` | `true` 表示文件加载成功，`false` 表示加载失败 |

**返回值**
无

**示例**

```javascript
// 1. 基础加载
Air.loadJS('modules/feature.js', function(success) {
    if (success) {
        console.log('Feature module loaded');
    } else {
        console.log('Failed to load feature module');
    }
});

// 2. 条件加载
var isProduction = true;

if (isProduction) {
    Air.loadJS('modules/analytics.prod.js', function(success) {
        if (success) {
            console.log('Analytics loaded');
        }
    });
} else {
    console.log('Debug mode: skipping analytics');
}

// 3. 链式加载（一个文件加载完成后加载另一个）
Air.loadJS('modules/base.js', function(success) {
    if (success) {
        Air.loadJS('modules/extended.js', function(success2) {
            if (success2) {
                console.log('All modules loaded');
            }
        });
    }
});

// 4. 平行加载多个文件
var modulesToLoad = ['module1.js', 'module2.js', 'module3.js'];
var loadedCount = 0;

modulesToLoad.forEach(function(module) {
    Air.loadJS('modules/' + module, function(success) {
        if (success) loadedCount++;
        if (loadedCount === modulesToLoad.length) {
            console.log('All modules loaded');
        }
    });
});
```

**错误处理**
```javascript
Air.loadJS('non-existent.js', function(success) {
    if (!success) {
        console.error('Failed to load script');
        // 提供降级方案或用户提示
    }
});
```

**注意事项**
- 回调会立即调用，不会等待模块初始化
- 加载失败通常是由于网络错误或 URL 不正确
- 支持跨域加载（需要服务器允许）

### Air.domReady(callback)

当 DOM 完全加载和解析后执行回调函数。

**签名**
```javascript
Air.domReady(callback: Function) → void
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `callback` | `Function` | DOM 就绪后执行的回调函数，无参数 |

**返回值**
无

**示例**

```javascript
// 1. 基础用法
Air.domReady(function() {
    console.log('DOM is ready!');
    var element = document.getElementById('myElement');
    element.style.color = 'red';
});

// 2. 初始化 UI
Air.domReady(function() {
    var container = document.querySelector('.app-container');
    if (container) {
        container.innerHTML = '<p>App initialized</p>';
    }
});

// 3. 结合 Air.run()
Air.Module('app.ui', function(require, NS) {
    return {
        renderApp: function() {
            console.log('Rendering app');
        }
    };
});

Air.domReady(function() {
    Air.run(function() {
        var ui = require('app.ui');
        ui.renderApp();
    });
});

// 4. 多个 domReady 回调
Air.domReady(function() {
    console.log('First DOM ready callback');
});

Air.domReady(function() {
    console.log('Second DOM ready callback');
    // 所有 domReady 回调按顺序执行
});
```

**注意事项**
- 类似于 jQuery 的 `$(document).ready()` 或原生 `DOMContentLoaded`
- 在 `<body>` 标签末尾放置脚本时不需要此函数
- 可以多次调用，所有回调都会按顺序执行
- 在 DOM 已加载的情况下调用时，会立即执行

---

## 工具函数

### Air.NS(namespace)

创建或获取命名空间，返回嵌套对象结构。

**签名**
```javascript
Air.NS(namespace: String) → Object
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `namespace` | `String` | 点号分隔的命名空间路径（如 `app.ui.dialog`） |

**返回值**
`Object` — 命名空间对象，如果不存在则创建

**示例**

```javascript
// 1. 创建简单命名空间
var app = Air.NS('app');
app.version = '1.0.0';
console.log(window.app.version); // '1.0.0'

// 2. 创建嵌套命名空间
var appUI = Air.NS('app.ui');
appUI.config = { theme: 'dark' };

var appUIDialog = Air.NS('app.ui.dialog');
appUIDialog.open = function() { };
appUIDialog.close = function() { };

// 3. 访问已存在的命名空间
var existing = Air.NS('app.ui');
console.log(existing.config); // { theme: 'dark' }

// 4. 组织模块相关的数据
var apiNS = Air.NS('app.api');
apiNS.endpoints = {
    users: '/api/users',
    posts: '/api/posts'
};

apiNS.request = function(endpoint) {
    console.log('Requesting', apiNS.endpoints[endpoint]);
};
```

**实际应用场景**
```javascript
// 模块中使用 NS 来组织配置
Air.Module('app.config', function(require, NS) {
    var config = NS('app.conf');
    config.API_BASE = 'https://api.example.com';
    config.TIMEOUT = 5000;
    
    return config;
});

Air.Module('app.http', ['app.config'], function(require, NS) {
    var config = require('app.config');
    
    return {
        fetch: function(path) {
            console.log('Fetching from', config.API_BASE + path);
        }
    };
});
```

### Air.Enum(object)

创建枚举对象，用于定义常量集合。

**签名**
```javascript
Air.Enum(object: Object) → Object
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `object` | `Object` | 包含枚举项的对象 |

**返回值**
`Object` — 冻结的枚举对象（防止修改）

**示例**

```javascript
// 1. 定义状态枚举
var Status = Air.Enum({
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error'
});

function handleResponse(status) {
    switch(status) {
        case Status.PENDING:
            console.log('Loading...');
            break;
        case Status.SUCCESS:
            console.log('Done!');
            break;
        case Status.ERROR:
            console.log('Failed!');
            break;
    }
}

// 2. 定义用户角色枚举
var UserRole = Air.Enum({
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
});

// 3. 定义 HTTP 方法枚举
var HTTPMethod = Air.Enum({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
});

// 模块中使用枚举
Air.Module('app.api.request', function(require, NS) {
    var Method = Air.Enum({
        GET: 'GET',
        POST: 'POST'
    });
    
    return {
        send: function(method, url) {
            console.log('Sending', method, 'to', url);
        }
    };
});

// ❌ 尝试修改枚举会失败（取决于浏览器的冻结实现）
// Status.PENDING = 'modified'; // 无效
```

### Air.moduleURL(baseURL)

设置模块加载的基础 URL，影响相对路径的解析。

**签名**
```javascript
Air.moduleURL(baseURL: String) → void
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `baseURL` | `String` | 基础 URL 路径，应以 `/` 结尾 |

**返回值**
无

**示例**

```javascript
// 1. 设置模块基础目录
Air.moduleURL('/js/modules/');

// 当后续加载模块时，相对路径会基于此 URL 解析
Air.loadJS('ui/dialog.js', function(success) {
    // 实际加载的是 /js/modules/ui/dialog.js
});

// 2. 数据驱动的模块加载
Air.moduleURL('/app/components/');

var components = ['header', 'footer', 'sidebar'];
components.forEach(function(component) {
    Air.loadJS(component + '.js', function(success) {
        console.log(component + ' loaded');
    });
});
```

### Air.setCDNTimestamp(timestamp)

设置 CDN 时间戳，用于缓存破除和版本控制。

**签名**
```javascript
Air.setCDNTimestamp(timestamp: String) → void
```

**参数**
| 参数 | 类型 | 描述 |
|------|------|------|
| `timestamp` | `String` | 时间戳字符串，通常用于附加到 URL 以破除缓存 |

**返回值**
无

**示例**

```javascript
// 1. 设置时间戳以破除浏览器缓存
var buildTimestamp = '20260413001';
Air.setCDNTimestamp(buildTimestamp);

// 加载脚本时会附加时间戳参数
Air.loadJS('modules/app.js', function(success) {
    // 实际加载的 URL 可能是：modules/app.js?t=20260413001
});

// 2. 使用 Git 提交 hash 作为时间戳
Air.setCDNTimestamp('abc123def456');

// 3. 每次部署时更新时间戳
if (window.DEPLOYMENT_VERSION) {
    Air.setCDNTimestamp(window.DEPLOYMENT_VERSION);
}
```

---

## 高级用法

### 项目初始化模式

```javascript
// 1. 定义基础模块
Air.Module('app.config', function(require, NS) {
    return {
        apiBase: 'https://api.example.com',
        timeout: 5000
    };
});

Air.Module('app.logger', function(require, NS) {
    return {
        info: function(msg) { console.info('[INFO]', msg); },
        error: function(msg) { console.error('[ERROR]', msg); }
    };
});

// 2. 定义业务模块
Air.Module('app.api', 
    ['app.config', 'app.logger'],
    function(require, NS) {
        var config = require('app.config');
        var logger = require('app.logger');
        
        return {
            get: function(path) {
                logger.info('GET ' + config.apiBase + path);
            }
        };
    }
);

// 3. 定义主应用模块
Air.Module('app.main',
    ['app.api', 'app.logger'],
    function(require, NS) {
        var api = require('app.api');
        var logger = require('app.logger');
        
        return {
            init: function() {
                logger.info('App initializing...');
                api.get('/data');
            }
        };
    }
);

// 4. 应用启动
Air.domReady(function() {
    Air.run(function() {
        var app = require('app.main');
        app.init();
    });
});
```

### 动态模块加载与回调

```javascript
// 按需加载功能模块
Air.Module('app.features', function(require, NS) {
    return {
        loadPremium: function(callback) {
            Air.loadJS('modules/premium.js', function(success) {
                if (success) {
                    Air.run(function() {
                        var premium = require('app.premium');
                        callback(premium);
                    });
                } else {
                    callback(null);
                }
            });
        }
    };
});

// 使用
Air.run(function() {
    var features = require('app.features');
    features.loadPremium(function(premium) {
        if (premium) {
            premium.unlock();
        }
    });
});
```

---

## 示例应用

完整的电商应用示例：

```javascript
// ===== 配置模块 =====
Air.Module('shop.config', function(require, NS) {
    return {
        apiBase: 'https://api.shop.local',
        currency: 'USD',
        tax: 0.08
    };
});

// ===== HTTP 请求模块 =====
Air.Module('shop.http', 
    ['shop.config'],
    function(require, NS) {
        var config = require('shop.config');
        
        return {
            request: function(method, endpoint, data, callback) {
                var url = config.apiBase + endpoint;
                console.log('[' + method + ']', url);
                // 实际 AJAX 逻辑...
                callback({ success: true, data: data });
            },
            get: function(endpoint, callback) {
                this.request('GET', endpoint, null, callback);
            },
            post: function(endpoint, data, callback) {
                this.request('POST', endpoint, data, callback);
            }
        };
    }
);

// ===== 数据模型模块 =====
Air.Module('shop.models.product',
    ['shop.http'],
    function(require, NS) {
        var http = require('shop.http');
        
        return {
            getAll: function(callback) {
                http.get('/products', callback);
            },
            getById: function(id, callback) {
                http.get('/products/' + id, callback);
            },
            create: function(data, callback) {
                http.post('/products', data, callback);
            }
        };
    }
);

// ===== 购物车模块 =====
Air.Module('shop.cart',
    ['shop.config'],
    function(require, NS) {
        var config = require('shop.config');
        var items = [];
        
        return {
            add: function(product) {
                items.push(product);
            },
            remove: function(productId) {
                items = items.filter(function(item) {
                    return item.id !== productId;
                });
            },
            total: function() {
                var subtotal = items.reduce(function(sum, item) {
                    return sum + item.price;
                }, 0);
                var tax = subtotal * config.tax;
                return subtotal + tax;
            },
            items: function() {
                return items;
            }
        };
    }
);

// ===== UI 模块 =====
Air.Module('shop.ui.product-list',
    ['shop.models.product', 'shop.cart', 'shop.config'],
    function(require, NS) {
        var Product = require('shop.models.product');
        var Cart = require('shop.cart');
        var config = require('shop.config');
        
        return {
            render: function(container) {
                Product.getAll(function(response) {
                    var html = '<div class="product-list">';
                    response.data.forEach(function(product) {
                        html += '<div class="product">' +
                                '<h3>' + product.name + '</h3>' +
                                '<p>' + config.currency + ' ' + product.price + '</p>' +
                                '<button onclick="app.addToCart(' + product.id + ')">Add</button>' +
                                '</div>';
                    });
                    html += '</div>';
                    container.innerHTML = html;
                });
            }
        };
    }
);

// ===== 主应用模块 =====
Air.Module('shop.app',
    ['shop.ui.product-list', 'shop.cart'],
    function(require, NS) {
        var ProductList = require('shop.ui.product-list');
        var Cart = require('shop.cart');
        
        return {
            init: function() {
                var container = document.getElementById('app');
                ProductList.render(container);
            },
            addToCart: function(productId) {
                console.log('Adding product', productId, 'to cart');
                Cart.add({id: productId, price: 99.99});
                console.log('Cart total:', Cart.total());
            }
        };
    }
);

// ===== 应用启动 =====
Air.domReady(function() {
    Air.run(function() {
        window.app = require('shop.app');
        app.init();
    });
});
```

---

**文档版本** — 1.0  
**最后更新** — 2026-04-13  
**相关文件** — [README.md](../README.md)
