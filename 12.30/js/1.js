window.onload = function(){
    var loEnter = document.getElementById('loEnter');
    var regisEnter = document.getElementById('regisEnter');
    var denglukuang = document.getElementById('denglukuang');
    var zhucekuang = document.getElementById('zhucekuang');
    var biaoji = document.getElementById('biaoji');
    var back = document.getElementById('back');
    var timer;
    var aa = 0;
    //登录框
    loEnter.onclick = function(){
        clearInterval(timer);
        denglukuang.style.display="block"
        denglukuang.style.left="0"
        back.style.display="block"
        timer = setInterval(function(){
            aa+=5;
            denglukuang.style.left=aa+"px"
            console.log(aa);
            if(aa == 1200){
                clearInterval(timer);
            }
        },10)
    }
    //小×号
    biaoji.onclick = function(){
        clearInterval(timer);
        aa+=5;
        denglukuang.style.left=aa+"px";
        back.style.display="none"
        timer = setInterval(function(){
            aa+=5;
            denglukuang.style.left=aa+"px"
            console.log(aa);
            if(aa >3000){
                clearInterval(timer);
                aa=0;
            }
        },10)
    }
    //注册框
     regisEnter.onclick = function(){
        clearInterval(timer);
        denglukuang.style.display="block"
        denglukuang.style.left="0"
        back.style.display="block"
        timer = setInterval(function(){
            aa+=5;
            denglukuang.style.left=aa+"px"
            console.log(aa);
            if(aa == 1200){
                clearInterval(timer);
            }
        },10)
    }
}
