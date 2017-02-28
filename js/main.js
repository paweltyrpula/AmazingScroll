//************************************
//            ANIMATION

animationList = {
    'fade-left': {
        'data':`left:-300px->0;
                transition:->all 1s`
    }
}

// animationAdd('fade-left','left:-300px->0,transition:->all 1s');

//          END ANIMATION
//************************************

const codeLine = document.querySelectorAll('.code-line');
[...codeLine].forEach((e) => {
    const code = e.innerHTML;
    const codeTab = code.split("=");
    let content = "";
    for(var i = 0; i < codeTab.length; i++){
        if(i%2 === 0)
            content += "<span class='purple'>" + codeTab[i] + "</span> = ";
        else {
            content += "<span class='blue'>" + codeTab[i] + "<br>";
        }
    }
    e.innerHTML = content;
})
