document.querySelectorAll('.code-line').forEach(function(e){
    let code = e.innerHTML;
    let codeTab = code.split("=");
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
