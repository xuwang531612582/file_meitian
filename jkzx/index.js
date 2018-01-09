var id_search = document.getElementById('search');
    var class_button = document.getElementsByClassName('button')[0];
    var class_code = document.getElementsByClassName('code');
    class_button.onclick = function(){
        for(var i= 0;i<class_code.length;i++){
            if(class_code[i].innerText == id_search.value)
            console.log(class_code[i].parent);
        }
    }