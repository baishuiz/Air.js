;(function (Air) {
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