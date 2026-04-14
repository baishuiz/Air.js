/**
 * @fileoverview Air.js 基础工具库 - 提供命名空间、对象合并、URL 管理等功能
 */

;(function (Air) {

    /**
     * 基础工具对象，包含常用的工具函数
     * @type {Object}
     */
    var _base = {
        /**
         * 创建或获取命名空间对象
         * 
         * 通过点号分隔符创建分层的命名空间结构。如果命名空间已存在则直接返回，
         * 否则创建新的对象结构。
         * 
         * @function NS
         * @param {String} NSString - 命名空间路径，使用点号分隔（例如 'app.ui.dialog'）
         * @param {Object} [root=window] - 命名空间的根对象，默认为 window
         * @returns {Object} 返回创建或获取的对象，若已存在则直接返回
         * 
         * @example
         * // 创建简单命名空间
         * Air.NS('app.utils');
         * 
         * // 创建嵌套命名空间
         * Air.NS('app.ui.dialog');
         * 
         * // 在命名空间上添加属性
         * Air.NS('app').name = 'MyApp';
         * console.log(app.name); // 'MyApp'
         * 
         * // 指定根对象
         * var customRoot = {};
         * Air.NS('specific.path', customRoot);
         */
        NS: function (NSString, root) {
            var nsPath = NSString.split("."), ns = root || window || {}, root = ns;
            for (var i = 0, len = nsPath.length; i < len; i++) {
                ns[nsPath[i]] = ns[nsPath[i]] === undefined ? {} : ns[nsPath[i]];
                ns = ns[nsPath[i]];
            };
            return ns;
        },

        /**
         * Beacon 事件系统的引用
         * 用于模块间的事件通信和触发
         * @type {Object}
         */
        beacon : beacon,
        
        /**
         * 使用 Beacon 库的 merge 函数合并对象属性
         * 将源对象的所有属性复制到目标对象
         * 
         * @function merge
         * @param {Object} target - 目标对象，属性会被合并到此对象
         * @param {Object} source - 源对象，其属性会被复制到目标对象
         * @returns {Object} 返回合并后的目标对象
         * 
         * @example
         * var obj1 = {a: 1, b: 2};
         * var obj2 = {b: 3, c: 4};
         * Air.merge(obj1, obj2);
         * // obj1 现在为 {a: 1, b: 3, c: 4}
         */
        merge  : beacon.utility.merge,

        /**
         * 设置模块加载의基础 URL
         * 
         * 支持字符串 URL 或 URL 映射对象。URL 映射对象中的 'base' 属性
         * 会被用作默认基础 URL。
         * 
         * @function setBaseURL
         * @param {String|Object} url - 基础 URL 字符串或映射对象
         * @returns {String} 返回设置后的基础 URL
         * 
         * @example
         * // 设置字符串 URL
         * Air.moduleURL('https://cdn.example.com/modules/');
         * 
         * // 设置 URL 映射对象
         * Air.moduleURL({
         *     base: 'https://cdn.example.com/',
         *     api: 'https://api.example.com/',
         *     static: 'https://static.example.com/'
         * });
         */
        setBaseURL: function(url){
            if (beacon.isType(url, 'Object')) {
                Air.base.URLMap = url;
                return Air.base.baseURL = url['base'] || Air.base.baseURL;
            } else {
                return Air.base.baseURL = url || Air.base.baseURL;
            }
        }
    };
    
    /**
     * 将基础工具对象的所有属性合并到插件系统中
     * 这样所有工具函数都可以通过 Air.base.plugins 访问
     */
    _base.merge(Air.base.plugins, _base);
})(Air);