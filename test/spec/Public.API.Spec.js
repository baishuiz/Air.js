//var jsurl = "./src/toBeLoad.js";
var jQueryUrl = "./src/jquery-1.7.2.min.js";
var cssurl = "./src/toBeLoad.css";

describe("Air.on", function () {
    
});

describe("Air.run", function () {
    beforeEach(function () {

    });

    it("[Air.run] 调用Run之前，会等待Require操作执行完毕", function () {
        var msg = "loadBefore";
        expect(msg).toBe("loadBefore");
        Air.run(function (require) {
            var a = require("Utility.Cookie");
            
                msg = "loadComplete";
            
            
            waits(2000);
            runs(function () {
                expect(msg).toBe("loadComplete");
            });
        });
    });
});

describe("Air.loadJS", function () {
    beforeEach(function () {

    });

    it("[Air.loadJS] 异步载入js并立即执行", function () {
        Air.loadJS(jsurl);
        var isLoad = 1;
        expect(isLoad).toEqual(1);
    });

    it("[Air.loadJS] 如果同一个文件，多次执行loadJS，那么只会加载一次", function () {
        Air.loadJS(jsurl);
        var isLoad = 1;
        expect(isLoad).toEqual(1);

        Air.loadJS(jsurl);
        isLoad = 1;
        expect(isLoad).toEqual(1);
    });

    it("[Air.loadJS] 加载完JS文件并执行之后，会调用回调函数", function () {
        var msgaa = "loadBefore";
        //expect(msg).toBe("loadBefore");
        Air.loadJS(jsurl, function () {
            msgaa = "loadComplete";
            // console.log(1,msg)

        });
        
        waits(3000);
        runs(function () {
            expect(msgaa).toBe("loadComplete");
            //console.log(2,msg)
        });
    });
});
    





describe("Air.moduleURL", function () {
    it("获取NEG当前路径", function () {
        var oldURL = Air.moduleURL();
        expect(Air.moduleURL("a")).toEqual('a');
        expect(Air.moduleURL(oldURL)).toEqual(oldURL);
        expect(Air.moduleURL()).toEqual(oldURL);
    });
});