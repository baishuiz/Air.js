;(function (Air) {
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
})(Air);