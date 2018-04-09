(function(){
    function w() {
        var r = document.documentElement;
        var a = r.getBoundingClientRect().width;
        if (a > 640 ){
            a = 640;
        } 
        //750/w = 100/font-size
        rem = a / 6.4;
        r.style.fontSize = rem + "px"
    }
    var t;
    w();
    window.addEventListener("resize", function() {
        clearTimeout(t);
        t = setTimeout(w, 300);
    }, false);
})();
