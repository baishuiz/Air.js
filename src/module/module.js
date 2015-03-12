;(function(Air) {
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
                ns           = _base.NS,
                activeModule = _base.NS(nsPath.toLowerCase(),_base)[_module],
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
})(Air);