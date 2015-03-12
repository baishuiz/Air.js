!function(a){function b(a){this.target=a}var c=a.beacon,d=function(c){return this!==a&&d.blend(this,d),new b(c)};d.toString=function(){return"baishuiz@gmail.com"};var e={base:f,avatarCore:b.prototype,self:f,init:function(){var b=Object.freeze;a.beacon=d,e.merge(d,f),delete a.beacon.base,b&&b(d)},login:function(){a.beacon=d},logoff:function(){a.beacon=c}},f={base:e};a.beacon=f}(this),function(a){var b=a.base||{},c={merge:function(a){for(var b=arguments.length,c=0;b>c;c++){var d=arguments[c];for(var e in d)a[e]=d[e]}return a},blend:function(a,b,d){var e={cover:!0,mergePrototype:!1};d=d?c.merge(e,d):e,b=[].concat(b);for(var f=b.length,g=0;f>g;g++){var h=b[g];for(var i in h){var j=d.mergePrototype||h.hasOwnProperty(i),k=d.cover||!a[i];j&&k&&(a[i]=h[i])}}return a},isType:function(a,b){return"Null"===b&&null===a||"Undefined"===b&&void 0===a||"Number"===b&&isFinite(a)||Object.prototype.toString.call(a).slice(8,-1)===b},arrayIndexOf:function(a,b){return c.arrayIndexOf=Array.prototype.indexOf?function(a,b){return a=[].slice.call(a,0),a.indexOf(b)}:function(a,b){a=[].slice.call(a,0);for(var c=a.length;c>=0;c--)if(a[c]===b)return c;return c},c.arrayIndexOf(a,b)},each:function(a,b){if(a){a=[].concat(a);for(var c=a.length-1;c>=0;c--)b.call(a[c],c,a[c])}}};c.blend(b,c)}(beacon),function(a){var b=a.base,c=function(a){function c(a){var b=d(e,a);0>b&&(b=e.push(a)-1);var c="event_"+b,f=a.toString()===a?a:c;return f}var d=b.arrayIndexOf,e=[],f={dom:a,target:a,attachEvent:function(a,b){var d=c(a);e[d]=e[d]||[],e[d].push(b)},removeEvent:function(a,b){var f,g=a&&c(a),h=g&&e[g];if(a&&b){var i=d(h,b);f=e[g].splice(i,1)}else a&&!b?(f=e[g],e[g]=[]):a||b||(f=e,e=[]);return f},getEventList:function(a){var b=c(a),d=a?e[b]:e.slice(0);return d}};return f};b.EventStructure=c}(beacon),function(a){function b(a){var b=new j(a);return h.push(b),b}function c(a,c,d){var e=g(a)||b(a);e.attachEvent(c,d)}function d(a,b,d){var e=b.registEvent(d),f=b.getEventList();i.each(f,function(b){c(a,f[b],e)})}function e(a,b,c){var d=a?g(a)||[]:h;i.each(d,function(a,d){d.removeEvent(b,c)})}function f(a,b,c){var d=b.removeEvent(c);i.each(d,function(c){var f=d[c],g=b.getEventList();i.each(g,function(b,c){e(a,c,f)})})}function g(a){if(!a)return h.slice(0);for(var b=0;b<h.length;b++){var c=h[b];if(c.dom===a)return c}}var h=[],i=a.base,j=i.EventStructure,k={registEvent:c,registCombinationEvent:d,removeEvent:e,removeCombinationEvent:f,getEventList:g};i.eventStore=k}(beacon),function(a){function b(){if(this instanceof b)return this;var a=[],d=[],e=[].slice.call(arguments,0),f=e.slice(0),g=function(){function b(){return f=e.slice(0)}var g=function(b,e){var f=c.arrayIndexOf(a,b);0>f&&(a.push(b),d.push(e))},h=function(b){var e=c.arrayIndexOf(a,b),f=d[e];return b?f:d.slice(0)};this.resetEventList=b,this.getEventList=function(){return e.slice(0)},this.registEvent=function(a){var d=c.arrayIndexOf,f=e.slice(0),h=function(c,e){var g=this,h=d(f,c.eventType);h>=0&&f.splice(h,1),0===f.length&&(a.call(g,e),f=b())};return g(a,h),h},this.removeEvent=function(a){var b=[].concat(h(a));return b}};return g.prototype=new b,new g}var c=a.base;c.combinationalEvent=b}(beacon),function(a){var b=a.base,c=b.eventStore,d=c.registCombinationEvent,e=c.registEvent,f=c.removeCombinationEvent,g=c.removeEvent,h=c.getEventList,i={hostProxy:{},attachEvent:function(a,c){var f=this,g=a instanceof b.combinationalEvent?d:e;g(f,a,c)},fireEvent:function(a,c){var d=this,e=h(d),f=e.getEventList(a);b.each(f,function(b,e){var f={eventType:a};e.call(d,f,c)})},publicDispatchEvent:function(a,c){var d=h();b.each(d,function(b){var e=d[b].dom;i.fireEvent.call(e,a,c)})},removeEvent:function(a,c){var d=this,e=a instanceof b.combinationalEvent?f:g;e(d,a,c)}},j=function(){var a=function(){};return a.prototype=i,b.blend(a,i),a}();b.Event=j}(beacon),function(a){var b=a.base,c=function(){return this}(),d=b.EventStructure,e={structures:[],getStructure:function(a){for(var b,c=0;c<e.structures.length;c++)if(b=e.structures[c],b.dom===a)return b},add:function(a,b,c){var f=e.getStructure(a);f||(f=new d(a),e.structures.push(f)),f.attachEvent(b,c)},remove:function(a,b,c){var d=e.getStructure(a);return d.removeEvent(b,c)}},f={attachEvent:function(a,b){var d,e=this,g=function(a,b){var c=this;c.addEventListener(a,b,!1)},h=function(a,b){var c=this;c.attachEvent("on"+a,b)},i=function(a,b){var c=this,d=c["on"+a];c["on"+a]=function(){d.call(c),b.call(c)}};return c.addEventListener?(g.call(e,a,b),d=g):c.attachEvent?(h.call(e,a,b),d=h):(i.call(e,a,b),d=i),f.attachEvent=d},fireEvent:function(a,b){var c,d=this,e=function(a,b){var c=this;b=b||{bubbles:!0,cancelable:!0},b.ieHack=c.all&&c.all.toString(),b.ieHack=c.style;var d=document.createEvent("Event");d.initEvent(a,b.bubbles,b.cancelable),c.dispatchEvent(d)},f=function(a,b){var c=this;b=b||{bubbles:!0,cancelable:!0},b.ieHack=c.all&&c.all.toString(),b.ieHack=c.style,a="on"+a;var d=document.createEventObject();d.cancelBubble=b.cancelable,c.fireEvent(a,d)};return document.createEvent&&d.dispatchEvent?(e.call(d,a,b),c=e):document.createEventObject&&d.fireEvent&&(f.call(d,a,b),c=f),c},removeEvent:function(a,b){var c,d=this,e=function(a,b){var c=this;c.removeEventListener(a,b,!1)},g=function(a,b){var c=this;c.detachEvent("on"+a,b)};return d.removeEventListener?(e.call(d,a,b),c=e):d.detachEvent&&(g.call(d,a,b),c=g),f.removeEvent=c}},g={attachEvent:function(a,b){var c=this;e.add(c,a,b),f.attachEvent.call(c,a,b)},fireEvent:function(a,b){var c=this;g.fireEVent=f.fireEvent.call(c,a,b)},removeEvent:function(a,c){var d=this;if(a&&c)f.removeEvent.call(d,a,c);else if(a&&!c){var h=e.remove(d,a);h&&b.each(h,function(){var b=this;g.removeEvent.call(d,a,b)})}else if(!a&&!c){var i=e.remove(d);i&&b.each(i,function(){var a=this;a&&b.each(i[a],function(){var b=this;g.removeEvent.call(d,a,b)})})}},isHTMLElement:function(a){var b=a==document||a==window,c=function(a){var b=a&&a.nodeName;return b&&document.createElement(b).constructor===a.constructor};return b||c(a)},isEventSupported:function(a,b){if(!g.isHTMLElement(a))return!1;var c=!1;if(a===window||a===document){var d=document.createElement("iframe");d.style.display="none",document.body.appendChild(d);var e=a===window?d.contentWindow:d.contentDocument;g.attachEvent.call(e,b,function(){c=!0}),g.fireEvent.call(e,b),d.parentNode.removeChild(d)}else{var f=a.tagName,b="on"+b;a=document.createElement(f),c=b in a,c||(a.setAttribute(b,"return;"),c="function"==typeof a[b]),a=null}return c}};b.DOMEvent=g}(beacon),function(a){var b=a.base,c={on:function(){var b=a.base,c=b.isType,d=b.Event.hostProxy,e=b.Event.publicDispatchEvent,f=b.Event.attachEvent,g=function(a,b){var g=[].slice.call(arguments,0);b&&c(b,"Function")?f.apply(d,g):e.apply(d,g)};return g}(a),once:function(a,b){var d=function(){c.off(a,b)};c.on(a,b),c.on(a,d)},off:function(){var b=a.base,c=b.Event.hostProxy,d=function(){var a=[].slice.call(arguments,0);b.Event.removeEvent.apply(c,a)};return d}(),blend:b.blend,NS:b.NS,arrayIndexOf:b.ArrayIndexOf,isType:b.isType,Enum:b.Enum,loginGlobal:b.login,logoffGlobal:b.logoff,utility:b,createEvent:function(){var a,c=[].slice.call(arguments,0);return a=arguments.length>1?b.combinationalEvent.apply(this,c):{desc:c[0]}}},d={on:function(b,c){var d=[].slice.call(arguments,0),e=this.target,f=a.base,g=f.DOMEvent.isHTMLElement(e),h=f.DOMEvent.isEventSupported(e,b),i=g&&h?f.DOMEvent.fireEvent:f.Event.fireEvent,j=g&&h?f.DOMEvent.attachEvent:f.Event.attachEvent;c&&f.isType(c,"Function")?f.each(e,function(a,b){j.apply(b,d)}):f.each(e,function(a,b){i.apply(b,d)})},once:function(a,b){var c=this;d.on.call(c,a,b),d.on.call(c,a,function(){d.off.call(c,a,b)})},off:function(a,c,d){var e=this.target,f=b.DOMEvent.isHTMLElement(e),g=a&&b.DOMEvent.isEventSupported(e,a);f&&g?b.DOMEvent.removeEvent:b.Event.removeEvent,b.each(e,function(e,g){f&&b.DOMEvent.removeEvent.call(g,a,c,d),b.Event.removeEvent.call(g,a,c,d)})}};b.blend(b.avatarCore,d),b.blend(a,c),b.init()}(beacon);;;(function (global) {
    
    function Avatar(obj) {
        this.target = obj;
    }

    var air = function (obj) {
        return new Avatar(obj);
    };
    
    air.toString    = function () { return "baishuiz@gmail.com"};
    var scripts     = document.getElementsByTagName("script")
    var selfElement = scripts[scripts.length-1];

    var core = {
            avatarCore   : Avatar.prototype,
            plugins      : {},
            attach       : function(key, fn){
                               core.plugins[key] = fn;
                           },
            baseURL      : selfElement.src.replace(/\/[^\/]+$/, '/'),
            CDNTimestamp : selfElement.getAttribute('data-CDNTimestamp') || '',
            isDebug      : false,
            init         : function () {
               global.Air = core.plugins.merge(air, core.plugins);
               core.isDebug || delete global.Air.base;
           }
    }

    var _air   = {base:core};
    global.Air = _air;
})(this);;;(function (Air) {
    var base   = Air.base || {};
    var _base = {
        /**
        * @name NEG.base.NS
        * @class [创建命名空间]
        * @param {String} NSString [要创建的命名空间，以点号隔开(Biz.Common)]
        * @param {Object} root [参数NSString的根节点，(默认是window)]
        * @return {Object} [返回创建的对象，若已存在则直接返回]
        * @example
        * NEG.base.NS("Biz.Common").ConsoleOne=function(){console.log(1);};
        * Biz.Common.ConsoleOne();
        * 结果：输出 1
        */
        NS: function (NSString, root) {
            var nsPath = NSString.split("."), ns = root || window || {}, root = ns;
            for (var i = 0, len = nsPath.length; i < len; i++) {
                ns[nsPath[i]] = ns[nsPath[i]] || {};
                ns = ns[nsPath[i]];
            };
            return ns;
        }
    };
    var attach = base.attach;
    attach("beacon", beacon);
    attach("merge" , beacon.utility.merge);
    attach("NS" , _base.NS);
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
               Air.base(jsLoader).off('load', loadCompleteHandle);
               Air.base(jsLoader).off('readystatechange', readyHandle);
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
    * @name Air.Module
    * @class [Air 模块构造器]
    * @param {String} nsString [模块命名空间]
    * @param {Function} module [模块逻辑代码]
    */
    var loaded = {}
    function _module(nsString,module) {
        "use strict"
        var _base = Air.base;
        //发布消息：模块开始构造，但未构造完成
        _base.beacon.on(_base.Require.Event.REQUIREING, { moduleName: nsString });

        //获得模块文件相对路径及文件名
        var ns = nsString.match(/(^.*)\.(\w*)$/);
        var nsPath = ns[1];
        var moduleName = ns[2];

        

        //remove multi-line comment
        var fnBody = module.toString().replace(/(?!['"])\/\*[\w\W]*?\*\//igm, '');

        //remove single line comment
        fnBody = fnBody.replace(/(['"])[\w\W]*?\1|((['"])[\w\W]*?)\/\/[\w\W]*?\2|\/\/[\w\W]*?(\r|\n|$)/g, function (str, isString) {
            return isString ? str : ''
        });


        var requireName = fnBody.replace(/^function\s*?\(\s*?([^,\)]+)[\w\W]*$/i, function(fnbody, reqName){
                              return reqName ;
                            }).replace(fnBody,'');

        var reg = requireName && new RegExp("\\b" + requireName + "\\s*\\(([^\\)]+)\\)","igm");


        var requireQueue = [];
        reg && fnBody.replace(reg, function(requireString,nsPath){
            var dependence = nsPath.replace(/['"]/g, '');
            var idependence = dependence.toLowerCase();
            loaded[idependence] || (requireQueue[idependence] = requireQueue.push(idependence) - 1);
            Air.base.Require(dependence);
        });
       

        requireQueue.length && Air.base.beacon.on(nsString, Air.base.Require.Event.LOADED, function (e,data) {
            var moduleName = data.moduleName.toLowerCase();
            if(requireQueue.hasOwnProperty(moduleName)) {
               delete requireQueue[moduleName];
               requireQueue.splice(requireQueue[moduleName], 1);
            }
            if(requireQueue.length<=0){
              Air.base.beacon.off(nsString, Air.base.Require.Event.LOADED);
              action();
            }
        });

        requireQueue.length || action();

        function action(){
            var 
                _module      = moduleName.toLowerCase(),
                _nsPath      = nsPath.toLowerCase()
                _base        = Air.base,
                ns           = _base.plugins.NS,
                activeModule = _base.plugins.NS(nsPath.toLowerCase(),_base)[_module],
                moduleAPI    = module(_base.Require,_base.run)
            ;


            if(activeModule) { //如果当前模块已作为父级节点存在
                if( typeof(moduleAPI) === 'function') {
                    ns(_nsPath,_base)[_module] = _base.merge(moduleAPI, activeModule);
                } else {
                    _base.merge(activeModule, moduleAPI);
                }
            } else {
                ns(_nsPath, _base)[_module] = moduleAPI;
            }

            //登记已经构造好的模块，并广播通知
            loaded[nsString.toLowerCase()] = true;
            _base.beacon.on(_base.Require.Event.LOADED,{moduleName:nsString});        
           
        }           

    }
    Air.base.Module = _module;
})(Air);;;(function(Air) {
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
    beacon.on(require, requireEvent.LOADED, function (e, data) {
        var moduleName = data.moduleName.toLowerCase();
        queue.required[moduleName] = true;
        queue.moduleLoaded[moduleName] = true;
        isRequireComplete() && publicDispatchCompleteEvent();
    });

    require.Event = requireEvent;
    require.isRequireComplete = isRequireComplete;
    Air.base.Require = require;
})(Air);;;(function (Air) {
    var runnerQueue = [];
    var eventer = Air.base.plugins.beacon;
    var requireEvent = Air.base.Require.Event;
    function runnerAction() {
        while (function () {
            var activeRunner = runnerQueue.shift();
            activeRunner && activeRunner();
            return runnerQueue.length;
        }()) { };
    };
    eventer(this).on(requireEvent.COMPLETE, runnerAction);

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
        this.runNow && eventer(this).on(requireEvent.LOADED, function (e, data) {
            var moduleName = data.moduleName.toLowerCase();
            requireOfRun[moduleName] = true;
            Air.base.ArrayIndexOf(requireOfRun, moduleName)>=0 && isRequireComplete() && runBody && runBody();
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
            return new me(fn, runNow);
        }
        
        var context = this;
        context.runNow = runNow;
        _run.call(context);

        //remove multi-line comment
        var fnBody = fn.toString().replace(/(?!['"])\/\*[\w\W]*?\*\//igm, '');

        //remove single line comment
        fnBody = fnBody.replace(/(['"])[\w\W]*?\1|((['"])[\w\W]*?)\/\/[\w\W]*?\2|\/\/[\w\W]*?(\r|\n|$)/g, function (str, isString) {
            return isString ? str : ''
        });

        var requireName = fnBody.replace(/^function\s*?\(\s*?([^,\)]+)[\w\W]*$/i, function(fnbody, reqName){
                              return reqName ;
                            }).replace(fnBody,'');
        var reg = requireName && new RegExp("\\b" + requireName + "\\s*\\(([^\\)]+)\\)","igm");
        var requireQueue = [];
        reg && fnBody.replace(reg, function(requireString,nsPath){
            var moduleName = nsPath.replace(/['"]/g, '');
            context.require(moduleName);
        });

        
        context.run(function(){
            fn(context.require, context.run);
        });
        
    };

    /**
    * @name Air.base.run
    * @class [Air的沙箱环境]
    * @param  {Fcuntion} fn [函数句柄]
    * @example 
    */
    Air.base.attach("run", run);
})(Air);;;(function (Air) {
    var base = Air.base.plugins;
    var openAPI = {
          run: base.run
        , iRun: function (fn) { base.run(fn,true) }
        , loadJS: base.loadJS
        , Module:Air.base.Module
        , merge:Air.base.merge
        , NS : base.NS
        , Enum : Air.base.Enum
        , domReady: base.DOMReady
        , moduleURL: Air.base.setBaseURL
        , setCDNTimestamp: Air.base.setCDNTimestamp
    };
    //Air.base.merge(Air.base.avatarCore, avatarAPI);
    base.merge(Air, openAPI);
    //beacon.logoff();
    Air.base.init();
})(Air);