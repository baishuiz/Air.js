;(function (Air) {

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
                ns[nsPath[i]] = ns[nsPath[i]] === undefined ? {} : ns[nsPath[i]];
                ns = ns[nsPath[i]];
            };
            return ns;
        },

        beacon : beacon,
        merge  : beacon.utility.merge,

        /**
        * @param {String|Object} url baseURL
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
    _base.merge(Air.base.plugins, _base);
})(Air);