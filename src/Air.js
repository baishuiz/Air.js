/**
 * @fileoverview Air.js - JavaScript 模块加载框架
 * @author baishuiz@gmail.com
 * @version 0.1.11
 * @see {@link https://github.com/baishuiz/Air.js}
 * 
 * Air.js 提供轻量级的模块化加载系统，包括：
 * - 模块定义与依赖管理
 * - 动态 JavaScript 文件加载
 * - 事件驱动的模块通信
 * - DOM 就绪事件处理
 */

;(function (global) {

    /**
     * Avatar 类用于包装对象，提供链式调用支持
     * @class Avatar
     * @param {Object} obj - 要包装的对象
     */
    function Avatar(obj) {
        this.target = obj;
    }

    /**
     * air 函数是 Air.js 的主工厂函数
     * @function air
     * @param {Object} obj - 目标对象
     * @returns {Avatar} 返回 Avatar 实例
     * @example
     * var wrapped = air({value: 123});
     */
    var air = function (obj) {
        return new Avatar(obj);
    };

    /**
     * 获取作者信息
     * @returns {string} 作者邮箱
     */
    air.toString = function () { return "baishuiz@gmail.com"};
    
    /**
     * 获取当前脚本标签元素，用于计算基础 URL
     */
    var scripts     = document.getElementsByTagName("script")
    var selfElement = scripts[scripts.length-1];

    /**
     * 核心配置对象，管理插件系统和全局状态
     * @type {Object}
     * @property {Object} avatarCore - Avatar 原型
     * @property {Object} plugins - 注册的插件集合
     * @property {String} baseURL - 模块加载基础 URL
     * @property {Object} URLMap - URL 映射表
     * @property {String} CDNTimestamp - CDN 缓存破除时间戳
     * @property {Boolean} isDebug - 调试模式标记
     */
    var core = {
            avatarCore   : Avatar.prototype,
            plugins      : {},
            /**
             * 附加插件到核心系统
             * @param {string} key - 插件标识
             * @param {Function|Object} fn - 插件实现
             */
            attach       : function(key, fn){
                               core.plugins[key] = fn;
                           },
            baseURL      : selfElement.src.replace(/\/[^\/]+$/, '/'),
            URLMap       : {},
            CDNTimestamp : selfElement.getAttribute('data-CDNTimestamp') || '',
            isDebug      : false,
            /**
             * 初始化 Air 框架，合并公开 API
             * @param {Object} openAPI - 公开 API 对象
             */
            init         : function (openAPI) {
               global.Air = core.plugins.merge(air, openAPI);
           }
    }

    /**
     * 初始化 Air 对象，设置基础引用
     * @type {Object}
     * @property {Object} base - 核心对象的引用
     */
    var _air   = {base:core};
    global.Air = _air;
})(this);