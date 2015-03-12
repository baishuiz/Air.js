;(function(Air) {
    //var publicDispatchEvent = Air.base.Event.publicDispatchEvent;

    //定义事件
    var requireEvent = {
            COMPLETE : 'require_complete_' + ~~new Date()
           , LOADED: 'require_loaded_' + ~~new Date()
           , REQUIREING: 'require_requireing_' + ~~new Date()
        };

    //定义队列    
    var queue = {
            requiring : {} //正在加载的模块
           ,required : {}  //已加载完毕但未构造的模块
           ,moduleLoaded : {} //加载并构造完毕的模块
           ,requireQueue : []  //模块加载意向清单
        };


    //监听模块加载状态，当模块通过 require 方法以外的其他形式加载时，应通过此事件通知require 记录
    Air.base.beacon.on(queue, requireEvent.REQUIREING, function (e, data) {
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
            //if(!Air.base.NS('ModuleLoaded',Air.base)[queue.requireQueue[i]]){
            var module = queue.requireQueue[i];    
            if(!queue.moduleLoaded[module]){    
                return false;
            }
        };
        return true;
    }

     
    function publicDispatchCompleteEvent() { //此方法待重构
        Air.base.beacon.on(requireEvent.COMPLETE);
        Air.base.beacon(document).on('readystatechange'); //for 蓝线与红线之间的Air.domReady 
        publicDispatchCompleteEvent = function () {
            Air.base.beacon.on(requireEvent.COMPLETE);
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
            return Air.base.NS(module,Air.base);
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
                Air.base.BOM.loadJS(url, function () {
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
            //return queue.required[module] || queue.requiring[module] || Air.base.NS('ModuleLoaded',Air.base)[module];
            return queue.required[module] || queue.requiring[module] || queue.moduleLoaded[module];
        }


        
        startLoad(module); //尝试启动加载
        return Air.base.NS(module,Air.base);
    };


    //监听模块加载状态，当模块加载并构造完毕时出发回调
    Air.base.beacon.on(require, requireEvent.LOADED, function (e, data) {
        var moduleName = data.moduleName.toLowerCase();
        queue.required[moduleName] = true;
        queue.moduleLoaded[moduleName] = true;
        isRequireComplete() && publicDispatchCompleteEvent();
    });

    require.Event = requireEvent;
    require.isRequireComplete = isRequireComplete;
    Air.base.Require = require;
})(Air);