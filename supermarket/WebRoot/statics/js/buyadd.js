var buyCode = null;
var buyName = null;
var productUnit = null;
var productCount = null;
var providerId = null;
var addBtn = null;
var backBtn = null;
var creationDate = null;
var productUnitPrice = null;

function priceReg (value){
	value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
		value = value.replace(/^\./g,"");  //验证第一个字符是数字而不是.
    value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");//去掉特殊符号￥
	if(value.indexOf(".")>0){
		value = value.substring(0,value.indexOf(".")+3);
	}
    document.getElementById("totalPrice").value= value* document.getElementById("productUnitPrice").value
	return value;
}


$(function(){
    buyCode = $("#buyCode");
    buyName = $("#buyName");
	productUnit = $("#productUnit");
	productCount = $("#productCount");
	providerId = $("#providerId");
    creationDate = $("#creationDate");
    productUnitPrice = $("#productUnitPrice");
	addBtn = $("#add");
	backBtn = $("#back");
	//初始化的时候，要把所有的提示信息变为：* 以提示必填项，更灵活，不要写在页面上
    buyCode.next().html("*");
    buyName.next().html("*");
	productUnit.next().html("*");
	productCount.next().html("*");
	providerId.next().html("*");
    creationDate.next().html("*");
    productUnitPrice.next().html("*");
	
	/*$.ajax({
		type:"GET",//请求类型
		url:path+"/sys/buySelect",//请求的url
		//请求参数
		dataType:"json",//ajax接口（请求url）返回的数据类型
		success:function(data){//data：返回数据（json对象）
			if(data != null){
				$("select").html("");//通过标签选择器，得到select标签，适用于页面里只有一个select
				var options = "<option value=\"0\">请选择</option>";
				for(var i = 0; i < data.length; i++){
					//alert(data[i].id);
					//alert(data[i].proName);
					options += "<option value=\""+data[i].id+"\">"+data[i].proName+"</option>";
				}
				$("select").html(options);
			}
		},
		error:function(data){//当访问时候，404，500 等非200的错误状态码
			validateTip(providerId.next(),{"color":"red"},imgNo+" 获取供应商列表error",false);
		}
	});*/
    $.ajax({//获得供应商列表
        type:"GET",
        url:path+"/sys/billSelect",//请求的url
        //请求参数
        dataType:"json",//ajax接口（请求url）返回的数据类型
        success:function(data){//data：返回数据（json对象）
            if(data != null){
                $("#providerId").html("");
                var options = "<option value=\"0\">请选择</option>";
                for(var i = 0; i < data.length; i++){
                    //alert(data[i].id);
                    //alert(data[i].proName);
                    options += "<option value=\""+data[i].id+"\">"+data[i].proName+"</option>";
                }
                $("#providerId").html(options);
            }
        },
        error:function(data){//当访问时候，404，500 等非200的错误状态码
            validateTip(providerId.next(),{"color":"red"},imgNo+" 获取供应商列表error",false);
        }
    });
	/*
	 * 验证
	 * 失焦\获焦
	 * jquery的方法传递
	 */
    buyCode.on("blur",function(){
		if(buyCode.val() != null && buyCode.val() != ""){
			validateTip(buyCode.next(),{"color":"green"},imgYes,true);
		}else{
			validateTip(buyCode.next(),{"color":"red"},imgNo+" 编码不能为空，请重新输入",false);
		}
	}).on("focus",function(){
		//显示友情提示
		validateTip(buyCode.next(),{"color":"#666666"},"* 请输入订单编码",false);
	}).focus();

    buyName.on("focus",function(){
		validateTip(buyName.next(),{"color":"#666666"},"* 请输入商品名称",false);
	}).on("blur",function(){
		if(buyName.val() != null && buyName.val() != ""){
			validateTip(buyName.next(),{"color":"green"},imgYes,true);
		}else{
			validateTip(buyName.next(),{"color":"red"},imgNo+" 商品名称不能为空，请重新输入",false);
		}
		
	});
	
	productUnit.on("focus",function(){
		validateTip(productUnit.next(),{"color":"#666666"},"* 请输入商品单位",false);
	}).on("blur",function(){
		if(productUnit.val() != null && productUnit.val() != ""){
			validateTip(productUnit.next(),{"color":"green"},imgYes,true);
		}else{
			validateTip(productUnit.next(),{"color":"red"},imgNo+" 单位不能为空，请重新输入",false);
		}
		
	});
	
	providerId.on("focus",function(){
		validateTip(providerId.next(),{"color":"#666666"},"* 请选择供应商",false);
	}).on("blur",function(){
		if(providerId.val() != null && providerId.val() != "" && providerId.val() != 0){
			validateTip(providerId.next(),{"color":"green"},imgYes,true);
		}else{
			validateTip(providerId.next(),{"color":"red"},imgNo+" 供应商不能为空，请选择",false);
		}
		
	});

    productCount.on("focus",function(){
        validateTip(productCount.next(),{"color":"#666666"},"* 请输入商品数量",false);
    }).on("blur",function(){
        if(productCount.val() != null && productCount.val() != ""){
            this.value = priceReg(this.value);
            validateTip(productCount.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(productCount.next(),{"color":"red"},imgNo+" 商品数量不能为空，请重新输入",false);
        }
    });
	
	/*totalPrice.on("focus",function(){
		validateTip(totalPrice.next(),{"color":"#666666"},"* 请输入大于0的正自然数，小数点后保留2位",false);
	}).on("keyup",function(){
		this.value = priceReg(this.value);
	}).on("blur",function(){
		this.value = priceReg(this.value);
	});*/
	
	addBtn.on("click",function(){
		if(buyCode.attr("validateStatus") != "true"){
            buyCode.blur();
		}else if(buyName.attr("validateStatus") != "true"){
            buyName.blur();
		}else if(productUnit.attr("validateStatus") != "true"){
			productUnit.blur();
		}else if(productCount.attr("validateStatus") != "true"){
            productCount.blur();
        }else if(creationDate.val() == null || creationDate.val() == ""){
            validateTip(creationDate.next(),{"color":"red"},imgNo + " 选择的日期不正确,请重新输入",false);
        }else if(providerId.attr("validateStatus") != "true"){
			providerId.blur();
		}else{
			if(confirm("是否确认提交数据")){
				$("#buyForm").submit();
			}
		}
	});
	
	backBtn.on("click",function(){
		if(referer != undefined 
			&& null != referer 
			&& "" != referer
			&& "null" != referer
			&& referer.length > 4){
		 window.location.href = referer;
		}else{
			history.back(-1);
		}
	});
    creationDate.bind("focus",function(){
        validateTip(creationDate.next(),{"color":"#666666"},"* 点击输入框，选择日期",false);
    }).bind("blur",function(){
        if(creationDate.val() != null && creationDate.val() != ""){
            validateTip(creationDate.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(creationDate.next(),{"color":"red"},imgNo + " 选择的日期不正确,请重新输入",false);
        }
    });
});