;(function (Air) {
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
})(Air);