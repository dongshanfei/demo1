(function(){
//全选择
    var checks = document.getElementsByClassName('check');
    var checkOne = document.getElementsByClassName('check-one');
    var checkAll = document.getElementsByClassName('check-all');
    var tr = document.getElementsByTagName('tr');
    
    for(var i = 0;i<checks.length;i++){
        checks[i].onchange = function(){
            var id = this.parentNode.parentNode.getAttribute("data-id");
            if(this.className.indexOf('check-all')>=0){
                for(var j =0;j<checks.length;j++){
                    checks[j].checked=this.checked;
                }
            }
        isCheckAll();  
        allTotal(id);  
        }
    }
//是否自动全选
    function isCheckAll(){
        var isCheckAll = true;
        for(var i = 0;i<checkOne.length;i++){
            if(checkOne[i].checked == false){
                isCheckAll = false;
            }
        }
        for(var j = 0;j<checkAll.length;j++){
            checkAll[j].checked=isCheckAll;
        }
    }

//删除单行
    for(var i = 0;i<tr.length;i++){
        tr[i].onclick = function(event){
            var _this = this;
            var e = event||window.event;
            var target = e.target||e.srcElement;
            var cls = target.className;
            var countInput = this.getElementsByClassName('count-input')[0];
            switch(cls){
                case "delete":
                var id = this.getAttribute('data-id');
                ajax({
                    method:'post',
                    url:'php/del.php',
                    data:{
                        id:id
                    },
                    success:function(data){
                        data = JSON.parse(data);
                        if(data.message == 'success'){
                            _this.remove();
                        }
                        else if(data.message=='error'){
                            alert('删除失败')
                        }
                    },
                })
                    allTotal();
                    break;
                case "add":
                    countInput.value++;
                    isReduce(this);
                    trTotal(this,countInput.value);
                    allTotal();
                    break;
                case "reduce":
                    if(countInput.value>1){
                        countInput.value--;
                        isReduce(this);
                        trTotal(this,countInput.value);
                        allTotal();
                    }
                    break;
            }
        }
    }
//减号的显示
    function isReduce(ele){
        var count = ele.getElementsByClassName('count-input')[0];
        var reduce = ele.getElementsByClassName('reduce')[0];
        if(count.value==1){
            reduce.value ="";
        }
        else{
            reduce.innerHTML="-";
        }
    }
    // console.log(count.value)
//删除全部选中的
    var delAll = document.getElementById('deleteAll');
    delAll.onclick = function(){
        var trs = [];
        var arr = [];
        for(var i = 0;i<tr.length;i++){
            if(tr[i].children[0].children[0].checked){
                arr.push(tr[i].getAttribute('data-id'));
                trs.push(tr[i]);
            }
        }
        ajax({
            method:'post',
            url:'php/del.php',
            data:{
                id:arr
            },
            success:function(data){
                data = JSON.parse(data);
                if(data.message == 'success'){
                    for(var i = 0;i<trs.length;i++){
                        console.log(trs[i]);
                        trs[i].remove();
                    }
                    allTotal();
                }

            }

        })
    }
//计算单行的价格
    function trTotal(ele,count){
        var price = ele.getElementsByTagName('td')[2].innerHTML;
        var total = ele.getElementsByTagName('td')[4];
        total.innerHTML = (price*count).toFixed(2);
    }
//计算总价
    function allTotal(id){
        var priceTotal = document.getElementById('priceTotal');
        var selectedTotal = document.getElementById('selectedTotal');
        var selectedCount = 0;
        var total = 0;
        ajax({
            method:'post',
            url:'php/getTotal.php',
            data:{
                id:id
            },
            beforeSend:function(){
                for(var i = 0;i<checks.length;i++){
                    checks[i].disabled=true;
                }
            },
            complete:function(){
                for(var i = 0;i<checks.length;i++){
                    checks[i].disabled = false;
                }
            },
            success:function(data){
                data = JSON.parse(data);
                priceTotal.innerHTML = data.price;
                selectedTotal.innerHTML = data.count;
            }

        })
        
    }
//添加ajax函数
    function ajax(opt){
            opt.method = opt.method.toUpperCase()||"POST";
            opt.url = opt.url||"";
            opt.data = opt.data||{};
            opt.async = opt.async||true;
            opt.success = opt.success||function(){};
            opt.error = opt.error||function(){};
            opt.complete = opt.complete||function(){};
            opt.beforeSend = opt.beforeSend||function(){};
            var xhr;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            var params = [];
            for(var i in opt.data){
                params.push(i+"="+opt.data[i]);
            }
            var data = params.join('&');
            opt.beforeSend();
            if(opt.method == "POST"){
                xhr.open('POST',opt.url,opt.async);
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xhr.send(data);
            }else{
                xhr.open("GET",opt.url+"?key="+Math.random()+"&"+data,opt.async);
                xhr.send();
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                   // setTimeout(opt.complete,2000);
                    opt.complete();
                    if(xhr.status==200){
                        //setTimeout(function(){
                            opt.success(xhr.responseText);
                        //}, 2000)
                        // opt.success(xhr.responseText);
                    }else if(xhr.status == 404){
                        //xhr.statusText错误信息
                        opt.error(xhr.statusText);
                    }
                }
            }
        }

}())
