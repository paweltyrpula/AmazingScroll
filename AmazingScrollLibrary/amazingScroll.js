
"use strict";

 var asElement = function (element, animation) {
    let self = {};
    let startElement = animation.getStartStyle();
    let finishElement = animation.getFinishStyle();
    self.init = function (){
        self.startStyle();
        self.addScrollEvent();
        self.addRetryFunction();
    };

    self.startStyle = function() {
        element.style['transition'] = "all 0s";
        for (var i = 0; i < startElement.length; i++) {
            element.style[startElement[i].element] = startElement[i].value;
        }
        return true;
    };

    self.animate = function() {
        for (var i = 0; i < finishElement.length; i++) {
            element.style[finishElement[i].element] = finishElement[i].value;
        }
    }
    
    self.addScrollEvent = function() {
        window.addEventListener('scroll', function() {
            if ((element.getBoundingClientRect().top / window.innerHeight) < 0.75) {
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
        if(animationList[data])
            data = animationList[data].data;
        let tab = [];
        tab = data.split(',');
        tab.forEach(function(e) {
            let styleS = {},
                styleF = {};
            styleS["element"] = e.split(":")[0].replace(/\s*/gi, "");
            styleS["value"] = e.split(":")[1].split("->")[0];
            if(styleS.element !== undefined && styleS.value !== undefined)
                startStyle.push(styleS);

            styleF["element"] = e.split(":")[0].replace(/\s*/gi, "");
            styleF["value"] = e.split(":")[1].split("->")[1];
            if(styleF.element !== undefined && styleF.value !== undefined)
                finishStyle.push(styleF);
        });
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

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('[data-as]')) {
        var element = document.querySelectorAll('[data-as]')
        for(var i = 0; i < element.length; i++){
            var data = element[i].dataset.as;
            if ((element[i].getBoundingClientRect().top / window.innerHeight) >= 1) {
                new asElement(element[i],new animation(data));
            }
        }
    }
});

animationAdd('fade-left','left:-300px->0,transition:->all 1s');