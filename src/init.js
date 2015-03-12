;(function (Air) {
    
    var openAPI = {
        run: Air.base.run
       , iRun: function (fn) { Air.base.run(fn,true) }
        /**
        * @name Air.on
        * @class [事件监听及广播]
        * @param {Object} eventName   [事件名]
        * @param {*} option [事件句柄 或 事件处理参数]
        */
        //, on: Air.base.Event.publicDispatchEvent
        ,on : function(){
                var hostProxy = {};
                var base = Air.base;
                var isType = base.isType;
                var publicDispatchEvent = base.Event.publicDispatchEvent;
                var addEventListener = base.Event.addEventListener;
                
                var _on = function(eventName,option){
                    var args = [].slice.call(arguments,0);
                    if (option && base.isType(option, 'Function')) {
                        args.unshift(hostProxy);
                        addEventListener.apply(hostProxy,args);
                    } else {
                        publicDispatchEvent.apply(hostProxy,args);
                    }   
                }
                return _on;         
        }(Air)
        , loadJS: Air.base.BOM.loadJS
        , Module:Air.base.Module
        , merge:Air.base.merge
        , NS : Air.base.NS
        , ArrayIndexOf : Air.base.ArrayIndexOf
        , isType : Air.base.isType
        , encodeHTML : Air.base.encodeHTML
        , decodeHTML : Air.base.decodeHTML
        , Enum : Air.base.Enum
        , documentWriteScript: Air.base.documentWriteScript
        , domReady: Air.base.BOM.DOMReady
        , moduleURL: Air.base.setBaseURL
        , setCDNTimestamp: Air.base.setCDNTimestamp
        , trim : Air.base.trim
        , queryStringBuilder : Air.base.queryStringBuilder
    }
       , avatarAPI = {
           /**
           * @name Air(id).on
           * @class [具体对象的事件绑定]
           * @param {Object} eventName   [事件名]
           * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
           * @param {Object} option      [配置选项]
           * @example
           * Air("body").on("load",function(){console.info("i am ready");},{});
           * 结果：在onload时间后 输出 i am ready
           */
           on: function (eventType, eventHandle, option) {


             var target = this.target
                , base = Air.base
                , addEventListener = (base.BOM.Utility.isHTMLElement(target) && base.BOM.Event.isEventSupported(target,eventType)) ?
                //, addEventListener = base.BOM.Utility.isHTMLElement(target) ?
                                        base.BOM.Event.addEventListener :
                                        base.Event.addEventListener
                                       
                , dispatchEvent = (base.BOM.Utility.isHTMLElement(target) && base.BOM.Event.isEventSupported(target, eventType)) ?
                //, dispatchEvent = base.BOM.Utility.isHTMLElement(target) ?
                                    base.BOM.Event.dispatchEvent :
                                    base.Event.dispatchEvent

                
             if (arguments.length==1){
                base.each(target,function(i,target){
                    dispatchEvent(target, eventType); 
                });                     
             }else {
                base.each(target,function(i,target){
                    addEventListener(target, eventType, eventHandle, option); 
                });                                     
             }

                
              /*
              Air.base.BOM.Selector(target).each(function(i,el){
                   addEventListener(el, eventType, eventHandle, option); 
                });*/
           }, 
           /**
           * @name Air(id).off
           * @class [具体对象 事件移除]
           * @param {Object} eventName   [事件名]
           * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
           * @param {Object} option      [配置选项]
           * @example
           * var fn=function(){};
           * Air("body").off("load",fn,{});
           */
           off: function (eventType, eventHandle, option) {
               if(arguments.length<=0){return}
               var target = this.target
                   , base = Air.base
                   , removeEventListener = (base.BOM.Utility.isHTMLElement(target) && base.BOM.Event.isEventSupported(target,eventType))
                                         ? base.BOM.Event.removeEventListener
                                         : base.Event.removeEventListener

                base.each(target,function(i,target){
                    removeEventListener(target, eventType, eventHandle, option);
                }); 
           }
       };
    Air.base.merge(Air.base.avatarCore, avatarAPI);
    Air.base.merge(Air, openAPI);
    Air.base.init();
})(Air);