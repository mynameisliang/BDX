//创建独立XmlHttpRequest
function CreateOtherXHR(){
	var XHR=false;
	if (window.XMLHttpRequest){
		XHR=new XMLHttpRequest();
   	 }//for IE7+, Firefox, Chrome, Opera, Safari
	else{
		XHR=new ActiveXObject("Microsoft.XMLHTTP");
	}//for IE6, IE5
	return XHR;
}
/**
 * 元素滑动控制
 * TODO 也许需要第二个组件，被第一个控制。也许需要同时控制多个属性。
 * @param {Element} object		操作的元素
 * @param {CssStyle} attribute	操作的属性
 * @param {String} model		模式（per百分比，px像素）
 * @param {Object} eachCrease	每次增长量
 * @param {Object} higher		 最高量
 * @param {Object} lower		最低量
 * @param {Object} source		原始量
 * @param {Object} interval		间隔毫秒数
 */
function crease_onmousemove(object,attribute,model,eachCrease,higher,lower,source,interval){
	var mod=model=='per'?'%':model=='px'?'px':model;	//模式
	var sty=object.style;	//渐变属性
   	setAttr(object,attribute,mod,source);
   	object.onmouseenter=function(){
   		setStatu(object,attribute,1);
   		increase(this,attribute,eachCrease,mod,higher,interval);
   	}
   	object.onmouseleave=function(){
   		setStatu(object,attribute,-1);
   		decrease(this,attribute,eachCrease,mod,lower,interval);
   	}
}
function existStatuAttr(obj,attr){
	return obj.hasAttribute('statu_'+attr);
}
function setAttr(obj,attr,mod,source){
	mod=mod=='per'?'%':mod=='px'?'px':mod;
	obj.setAttribute('statu_'+attr,1);
	obj.setAttribute(attr+'_',source);
	switch(attr){
		case 'marginleft':obj.style.marginLeft=source+mod;break;
		case 'marginright':obj.style.marginRight=source+mod;break;
		case 'width':obj.style.offsetWidth=source+mod;break;
		case 'height':obj.style.offsetHeight=source+mod;break;
	}
}
function setStatu(obj,attr,statu){
	obj.setAttribute('statu_'+attr,statu);
}
function increase(obj,attr,each,mod,highest,interval){
	if(obj.getAttribute('statu_'+attr)==1){
	 	var pre_length=obj.getAttribute(attr+'_')*1;
	 	if(pre_length<highest){
	 		pre_length+=each;
	 		switch(attr){
 			case 'marginleft':obj.style.marginLeft=pre_length+mod;break;
 			case 'marginright':obj.style.marginRight=pre_length+mod;break;
 			case 'width':obj.style.width=pre_length+mod;break;
 			case 'height':obj.style.height=pre_length+mod;break;
	 		}
	 		obj.setAttribute(attr+'_',pre_length);
	 		setTimeout(function(){
	 			increase(obj,attr,each,mod,highest,interval);
	 		},interval);
	 	}
	 	else
	 		obj.setAttribute('statu_'+attr,0);
	}
}
function decrease(obj,attr,each,mod,lowest,interval){
	if(obj.getAttribute('statu_'+attr)==-1){
	 	var pre_length=obj.getAttribute(attr+'_')*1;
	 	if(pre_length>lowest){
	 		pre_length-=each;
	 		switch(attr){
 			case 'marginleft':obj.style.marginLeft=pre_length+mod;break;
 			case 'marginright':obj.style.marginRight=pre_length+mod;break;
 			case 'width':obj.style.width=pre_length+mod;break;
 			case 'height':obj.style.height=pre_length+mod;break;
	 		}
	 		obj.setAttribute(attr+'_',pre_length);
	 		setTimeout(function(){
	 			decrease(obj,attr,each,mod,lowest,interval);
	 		},interval);
	 	}
	 	else
	 		obj.setAttribute('statu_marginleft',0);
	}
}
/**
 * 测试一个字符是否是中文
 */
function ChineseTest(char){
	var reg=new RegExp("[\\u4e00-\\u9fff]+","g");
	if(reg.test(char))
		return true;
	return false;
}
/**
 * 监测一个字符串是否全是中文
 */
function allChineseTest(string){
	var chars=string.split('');
	for(var i=0;i<chars.length;i++){
		if(!ChineseTest(chars[i]))
			return false;
	}
	return true;
}
/**
 * 监测一个字符串是否没中文
 */
function NoChineseTest(string){
	var chars=string.split('');
	for(var i=0;i<chars.length;i++){
		if(ChineseTest(chars[i]))
			return false;
	}
	return true;
}
/**
 * 判断一个keyCode是不是数字
 */
function keyCodeIsNumber(keycode){
	if((keycode>=48&&keycode<=57)||(keycode>=97&&keycode<=105))
		return true;
}
/**
 * 检验字符串是否由数字组成
 */
function allIsNumber(string){
	var reg=/^[0-9]+$/;
	return reg.test(string);
}
function isEmailAdd(string){
	if(string=="")
		return false;
	var reg=new RegExp("\\w+@\\w+(\\.\\w+)*\\.\\w+");
	return reg.test(string);
}
function isRightPass(string){
	if(string=="")
		return false;
	var reg=new RegExp("^\\w+$");
	return reg.test(string);
}
function addZero(num){
	return num>9?num:"0"+num;
}