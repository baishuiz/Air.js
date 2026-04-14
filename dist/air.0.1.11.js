!function(a){function b(a){this.target=a}var c=a.beacon,d=function(c){return this!==a&&d.blend(this,d),new b(c)};d.toString=function(){return"baishuiz@gmail.com"};var e={base:f,avatarCore:b.prototype,self:f,init:function(){var b=Object.freeze;a.beacon=d,e.merge(d,f),delete a.beacon.base,b&&b(d)},login:function(){a.beacon=d},logoff:function(){a.beacon=c}},f={base:e};a.beacon=f}(this),function(a){var b=a.base||{},c={merge:function(a){for(var b=arguments.length,c=1;b>c;c++){var d=arguments[c];for(var e in d)a[e]!==d[e]&&(a[e]=d[e])}return a},blend:function(a,b,d){var e={cover:!0,mergePrototype:!1,reset:!1};if(d=d?c.merge(e,d):e,b=[].concat(b),d.reset)for(var f in a)b[0][f]||(b[0][f]=void 0);for(var g=b.length,h=0;g>h;h++){var i=b[h];for(var j in i){var k=d.mergePrototype||i.hasOwnProperty(j),l=d.cover||!a[j];k&&l&&(a[j]=i[j])}}return a},isType:function(a,b){return"Null"===b&&null===a||"Undefined"===b&&void 0===a||"Number"===b&&isFinite(a)||Object.prototype.toString.call(a).slice(8,-1)===b},arrayIndexOf:function(a,b){return c.arrayIndexOf=Array.prototype.indexOf?function(a,b){return a=[].slice.call(a,0),a.indexOf(b)}:function(a,b){a=[].slice.call(a,0);for(var c=a.length;c>=0;c--)if(a[c]===b)return c;return c},c.arrayIndexOf(a,b)},each:function(a,b){if(a){a=[].concat(a);for(var c=0;c<a.length;c++)b.call(a[c],c,a[c])}}};c.blend(b,c)}(beacon),function(a){var b=a.base,c=function(a){function c(a){var b=e(f,a);0>b&&(b=f.push(a)-1);var c="event_"+b,d=a.toString()===a,g=d?a:c;return g}function d(a){var b=e(f,a);return 0>b?null:c(a)}var e=b.arrayIndexOf,f=[],g={dom:a,target:a,attachEvent:function(a,b){var d=c(a);f[d]=f[d]||[],f[d].push(b)},removeEvent:function(a,b){var d,e=a&&c(a),g=e&&f[e];if(a&&b)for(var h=g.length-1;h>=0;h--){var i=g[h];i===b&&(d=f[e].splice(h,1))}else a&&!b?(d=f[e],f[e]=[]):a||b||(d=f,f=[]);return d},getEventList:function(a){var b;if(!a)return f.slice(0);var c=d(a);return c&&(b=a?f[c]:f.slice(0)),b}};return g};b.EventStructure=c}(beacon),function(a){function b(a){var b=new j(a);return h.push(b),b}function c(a,c,d){var e=g(a)||b(a);e.attachEvent(c,d)}function d(a,b,d){var e=b.registEvent(d),f=b.getEventList();i.each(f,function(b){c(a,f[b],e)})}function e(a,b,c){var d=h.slice(0),e=a?g(a)||[]:h.slice(0);i.each(e,function(a,e){if(e.removeEvent(b,c),!b&&!c||0==e.getEventList().length){var a=i.arrayIndexOf(h,e);d.splice(a,1)}}),h=d}function f(a,b,c){var d=b.removeEvent(c);i.each(d,function(c){var f=d[c],g=b.getEventList();i.each(g,function(b,c){e(a,c,f)})})}function g(a){if(!a)return h.slice(0);for(var b=0;b<h.length;b++){var c=h[b];if(c.target===a)return c}}var h=[],i=a.base,j=i.EventStructure,k={registEvent:c,registCombinationEvent:d,removeEvent:e,removeCombinationEvent:f,getEventList:g};i.eventStore=k}(beacon),function(a){function b(){if(this instanceof b)return this;var a=[],d=[],e=[].slice.call(arguments,0),f=e.slice(0),g=function(){function b(){return f=e.slice(0)}var g=function(b,e){var f=c.arrayIndexOf(a,b);0>f&&(a.push(b),d.push(e))},h=function(b){var e=c.arrayIndexOf(a,b),f=d[e];return b?f:d.slice(0)};this.resetEventList=b,this.getEventList=function(){return e.slice(0)},this.registEvent=function(a){var d=c.arrayIndexOf,f=e.slice(0),h=function(c,e){var g=this,h=d(f,c.eventType);h>=0&&f.splice(h,1),0===f.length&&(a.call(g,e),f=b())};return g(a,h),h},this.removeEvent=function(a){var b=[].concat(h(a));return b}};return g.prototype=new b,new g}var c=a.base;c.combinationalEvent=b}(beacon),function(a){var b=a.base,c=b.eventStore,d=c.registCombinationEvent,e=c.registEvent,f=c.removeCombinationEvent,g=c.removeEvent,h=c.getEventList,i={hostProxy:{},attachActionEvent:function(a,c,d){var e=a.desc,f=b.isType(a.desc,"Function");f&&e(c,d);var g=["touchmove","mousemove"];b.each(g,function(b,c){f&&window.beacon(document).on(c,function(b){i.publicDispatchEvent(a,b)})})},attachEvent:function(a,c){var f=this,g=a instanceof b.combinationalEvent?d:e;i.attachActionEvent(a,f,c),g(f,a,c)},fireEvent:function(a,c){var d=this,e=h(d);if(e){var f=e.getEventList(a),g=b.isType(a.desc,"Function"),i=g&&a.desc(c);!!i==!!g&&b.each(f,function(b,e){var f={eventType:a};e.call(d,f,c)})}},publicDispatchEvent:function(a,c){var d=h(),e=b.isType(a.desc,"Function");e&&a.desc(c);b.each(d,function(b){var e=d[b].dom;i.fireEvent.call(e,a,c)})},removeEvent:function(a,c){var d=this,e=a instanceof b.combinationalEvent?f:g;e(d,a,c)}},j=function(){var a=function(){};return a.prototype=i,b.blend(a,i),a}();b.Event=j}(beacon),function(a){var b=a.base,c=function(){return this}(),d=b.EventStructure,e={structures:[],getStructure:function(a){for(var b,c,d=0;d<e.structures.length;d++){b=e.structures[d];try{c=b.dom===a}catch(f){b.dom=window.document,c=b.dom===a}if(c)return b}},add:function(a,b,c){var f=e.getStructure(a);f||(f=new d(a),e.structures.push(f)),f.attachEvent(b,c)},remove:function(a,b,c){var d=e.getStructure(a);return d&&d.removeEvent(b,c)}},f={attachEvent:function(a,b){var d,e=this,g=function(a,b){var c=this;c.addEventListener(a,b,!1)},h=function(a,b){var c=this;c.attachEvent("on"+a,b)},i=function(a,b){var c=this,d=c["on"+a];c["on"+a]=function(){d.call(c),b.call(c)}};return c.addEventListener?(g.call(e,a,b),d=g):c.attachEvent?(h.call(e,a,b),d=h):(i.call(e,a,b),d=i),f.attachEvent=d},fireEvent:function(a,b){var c,d=this,e=function(a,b){var c=this;b=b||{bubbles:!0,cancelable:!0},b.ieHack=c.all&&c.all.toString(),b.ieHack=c.style;var d=document.createEvent("Event");d.initEvent(a,b.bubbles,b.cancelable),b.state&&(d.state=b.state),c.dispatchEvent(d)},f=function(a,b){var c=this;b=b||{bubbles:!0,cancelable:!0},b.ieHack=c.all&&c.all.toString(),b.ieHack=c.style,a="on"+a;var d=document.createEventObject();d.cancelBubble=b.cancelable,c.fireEvent(a,d)};return document.createEvent&&d.dispatchEvent?(e.call(d,a,b),c=e):document.createEventObject&&d.fireEvent&&(f.call(d,a,b),c=f),c},removeEvent:function(a,b){var c,d=this,e=function(a,b){var c=this;c.removeEventListener(a,b,!1)},g=function(a,b){var c=this;c.detachEvent("on"+a,b)};return d.removeEventListener?(e.call(d,a,b),c=e):d.detachEvent&&(g.call(d,a,b),c=g),f.removeEvent=c}},g={attachEvent:function(a,b){var c=this;e.add(c,a,b),f.attachEvent.call(c,a,b)},fireEvent:function(a,b){var c=this;g.fireEVent=f.fireEvent.call(c,a,b)},removeEvent:function(a,c){var d=this;if(a&&c)f.removeEvent.call(d,a,c);else if(a&&!c){var h=e.remove(d,a);h&&b.each(h,function(){var b=this;g.removeEvent.call(d,a,b)})}else if(!a&&!c){var i=e.remove(d);i&&b.each(i,function(){var a=this;a&&b.each(i[a],function(){var b=this;g.removeEvent.call(d,a,b)})})}},isHTMLElement:function(a){var b=a==document||a==window,c=function(a){var b=a&&a.nodeName;return b&&a.nodeType};return b||c(a)},isEventSupported:function(a,c){if(!g.isHTMLElement(a)||!b.isType(c,"String"))return!1;var d=!1;if(a===window||a===document){d="on"+c in a;var e=!!window.ActiveXObject,f=e&&!!document.documentMode;if(!d&&f)return!1;if(d)return!0;var h=document.createElement("iframe");h.style.display="none",document.body.appendChild(h);var i=a===window?h.contentWindow:h.contentDocument;g.attachEvent.call(i,c,function(){d=!0}),g.fireEvent.call(i,c),h.parentNode.removeChild(h)}else{var j=a.tagName,c="on"+c;a=document.createElement(j),d=c in a,d||(a.setAttribute(c,"return;"),d="function"==typeof a[c]),a=null}return d}};b.DOMEvent=g}(beacon),function(a){var b=a.base,c={on:function(){var b=a.base,c=b.isType,d=b.Event.hostProxy,e=b.Event.publicDispatchEvent,f=b.Event.attachEvent,g=function(a,b){var g=[].slice.call(arguments,0);b&&c(b,"Function")?f.apply(d,g):e.apply(d,g)};return g}(a),once:function(a,b){var d=function(e,f){c.off(a,d),b.call({},e,f)};c.on(a,d)},off:function(){var b=a.base,c=b.Event.hostProxy,d=function(a,d){var e=[].slice.call(arguments,0);b.Event.removeEvent.apply(c,e)};return d}(),blend:b.blend,NS:b.NS,arrayIndexOf:b.ArrayIndexOf,isType:b.isType,Enum:b.Enum,loginGlobal:b.login,logoffGlobal:b.logoff,utility:b,createEvent:function(){var a,c=[].slice.call(arguments,0);return a=arguments.length>1?b.combinationalEvent.apply(this,c):{desc:c[0]}}},d={on:function(b,c){var d=[].slice.call(arguments,0),e=this.target,f=a.base,g=f.DOMEvent.isHTMLElement(e),h=f.DOMEvent.isEventSupported(e,b),i=g&&h?f.DOMEvent.fireEvent:f.Event.fireEvent,j=g&&h?f.DOMEvent.attachEvent:f.Event.attachEvent;c&&f.isType(c,"Function")?f.each(e,function(a,b){j.apply(b,d)}):f.each(e,function(a,b){i.apply(b,d)})},once:function(a,b){var c=this,e=function(f,g){d.off.call(c,a,e),b.call(c,f,g)};d.on.call(c,a,e)},off:function(a,c,d){var e=this.target,f=b.DOMEvent.isHTMLElement(e),g=a&&b.DOMEvent.isEventSupported(e,a);f&&g?b.DOMEvent.removeEvent:b.Event.removeEvent;b.each(e,function(e,g){var h=a&&b.DOMEvent.isEventSupported(g,a);f&&b.DOMEvent.removeEvent.call(g,a,c,d),h||b.Event.removeEvent.call(g,a,c,d)})}};b.blend(b.avatarCore,d),b.blend(a,c),b.init()}(beacon);;/**
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
})(this);;/**
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
})(Air);;;(function (Air) {
    // 此方法待重构
    var isReady = false;
    var readyHandleQueue = [];
    var beacon = Air.base.plugins.beacon;
    var base   = Air.base.plugins;
    var readyHandle = function () {
        beacon(document).off("readystatechange", ieReadyHandle);
        beacon(document).off("DOMContentLoaded", readyHandle);
        beacon(window).off("load", readyHandle);


        //readyHandle = function () { };
        
        //fn();
        var acctiveHandle;
        while (acctiveHandle = readyHandleQueue.shift()) {
            isReady || acctiveHandle();
        }
        isReady = true;
    }

    var ieReadyHandle = function () {
        if (/loaded|complete/.test(document.readyState) || isReady == true) {
            readyHandle();
        }
    };
    beacon(document).on("readystatechange", ieReadyHandle);
    beacon(document).on("DOMContentLoaded", readyHandle);
    beacon(window).on("load", readyHandle);
    document.documentElement.doScroll && checkDoScroll();

    function checkDoScroll() {
        try {
            document.documentElement.doScroll("left");
        } catch (err) {
            setTimeout(checkDoScroll, 1);
            return
        }
        readyHandle();
    }

    function _domReady(fn) {
        if (isReady == true) {
            fn();
            return
        }
        readyHandleQueue.push(fn);

    }


    Air.base.attach("DOMReady",  _domReady);
})(Air);;;(function (moduleName, Air) {
    
    function Loader(jsURL, completeHandle){
        var jscount = 1;
        this.loadJS = function(){
            if(/\bArray\b/.test(Object.prototype.toString.call(jsURL))){
                jscount = jsURL.length;
                for (var i = jscount - 1; i >= 0; i--) {
                    _loadJs(jsURL[i], function(){
                        --jscount || completeHandle();
                    });
                };
            }else{
                _loadJs(jsURL, completeHandle);
            }
        };
    }

    function JSLoader(){
        var jsQueue = [];
        jsQueue.currentJs = null;

        this.loadJS = function(jsURL, completeHandle){
            var fixHandle = function(){
                jsQueue.currentJs = null;
                completeHandle && completeHandle();
                startLoad();
            };                
            jsQueue.push(new Loader(jsURL, fixHandle));
            startLoad();            
            return this;
        };

        function startLoad(){
            if(!jsQueue.currentJs){
                jsQueue.currentJs = jsQueue.shift();
                jsQueue.currentJs && jsQueue.currentJs.loadJS();
            }        
        }        

    }


    function _loadJs(jsURL, completeHandle) {
        var head = document.getElementsByTagName('head')[0]
           , jsLoader = document.createElement('script')
           , isComplate = false
           , beacon = Air.base.plugins.beacon
           , isExisted
           , loadCompleteHandle = function () {
               isComplate = true;
               beacon(jsLoader).off('load');
               beacon(jsLoader).off('readystatechange');
               loadCompleteHandle = function () { };
               completeHandle && completeHandle();
           }
           , readyHandle = function () {
               if (/loaded|complete/.test(jsLoader.readyState) && isComplate == false) {                 
                    loadCompleteHandle();                 
               }
           };
        jsLoader.async = true;
        jsLoader.setAttribute("type", "text/javascript");
        jsLoader.src = jsURL;
        beacon(jsLoader).on('load', loadCompleteHandle);
        beacon(jsLoader).on('readystatechange', readyHandle);
        beacon(jsLoader).on('error', loadCompleteHandle);


        //var jsList = [].slice.call(document.getElementsByTagName("script"));
        var jsList = document.getElementsByTagName("script");
        for (var i = 0, len = jsList.length; !isExisted && i < len; i++) {
            isExisted = jsURL == jsList[i].getAttribute("src");
        };

        isExisted || head.appendChild(jsLoader);
    };

    function loadJs(jsURL, completeHandle){
        var jsLoader = new JSLoader();
        jsLoader.loadJS(jsURL, completeHandle);
        return jsLoader;
    }



    /**
    * @name Air.base.BOM.LoadJS
    * @class [JS 加载器]
    * @name Air.Loader
    * @param {String} jsURL [js地址（暂时只支持绝对地址）]
    * @param {Function} completeHandle [回调函数]
    */
    Air.base.attach(moduleName, loadJs);
})("loadJS", Air);;;(function(Air) {
    /**
     * 已加载的模块记录表，用于跟踪已完成构造的模块
     * @type {Object}
     * @private
     */
    var loaded = {}
    
    /**
     * 模块构造函数
     * 
     * 解析模块工厂函数中的依赖项，加载所有依赖模块，
     * 然后执行模块工厂函数以生成模块导出对象。
     * 
     * @function _module
     * @param {String} nsString - 模块的命名空间（例如 'app.ui.dialog'）
     * @param {Function} factory - 模块的工厂函数
     *                             签名：function(require, NS) { return {...}; }
     * 
     * @example
     * // 简单模块
     * Air.Module('app.utils', function(require, NS) {
     *     return { add: function(a, b) { return a + b; } };
     * });
     * 
     * // 带依赖的模块
     * Air.Module('app.math', function(require, NS) {
     *     var utils = require('app.utils');
     *     return { compute: function(a, b) { return utils.add(a, b); } };
     * });
     */
    function _module(nsString, module) {
        "use strict"
        var _base = Air.base.plugins;
        //发布消息：模块开始构造，但未构造完成
        _base.beacon.on(Air.base.Require.Event.REQUIREING, { moduleName: nsString });

        //获得模块文件相对路径及文件名
        var ns = nsString.match(/(^.*)\.(\w*)$/);
        var nsPath = ns[1];
        var moduleName = ns[2];



        //remove multi-line comment
        var fnBody = module.toString().replace(/(?!['"])\/\*[\w\W]*?\*\//igm, '');

        //remove single line comment
        fnBody = fnBody.replace(/(['"/])[\w\W]*?\1|((['"/])[\w\W]*?)\/\/[\w\W]*?\2|\/\/[\w\W]*?(\r|\n|$)/g, function (str, isString) {
            return isString ? str : ''
        });


        var requireName = fnBody.replace(/^function\s*?\(\s*?([^,\)]+)[\w\W]*$/, function(fnbody, reqName){
                              return reqName ;
                            }).replace(fnBody,'');

        var reg = requireName && new RegExp("\\b" + requireName + "\\s*\\(([^\\)]+)\\)","gm");


        var requireQueue = [];
        reg && fnBody.replace(reg, function(requireString,nsPath){
            var reg = /['" ]/g;
            var args = nsPath.split(',');
            var dependence, url;
            if (args.length > 1) {
              dependence = args[0].replace(reg, '');
              url = args[1].replace(reg, '');
            } else {
              dependence = nsPath.replace(reg, '');
            }

            var idependence = dependence.toLowerCase();
            loaded[idependence] || (requireQueue[idependence] = requireQueue.push(idependence) - 1);
            Air.base.Require(dependence, url);
        });

        var target = new String(nsString);
        requireQueue.length && beacon(target).on(Air.base.Require.Event.LOADED, function (e,data) {
            var moduleName = data.moduleName.toLowerCase();
            if(requireQueue.hasOwnProperty(moduleName)) {
               delete requireQueue[moduleName];
               requireQueue.splice(requireQueue[moduleName], 1);
            }
            if(requireQueue.length<=0){
              beacon(target).off(Air.base.Require.Event.LOADED);
              action();
            }
        });

        requireQueue.length || action();

        function action(){
            var
                _module      = moduleName.toLowerCase(),
                _nsPath      = nsPath.toLowerCase(),
                _base        = Air.base,
                beacon       = _base.plugins.beacon,
                ns           = _base.plugins.NS,
                activeModule = _base.plugins.NS(nsPath.toLowerCase(),_base)[_module],
                moduleAPI    = module(_base.Require,_base.run)
            ;


            if(activeModule) { //如果当前模块已作为父级节点存在
                if( typeof(moduleAPI) === 'function') {
                    ns(_nsPath,_base)[_module] = _base.plugins.merge(moduleAPI, activeModule);
                } else {
                    _base.plugins.merge(activeModule, moduleAPI);
                }
            } else {
                ns(_nsPath, _base)[_module] = moduleAPI;
            }

            //登记已经构造好的模块，并广播通知
            loaded[nsString.toLowerCase()] = true;
            beacon.on(Air.base.Require.Event.LOADED,{moduleName:nsString});
        }

    }
    Air.base.Module = _module;
})(Air);
;;(function(Air) {
    var beacon = Air.base.plugins.beacon;
    var createEvent = beacon.createEvent;
    //定义事件
    var requireEvent = {
            COMPLETE   : createEvent('require_complete'),
            LOADED     : createEvent('require_loaded'),
            REQUIREING : createEvent('require_requireing')
        };

    //定义队列
    var queue = {
            requiring    : {} //正在加载的模块
           ,required     : {}  //已加载完毕但未构造的模块
           ,moduleLoaded : {} //加载并构造完毕的模块
           ,requireQueue : []  //模块加载意向清单
        };


    //监听模块加载状态，当模块通过 require 方法以外的其他形式加载时，应通过此事件通知require 记录
    beacon(queue).on(requireEvent.REQUIREING, function (e, data) {
        var moduleName = data.moduleName.toLowerCase();
        queue.requireQueue[moduleName] || queue.requireQueue.push(moduleName);
        queue.required[moduleName] = true;
    });



    //判断预期加载的模块是否已全部构造完毕
    function isRequireComplete(moduleName) {
        var result;
        if (moduleName) {
            return queue.moduleLoaded[moduleName]
        }

        for (var i = 0,len = queue.requireQueue.length; i < len; i++) {
            var module = queue.requireQueue[i];
            if(!queue.moduleLoaded[module]){
                return false;
            }
        };
        return true;
    }


    function publicDispatchCompleteEvent() { //此方法待重构
        beacon.on(requireEvent.COMPLETE);
        beacon(document).on('readystatechange'); //for 蓝线与红线之间的Air.domReady
        publicDispatchCompleteEvent = function () {
            beacon.on(requireEvent.COMPLETE);
        }
    }

    /**
    * @name require
    * @class [Air 模块加载器]
    * @param {String} module [模块命名空间]
    * @param {String} url [可选，模块文件路径]
    */
    var require = function(module,url){
        //缓存原始命名空间名
        var _module = module;

        //去除命名空间大小写敏感
        module = module.toLowerCase();

        // 跳过已加载的模块
        if(queue.required[module]  || queue.requiring[module] || queue.moduleLoaded[module]){
            //return true;
            return Air.base.plugins.NS(module,Air.base);
        }

        // 替换URL中的 {{*}} 内的内容为URLMap中的值
        if (url) {
            var URLMap = Air.base.URLMap || {};
            url = url.replace(/{{(.+)}}/g, function(str, key){
                return URLMap[key] || Air.base.baseURL;
            })
        }

        //获取模块URL，实参优先级高于模块命名空间解析（此处URL需要区分大小写）
        url = url || parseModule(_module);


        module = module.toLowerCase();

        //记录模块加载意向
        queue.requireQueue[module] = true;
        queue.requireQueue.push(module);

        // parse module
        function parseModule(module){
            var ns = module.match(/(^.*)(\.\w*)$/);
            var nsPath = ns[1];
            var moduleName = ns[2];
            var CDNTimestamp = Air.base.CDNTimestamp || '';
            CDNTimestamp = CDNTimestamp && '?' + CDNTimestamp;
            return Air.base.baseURL + module.replace(/\./ig,'/') + '.js' + CDNTimestamp;
        }


        //压入require队列，开始加载URL
        function startLoad(module) {
            if(!isRequire(module)){
                queue.requiring[module] = true;  //注册正在加载的模块
                Air.base.plugins.loadJS(url, function () {
                    // queue.required[module] = true; //注册已加载完毕的模块
                    // 校验模块有效性
                    if (!queue.required[module]) {
                        throw new Error("module [" + module + "] is undefined! @" + url);
                    }

                    isRequireComplete() && publicDispatchCompleteEvent(); //如果所有预期加载的模块都已构造完毕，则广播COMPLETE事件
                });
            }
        }



        //判断模块是否已经加载过
        // return : ture 为已加载过， false 为尚未加载
        function isRequire(module){
            return queue.required[module] || queue.requiring[module] || queue.moduleLoaded[module];
        }



        startLoad(module); //尝试启动加载
        return Air.base.plugins.NS(module,Air.base);
    };


    //监听模块加载状态，当模块加载并构造完毕时出发回调
    beacon.on(requireEvent.LOADED, function (e, data) {
        var moduleName = data.moduleName.toLowerCase();
        queue.required[moduleName] = true;
        queue.moduleLoaded[moduleName] = true;
        isRequireComplete() && publicDispatchCompleteEvent();
    });

    require.Event = requireEvent;
    require.isRequireComplete = isRequireComplete;
    Air.base.Require = require;
})(Air);
;;(function (Air) {

    /**
     * 运行队列，存储待执行的回调函数
     * @type {Array}
     * @private
     */
    var runnerQueue = [];
    
    /**
     * Beacon 事件系统的引用
     * @type {Object}
     * @private
     */
    var eventer = Air.base.plugins.beacon;
    
    /**
     * Require 事件对象引用
     * @type {Object}
     * @private
     */
    var requireEvent = Air.base.Require.Event;
    function runnerAction() {
        while (function () {
            var activeRunner = runnerQueue.shift();
            activeRunner && activeRunner();
            return runnerQueue.length;
        }()) { };
    };
    eventer.on(requireEvent.COMPLETE, runnerAction);

    var _run = function () {
        var requireOfRun = [];
        var runBody;
        function isRequireComplete() {
            for (var i = 0; i < requireOfRun.length; i++) {
                var moduleName = requireOfRun[i];
                if (!requireOfRun[moduleName] && !Air.base.Require.isRequireComplete(moduleName)) {
                    return false;
                }
            }
            return true;
        }

        //监听模块加载状态，当模块加载并构造完毕时出发回调
        this.runNow && eventer.on(requireEvent.LOADED, function (e, data) {
            var moduleName = data.moduleName.toLowerCase();
            requireOfRun[moduleName] = true;
            beacon.utility.arrayIndexOf(requireOfRun, moduleName)>=0 && isRequireComplete() && runBody && runBody();
        });

        this.run = function (runner) {
            runBody = runner;


            if (this.runNow) {
                isRequireComplete() && runner();
            } else {
                runnerQueue.push(runner);
                Air.base.Require.isRequireComplete() && runnerAction();
            }
        };

        this.require = function (module,url) {
            Air.base.Require(module,url);

            module = module.toLowerCase();
            requireOfRun.push(module);
            if(!url){
                var ns = module.match(/(^.*)\.(\w*)$/);
                var nsPath = ns[1];
                var moduleName = ns[2];
                Air.base.plugins.NS(nsPath,Air.base)[moduleName];
            }


            var moduleBody = Air.base.plugins.NS(module,Air.base);
            return  moduleBody;
        };


    }

    var run = function (fn, runNow) {
        "use strict"
        var me = run;
        if (!(this instanceof me)) {
            return new me(fn, runNow, arguments);
        }

        var params = [].slice.call(arguments[2]).slice(2);
        var context = this;
        context.runNow = runNow;
        _run.call(context);

        //remove multi-line comment
        var fnBody = fn.toString().replace(/(?!['"])\/\*[\w\W]*?\*\//igm, '');

        //remove single line comment
        fnBody = fnBody.replace(/(['"/])[\w\W]*?\1|((['"/])[\w\W]*?)\/\/[\w\W]*?\2|\/\/[\w\W]*?(\r|\n|$)/g, function (str, isString) {
            return isString ? str : ''
        });

        var requireName = fnBody.replace(/^function\s*?\(\s*?([^,\)]+)[\w\W]*$/, function(fnbody, reqName){
                              return reqName ;
                            }).replace(fnBody,'');
        var reg = requireName && new RegExp("\\b" + requireName + "\\s*\\(([^\\)]+)\\)","gm");
        var requireQueue = [];
        reg && fnBody.replace(reg, function(requireString,nsPath){
            var reg = /['" ]/g;
            var args = nsPath.split(',');
            var moduleName, url;
            if (args.length > 1) {
              moduleName = args[0].replace(reg, '');
              url = args[1].replace(reg, '');
            } else {
              moduleName = nsPath.replace(reg, '');
            }
            context.require(moduleName, url);
        });


        context.run(function(){
            //fn(context.require, context.run);
            var _params = [context.require].concat(params);
            fn.apply(this, _params);
        });

    };

    /**
    * @name Air.base.run
    * @class [Air的沙箱环境]
    * @param  {Fcuntion} fn [函数句柄]
    * @example
    */
    Air.base.attach("run", run);
})(Air);
;/**
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
