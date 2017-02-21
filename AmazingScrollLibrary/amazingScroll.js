"use strict";

 var asElement = function (element, animation) {
    let self = {};

    self.cl = function (){
        console.log("działa");
    }

    return self;
}

var animationSet = new Set();

var animation = function (data) {
    var self = {},
        startStyle = [],
        finishStyle = [];

    self.init = function () {
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
        animationSet.add(this);
    }

    self.getStartStyle = function() {
        return startStyle;
    }

    self.init();

    return self;
}

if (document.querySelector('[data-as]')) {
    document.querySelectorAll('[data-as]').forEach(function(e) {
        var data = e.dataset.as;
        var data2 = e.dataset.as.split(",");
        var anim = new animation(data);
        var startElement = anim.getStartStyle();
        if ((e.getBoundingClientRect().top / window.innerHeight) >= 1) {
            for (var i = 0; i < startElement.length; i++) {
                e.style[startElement[i].element] = startElement[i].value;
            }
            window.addEventListener('scroll', function() {
                if ((e.getBoundingClientRect().top / window.innerHeight) < 0.75) {
                    for (var i = 0; i < data2.length; i++) {
                        var el = data2[i].split(":")[0].replace(/\s*/gi, "");
                        var val1 = data2[i].split(":")[1].split("->")[0];
                        var val2 = data2[i].split(":")[1].split("->")[1];
                        if (val2 !== undefined)
                            e.style[el] = val2;
                        else
                            e.style[el] = val1;
                    }
                }
            })
        }
    });
}
