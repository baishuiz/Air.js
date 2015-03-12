;(function (Air) {
    var openAPI = {
          run: Air.base.run
        , iRun: function (fn) { Air.base.run(fn,true) }
        , loadJS: Air.base.BOM.loadJS
        , Module:Air.base.Module
        , merge:Air.base.merge
        , NS : Air.base.NS
        , Enum : Air.base.Enum
        , domReady: Air.base.BOM.DOMReady
        , moduleURL: Air.base.setBaseURL
        , setCDNTimestamp: Air.base.setCDNTimestamp
    };
    //Air.base.merge(Air.base.avatarCore, avatarAPI);
    Air.base.merge(Air, openAPI);
    Air.base.beacon = beacon;
    beacon.logoff();
    Air.base.init();
})(Air);