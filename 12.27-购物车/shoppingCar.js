// function getClassName(className,ele){
// 	var ele = ele || document;
// 	if(ele.getElementsByClassName){
// 		return ele.getElementsByClassName(className);
// 	}
// 	else{
// 		var all = ele.getElementsByTagName("*");
// 		var arr = [];
// 		for(var i = 0;i<all.length;i++){
// 			var cName = all[i].className.split(' ');
// 			for(var j = 0;j<cName.length;j++){
// 				if(cName[j]==className){
// 					arr.push(all[i]);
// 				}
// 			}
// 		}
// 		return arr;
// 	}
// }
// function ajax(opt){
// 	opt.method = opt.method.toUpperCase()||"POST";
// 	opt.url = opt.url||"";
// 	opt.data = opt.data||{};
// 	opt.async = opt.async||true;
// 	opt.success = opt.success||function(){};
// 	opt.error = opt.error||function(){};
// 	opt.complete = opt.complete||function(){};
// 	opt.beforeSend = opt.beforeSend||function(){};

// 	var xhr;
// 	if(window.XMLHttpRequest){
// 		xhr = new XMLHttpRequest();
// 	}else{
// 		xhr = new ActiveXObject("Microsoft.XMLHTTP");
// 	}

// 	var params = [];
// 	for(var i in opt.data){
// 		params.push(i+"="+opt.data[i]);
// 	}
// 	var data = params.join('&');
// 	opt.beforeSend();
// 	if(opt.method == "POST"){
// 		xhr.open('POST',opt.url,opt.async);
// 		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 		xhr.send(data);
// 	}else{
// 		xhr.open("GET",opt.url+"?key="+Math.random()+"&"+data,opt.async);
// 		xhr.send();
// 	}

// 	xhr.onreadystatechange = function(){
// 		if(xhr.readyState == 4){
// 			setTimeout(opt.complete,2000);
// 			// opt.complete();
// 			if(xhr.status==200){
// 				setTimeout(function(){
// 					opt.success(xhr.responseText);
// 				}, 2000)
// 				// opt.success(xhr.responseText);
// 			}else if(xhr.status == 404){
// 				//xhr.statusText错误信息
// 				opt.error(xhr.statusText);
// 			}
// 		}
// 	}
// }


// (function(){
	
// 	var shopCar = document.getElementById('shoppingCar');
// 	var checks = getClassName("check2",shopCar);
// 	var checkall = getClassName('check1',shopCar);
// 	var index = 0;
// 	shopCar.onclick = function(event){
// 		var e = event||window.event;
// 		var target = e.target||e.srcElement;
// 		if(target.className == "check1"){
// 			// getClassName('check2',shopCar);这个是所有选项
// 			for(var i = 0;i<checks.length;i++){
// 				checks[i].checked = target.checked;

// 			}
// 			for(var i = 0;i<checkall.length;i++){
// 				checkall[i].checked = target.checked;
// 			}
// 			if(target.checked){
// 				index = checks.length;

// 			}else{
// 				index = 0;
// 			}
// 		}
// 		console.log(target)
// 		if(target.className == "fl check2"){
// 			console.log(target.checked,target);
// 			if(target.checked){
// 				index++;
// 			}else{
// 				index--;
// 			}
// 			if(index == checks.length){
// 				for(var i = 0;i<checkall.length;i++){
// 					checkall[i].checked = target.checked;
// 				}
// 			}else{
// 				for(var i = 0;i<checkall.length;i++){
// 					checkall[i].checked = false;
// 				}
// 			}
// 		}
// 		if(target.parentNode.className == 'delete'){
// 			// ajax()发送对应的商品id 。
// 			//后台接收后进行删除，删除成功后返回{status:"success"} {status:"error"}
// 			//前端根据接收到的信息 选择删除还是提示删除失败
// 			/*ajax({
// 				method:"post",
// 				url:"",
// 				data:{id:1},
// 				success:function(data){
// 					if(data.status == "success"){
// 						shopCar.removeChild(target.parentNode.parentNode);
// 					}else if(data.status == "error"){
// 						alert("删除失败")
// 					}
// 				}
// 			})*/
// 			shopCar.removeChild(target.parentNode.parentNode);
			
			
// 		}

// 	}
// 	// alert(getClassName("orderForm",shopCar)[0].getAttribute('data-id'))

// }())

// ;(function(){
// 	// var checks = getClassName('check2',shopCar);
// 	// for(var i = 0;i<checks.length;i++){
// 	// 	checks[i].onclick = function(){
// 	// 		var count = this.parentNode.getAttribute('data-count');
// 	// 	}
// 	// }
// 	// var count = ;
// 	/*var id = 1;
// 	ajax({
// 		method:"POST",
// 		url:"",//对应接口
// 		data:{
// 			goods:[
// 				{
// 					id:1,count:2
// 				},{
// 					id:2,count:1
// 				},{
// 					id:3,count:3
// 				}
// 			]
// 		},
// 		success:function(data){//假设返回值为总价
// 			document.getElementById('money').innerHTML = data;
// 		}
// 	})*/
// }())
// ;(function(){
// }())
// *********************************************************
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