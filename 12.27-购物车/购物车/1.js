(function(){
//全选择
    var checks = document.getElementsByClassName('check');
    var checkOne = document.getElementsByClassName('check-one');
    var checkAll = document.getElementsByClassName('check-all');
    var tr = document.getElementsByTagName('tr');
    for(var i = 0;i<checks.length;i++){
        checks[i].onchange = function(){
            if(this.className.indexOf('check-all')>=0){
                for(var j =0;j<checks.length;j++){
                    checks[j].checked=this.checked;
                }
            }
        isCheckAll();  
        allTotal();  
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
            var e = event||window.event;
            var target = e.target||e.srcElement;
            var cls = target.className;
            var countInput = this.getElementsByClassName('count-input')[0];
            switch(cls){
                case "delete":
                    this.remove();
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
        if(count.value){
            reduce.value ="";
        }
        else{
            reduce.innerHTML="-";
        }
    }
//删除全部选中的
    var delAll = document.getElementById('deleteAll');
    delAll.onclick = function(){
        for(var i =0;i<tr.length;i++){
            if(tr[i].children[0].children[0].checked){
                tr[i].remove();
                i--
            }
        }
        allTotal();
    }
//计算单行的价格
    function trTotal(ele,count){
        var price = ele.getElementsByTagName('td')[2].innerHTML;
        var total = ele.getElementsByTagName('td')[4];
        total.innerHTML = (price*count).toFixed(2);
    }
//计算总价
    function allTotal(){
        var priceTotal = document.getElementById('priceTotal');
        var selectedTotal = document.getElementById('selectedTotal');
        var selectedCount = 0;
        var total = 0;
        for(var i = 0;i<tr.length;i++){
            if(tr[i].children[0].children[0].checked){
                var price = tr[i].getElementsByTagName('td')[4].innerHTML;
                var count = tr[i].getElementsByClassName('count-input')[0].value;
                selectedCount += parseInt(count);
                total+=parseFloat(price);
                console.log(selectedCount);
            }
        }
        priceTotal.innerHTML = total.toFixed(2);
        selectedTotal.innerHTML = selectedCount;
    }
}())
