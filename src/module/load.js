;(function (moduleName, Air) {
    
    function Loader(jsURL, completeHandle){
        var jscount = 1;
        this.loadJS = function(){
            if(/\bArray\b/.test(Object.prototype.toString.call(jsURL))){
                jscount = jsURL.length;
                for (var i = jscount - 1; i >= 0; i--) {
                    _loadJs(jsURL[i], function(){
                        --jscount || completeHandle();
                    });
                };
            }else{
                _loadJs(jsURL, completeHandle);
            }
        };
    }

    function JSLoader(){
        var jsQueue = [];
        jsQueue.currentJs = null;

        this.loadJS = function(jsURL, completeHandle){
            var fixHandle = function(){
                jsQueue.currentJs = null;
                completeHandle && completeHandle();
                startLoad();
            };                
            jsQueue.push(new Loader(jsURL, fixHandle));
            startLoad();            
            return this;
        };

        function startLoad(){
            if(!jsQueue.currentJs){
                jsQueue.currentJs = jsQueue.shift();
                jsQueue.currentJs && jsQueue.currentJs.loadJS();
            }        
        }        

    }


    function _loadJs(jsURL, completeHandle) {
        var head = document.getElementsByTagName('head')[0]
           , jsLoader = document.createElement('script')
           , isComplate = false
           , beacon = Air.base.plugins.beacon
           , isExisted
           , loadCompleteHandle = function () {
               isComplate = true;
               beacon(jsLoader).off('load');
               beacon(jsLoader).off('readystatechange');
               loadCompleteHandle = function () { };
               completeHandle && completeHandle();
           }
           , readyHandle = function () {
               if (/loaded|complete/.test(jsLoader.readyState) && isComplate == false) {                 
                    loadCompleteHandle();                 
               }
           };
        jsLoader.async = true;
        jsLoader.setAttribute("type", "text/javascript");
        jsLoader.src = jsURL;
        beacon(jsLoader).on('load', loadCompleteHandle);
        beacon(jsLoader).on('readystatechange', readyHandle);
        beacon(jsLoader).on('error', loadCompleteHandle);


        //var jsList = [].slice.call(document.getElementsByTagName("script"));
        var jsList = document.getElementsByTagName("script");
        for (var i = 0, len = jsList.length; !isExisted && i < len; i++) {
            isExisted = jsURL == jsList[i].getAttribute("src");
        };

        isExisted || head.appendChild(jsLoader);
    };

    function loadJs(jsURL, completeHandle){
        var jsLoader = new JSLoader();
        jsLoader.loadJS(jsURL, completeHandle);
        return jsLoader;
    }



    /**
    * @name Air.base.BOM.LoadJS
    * @class [JS 加载器]
    * @name Air.Loader
    * @param {String} jsURL [js地址（暂时只支持绝对地址）]
    * @param {Function} completeHandle [回调函数]
    */
    Air.base.attach(moduleName, loadJs);
})("loadJS", Air);