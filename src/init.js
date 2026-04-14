/**
 * @fileoverview Air.js 初始化模块 - 初始化公开 API
 * 将内部插件系统的功能通过 openAPI 对象暴露给全局 Air 对象
 */

;(function (Air) {
    /**
     * 获取已注册的基础插件对象
     */
    var base = Air.base.plugins;
    
    /**
     * 公开 API 对象，定义了所有暴露给用户的接口
     * @type {Object}
     * @property {Function} run - 在所有模块加载完成后执行回调
     * @property {Function} iRun - 立即运行回调，忽略已加载状态
     * @property {Function} loadJS - 动态加载 JavaScript 文件
     * @property {Function} Module - 定义新的模块
     * @property {Function} merge - 合并对象属性
     * @property {Function} NS - 创建或获取命名空间
     * @property {Function} Enum - 创建枚举对象
     * @property {Function} domReady - DOM 加载完成后执行回调
     * @property {Function} moduleURL - 设置模块加载基础 URL
     * @property {Function} setCDNTimestamp - 设置 CDN 时间戳
     */
    var openAPI = {
          /**
           * 在所有模块加载完成后执行回调
           * @function run
           * @param {Function} callback - 回调函数
           */
          run: base.run,
          
          /**
           * 立即运行回调，忽略模块加载状态
           * @function iRun
           * @param {Function} callback - 回调函数
           */
          iRun: function (fn) { base.run(fn,true) },
          
          /**
           * 动态加载 JavaScript 文件
           * @function loadJS
           * @param {String} url - 文件 URL
           * @param {Function} callback - 加载完成回调 (success: Boolean)
           */
          loadJS: base.loadJS,
          
          /**
           * 定义一样新模块
           * @function Module
           * @param {String} name - 模块名称
           * @param {String[]} [dependencies] - 依赖模块数组（可选）
           * @param {Function} factory - 模块工厂函数
           */
          Module:Air.base.Module,
          
          /**
           * 使用 Beacon 的 merge 函数合并对象
           * @function merge
           * @param {Object} target - 目标对象
           * @param {Object} source - 源对象
           * @returns {Object} 合并后的对象
           */
          merge:Air.base.merge,
          
          /**
           * 创建或获取命名空间
           * @function NS
           * @param {String} namespace - 命名空间路径（点号分隔）
           * @returns {Object} 命名空间对象
           */
          NS : base.NS,
          
          /**
           * 创建枚举对象
           * @function Enum
           * @param {Object} obj - 枚举项对象
           * @returns {Object} 冻结的枚举对象
           */
          Enum : Air.base.Enum,
          
          /**
           * DOM 加载完成后执行回调
           * @function domReady
           * @param {Function} callback - 回调函数
           */
          domReady: base.DOMReady,
          
          /**
           * 设置模块加载基础 URL
           * @function moduleURL
           * @param {String} url - 基础 URL
           */
          moduleURL: base.setBaseURL,
          
          /**
           * 设置 CDN 时间戳用于缓存破除
           * @function setCDNTimestamp
           * @param {String} timestamp - 时间戳字符串
           */
          setCDNTimestamp: Air.base.setCDNTimestamp
    };
    
    /**
     * 初始化 Air 框架，合并公开 API 到全局 Air 对象
     */
    Air.base.init(openAPI);
})(Air);
