;(function (global) {
    
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
            init         : function (openAPI) {
               global.Air = core.plugins.merge(air, openAPI);
               //core.isDebug || delete global.Air.base;
           }
    }

    var _air   = {base:core};
    global.Air = _air;
})(this);