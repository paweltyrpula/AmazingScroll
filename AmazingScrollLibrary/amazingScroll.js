
"use strict";

const asElement = function (element, animation) {
    let self = {};
    const startElement = animation.getStartStyle(),
        finishElement = animation.getFinishStyle();
    self.init = function (){
        self.startStyle();
        self.addScrollEvent();
        self.addRetryFunction();
    };

    self.startStyle = function() {
        startElement.forEach((o) => {
            element.style[o.element] = o.value;
        });
    };

    self.animate = function() {
        finishElement.forEach((o) => {
            element.style[o.element] = o.value;
        });
    }

    self.position = function () {
        return element.getBoundingClientRect().top / window.innerHeight;
    }

    self.addScrollEvent = function() {
        window.addEventListener('scroll', () => {
            if (self.position() < 0.75) {
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

let animationList = {};
function animationAdd(name, data) {
    animationList[name] = {
        "data": data
    }
};

const animation = function (data) {
    let self = {},
        startStyle = [],
        finishStyle = [];

    self.init = function () {
        if(animationList[data])
            data = animationList[data].data;
        let tab = [];
        tab = data.split(';');
        tab.forEach((e) => {
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
        const dataAs = document.querySelectorAll('[data-as]');
        [...dataAs].forEach((e) => {
            const data = e.dataset.as;
            if ((e.getBoundingClientRect().top / window.innerHeight) >= 1) {
                new asElement(e, new animation(data));
            }
        });
    }
});
