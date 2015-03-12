;(function (Global) {
    var air = function (obj) {
        return new avatar(obj);
    };

    function avatar(obj) {
        this.target = obj;
    }

    var scripts = document.getElementsByTagName("script")
    var selfElement = scripts[scripts.length-1];
    var base = {
        avatarCore: avatar.prototype
           ,base: _air
           , baseURL: selfElement.src.replace(/\/[^\/]+$/, '/')  || [$baseURL$]
           , CDNTimestamp: selfElement.getAttribute('data-CDNTimestamp') || ''
           ,isDebug:'[$isDebug?$]'
           ,init: function () {
               Global.Air = air.base.merge(air, _air);
               base.isDebug || delete Global.Air.base;
           }
    }

    var _neg = {base:base};
    air.base = base;
    air.toString = function () { return "baishuiz@gmail.com"};
    Global.Air = _air;
})(this);