;(function($){
    $.fn.changeFont = function(opt){
        var defaults = {
            color:'red',
            fontSize:'12px',
            fontWeight:'normal',
            fontStyle:'normal'
    }
    // var settings = $.extend({},defaults,opt)
    var settings = $.extend(defaults,opt)
    this.css({
        'color':settings.color,
        'fontSize':settings.fontSize,
        'fontWeight':settings.fontWeight,
        'fontStyle':settings.fontStyle
    })
    return this;
    }
}(jQuery))