"use strict";

if (document.querySelector('[data-as]')) {
    document.querySelectorAll('[data-as]').forEach(function(e) {
        var data = e.dataset.as.split(',');
        console.log(data);
        if ((e.getBoundingClientRect().top / window.innerHeight) >= 1) {
            for (var i = 0; i < data.length; i++) {
                var el = data[i].split(":")[0].replace(/\s*/gi, "");
                var val1 = data[i].split(":")[1].split("->")[0];
                var val2 = data[i].split(":")[1].split("->")[1];
                e.style[el] = val1;
            }
            window.addEventListener('scroll', function() {
                if ((e.getBoundingClientRect().top / window.innerHeight) < 0.75) {
                    for (var i = 0; i < data.length; i++) {
                        var el = data[i].split(":")[0].replace(/\s*/gi, "");
                        var val1 = data[i].split(":")[1].split("->")[0];
                        var val2 = data[i].split(":")[1].split("->")[1];
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
