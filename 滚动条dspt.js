
$(function(){
    var warp_len = $("#xn_c_about_1_warp");
    if(warp_len.length > 0){
        var Bool=false;
        var Scro=$("#about_1_scroll");
        var Scrp=$("#about_1_p");
        var Scrobd=$("#about_c_bd");
        var Scroul=$("#xn_c_about_1_warp");
        var Scrp_Height =Scrp.outerHeight()/2;
        var Num2=Scro.outerHeight()-Scrp.outerHeight();
        var offsetX=0;
        var offsetY=0;
        Scrp.mousedown(function(e){  
            Bool=true;
        });
        $(document).mouseup(function(){
            Bool=false;
        });
        $(document).mousemove(function(e){
            if(Bool){
                var Num1= e.clientY - Scro.position().top;
                var y=Num1 - Scrp_Height;
                if(y<=1){
                    Scrll(0);
                    Scrp.css("top",1);
                }else if(y>=Num2){
                    Scrp.css("top",Num2);
                    Scrll(Num2);
                }else{
                    Scrll(y);
                }
            }
        });
        function Scrll(y){
            Scrp.css("top",y);
            Scroul.css("margin-top",-(y/(Scro.outerHeight()-Scrp.outerHeight()))*(Scroul.outerHeight()-Scrobd.height()));
        }
        if(document.getElementById("about_1_scroll_bd").addEventListener)
        document.getElementById("about_1_scroll_bd").addEventListener('DOMMouseScroll',wheel,true);
        document.getElementById("about_1_scroll_bd").onmousewheel=wheel;
        var Distance=Num2*0.1;
        function wheel(e){
            var evt = e || window.event;
            var wheelDelta = evt.wheelDelta || evt.detail;
            if(wheelDelta == -120 || wheelDelta == 3){
                var Distances=Scrp.position().top+Distance;
                if(Distances>=Num2){
                    Scrp.css("top",Num2);
                    Scrll(Num2);
                }else{
                    Scrll(Distances);
                }
                return false;
            }else if (wheelDelta == 120 || wheelDelta == -3){
                var Distances=Scrp.position().top-Distance;
                if(Distances<=1){
                    Scrll(0);
                    Scrp.css("top",1);
                }else{
                    Scrll(Distances);
                }
                return false;
            }   
        }
    }
});
