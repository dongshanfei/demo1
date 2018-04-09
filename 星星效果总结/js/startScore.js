
function scoreFun(object, opts) {
    var defaults = {
        fen_d: 16,
        ScoreGrade: 10,
        types: ["差评", "差评", "差评", "差评", "差评", "差评", "差评", "中评", "中评", "好评"],
        nameScore: "fenshu",
        parent: "star_score",
        attitude: "attitude",
        scoreInput:'get_score_input',
        nowScore:0
    };
    options = $.extend({}, defaults, opts);
    var countScore = object.find("." + options.nameScore);
    var startParent = object.find("." + options.parent);
    var atti = object.find("." + options.attitude);
    var inputScore = object.find("." + options.scoreInput);
    var now_cli;
    var fen_cli;
    var atu;
    var fen_d = options.fen_d;
    var len = options.ScoreGrade;
    var nowScore = Number(options.nowScore);
    startParent.width(fen_d * len);
    var preA = (5 / len);
    
    for (var i = 0; i < len; i++) {
        var newSpan = $("<a href='javascript:void(0)'></a>");
        newSpan.css({
            "left": 0,
            "width": fen_d * (i + 1),
            "z-index": len - i
        });
        newSpan.appendTo(startParent);
    }

	if(nowScore>0){
		now_cli =nowScore*2-1;
    	showFirst(nowScore*2-1,startParent.find('a').eq(nowScore*2-1));
    	if(now_cli>=0){
    		console.log(now_cli);
    		var scor = preA * (parseInt(now_cli) + 1);
    		console.log(scor);
    		if(inputScore){
            	 inputScore.val(scor);             	 
            }
    	}
    }
    startParent.find("a").each(function(index, element){
        $(this).click(function() {
            now_cli = index;
            show(index, $(this));        
        });
        $(this).mouseenter(function() {
            show(index, $(this));
        });
        $(this).mouseleave(function() {
            if (now_cli >= 0) {
                var scor = preA * (parseInt(now_cli) + 1);
                startParent.find("a").removeClass("clibg");
                startParent.find("a").eq(now_cli).addClass("clibg");
                var ww = fen_d * (parseInt(now_cli) + 1);
                startParent.find("a").eq(now_cli).css({
                    "width": ww,
                    "left": "0"
                });
                if (countScore) {
                    countScore.text(scor);
                }
                if(inputScore){
                	 inputScore.val(scor); 
                }
                if(atti){
                	atti.text("");
                }
                
            } else {
                startParent.find("a").removeClass("clibg");
                if (countScore) {
                    countScore.text(scor);
                }
                if(atti){
                	atti.text("");
                }
                if(inputScore){
                	 inputScore.val("");
                }
                
            }
        })
    });
	function showFirst(num,obj) {
        var n = parseInt(num) + 1;
        var lefta = num * fen_d;
        var ww = fen_d * n;
        var scor = preA * n;
        console.log(obj);
        atu = options.types[parseInt(num)];
        startParent.find("a").removeClass("clibg");
        obj.addClass("clibg");
        obj.css({
            "width": ww,
            "left": "0"
        });
        countScore.text(scor);  
    }
    function show(num,obj) {
        var n = parseInt(num) + 1;
        var lefta = num * fen_d;
        var ww = fen_d * n;
        var scor = preA * n;
        atu = options.types[parseInt(num)];
        object.find("a").removeClass("clibg");
        obj.addClass("clibg");
        obj.css({
            "width": ww,
            "left": "0"
        });
        countScore.text(scor);       
        atti.text(atu);       
    }
};