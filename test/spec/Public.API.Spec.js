var jsurl = "../test/test.js";



describe("Air.run", function () {

    it("[Air.run] 调用Run之前，会等待Require操作执行完毕", function (done) {
        var msg = "loadBefore";
        expect(msg).toBe("loadBefore");
        Air.moduleURL("../")
        Air.run(function (require) {
            var a = require("test.testModule2");
                msg = "loadComplete";
                expect(msg).toBe("loadComplete");
                expect(a.result).toBe("ok");
                console.log("==============okok")
                done();
        });
    });


    it("Air.Module 中存在依赖模块", function (done) {
        var msg = "loadBefore";
        expect(msg).toBe("loadBefore");
        Air.moduleURL("../")
        Air.run(function (require) {
            var a = require("test.testModule2");
                msg = "loadComplete";
                expect(msg).toBe("loadComplete");
                expect(a.result).toBe("ok");
                console.log(a,123)
                done();
        });
    })
});



describe("Air.loadJS", function () {
    it("加载完JS文件，调用回调函数", function (done) {
        var msg = "loadBefore";
        Air.loadJS(jsurl, function () {
            msg = "loadComplete";
            expect(msg).toEqual("loadComplete");
            expect(window.onlyOne).toEqual(1);
            done();
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

    it("设置URLMap 及 远程加载", function (done) {
        Air.moduleURL({
            base: "../",
            subPath: location.href.replace(/\/_.+\.html.*$/, '/') + "../test/subFolder/"
        });
        Air.run(function (require) {
            var a = require("test.testModule");
            var b = require("test.testModule4", "{{subPath}}testModule4.js");

            expect(a.result).toBe("okok");
            expect(b.result).toBe("ok4");
            done();
        });
    });
});
