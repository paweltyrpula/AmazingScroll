"use strict";
var AmazingScroll = function (config_user) {
    var self = {};
    var config = {
        start: {
            ratio: (config_user && config_user.start && config_user.start.ratio)?config_user.start.ratio:0.75,
            dataName: (config_user && config_user.start && config_user.start.dataName)?config_user.start.dataName:"as",
            visibleAfterLoading: (config_user && config_user.start && config_user.start.visibleAfterLoading)?config_user.start.visibleAfterLoading:false,
            waitForScroll: {
                on: (config_user && config_user.start && config_user.start.waitForScroll && config_user.start.waitForScroll.on)?config_user.start.waitForScroll.on:true,
                ratio: (config_user && config_user.start && config_user.start.waitForScroll && config_user.start.waitForScroll.ratio)?config_user.start.waitForScroll.ratio:1,
                delay: (config_user && config_user.start && config_user.start.waitForScroll && config_user.start.waitForScroll.delay)?config_user.start.waitForScroll.delay:200,
            }
        },
        animation: (config_user && config_user.animation)?config_user.animation:false
    }

    var asElement = function (element, animation) {
        var self = {};
        var startElement = animation.getStartStyle(),
            finishElement = animation.getFinishStyle();

        self.init = function (){
            self.startStyle();
            self.addScrollEvent();
            self.addRetryFunction();
            self.startAnimate();
        };

        self.startStyle = function() {
            startElement.forEach(function(o) {
                element.style[o.element] = o.value;
            });
        };

        self.animate = function() {
            finishElement.forEach(function(o) {
                element.style[o.element] = o.value;
            });
        }

        self.startAnimate = function() {
            if(!config.start.waitForScroll.on && self.position() < config.start.waitForScroll.ratio)
                setTimeout(function() {
                    self.animate();
                }, config.start.waitForScroll.delay)
        }

        self.position = function () {
            return element.getBoundingClientRect().top / window.innerHeight;
        }

        self.addScrollEvent = function() {
            window.addEventListener('scroll', function() {
                if (self.position() < config.start.ratio) {
                    self.animate();
                }
            });
        };

        self.addRetryFunction = function() {
            element.asRetry = function() {
                self.startStyle();
                setTimeout(function() {
                    self.animate();
                },0);
            }
        };

        self.init();

        return self;
    }

    var animationList = {};
    function animationAdd(name, data) {
        animationList[name] = {
            "data": data
        }
    };

    var animation = function (data) {
        var self = {},
            startStyle = [],
            finishStyle = [];

        self.init = function () {
            if(config.animation[data])
                data = config.animation[data];
            var tab = [];
            tab = data.split(';');
            tab.forEach(function(e) {
                if(e.indexOf(':') > -1) {
                    createStartStyle(e);
                    createFinishStyle(e);
                }
            });
        }

        var createStartStyle = function(e) {
            var styleS = {};

            styleS["element"] = e.split(":")[0].replace(/\s*/gi, "");
            styleS["value"] = e.split(":")[1].split("->")[0];

            if(styleS.element !== undefined && styleS.value !== undefined)
                startStyle.push(styleS);
        }

        var createFinishStyle = function(e) {
            var styleF = {};

            styleF["element"] = e.split(":")[0].replace(/\s*/gi, "");
            styleF["value"] = e.split(":")[1].split("->")[1];

            if(styleF.element !== undefined && styleF.value !== undefined)
                finishStyle.push(styleF);
        }

        self.getStartStyle = function() {
            return startStyle;
        }

        self.getFinishStyle = function() {
            return finishStyle;
        }

        self.init();

        return self;
    }

    self.init = function() {
        document.addEventListener('DOMContentLoaded', function() {
            if (document.querySelector('[data-' + config.start.dataName + ']')) {
                var dataAs = document.querySelectorAll('[data-' + config.start.dataName + ']');
                var tab = [];
                for(var i = 0; i < dataAs.length; i++){ tab[i] = dataAs[i]}
                tab.forEach(function(e) {
                    var data = e.dataset[config.start.dataName];
                    if ((e.getBoundingClientRect().top / window.innerHeight) >= 1 && !config.start.visibleAfterLoading) {
                        asElement(e, animation(data));
                    }
                    else if(config.start.visibleAfterLoading){
                        asElement(e, animation(data));
                    }
                });
            }
        });
    }

    self.init();

    return self;
}
