var employ,boxs;
ScreenWidth=window.screen.availWidth;
function aboutLoad(){
	employ=0;			//TODO 后台控制是否招新
	if(!employ)
		$('#form').html('<br/><div class="UniversalAlert">抱歉，当前不在我们的正式招新时间内<br/>请关注<a href="index.html#news">主页新闻动态</a><div>');
	else{
		boxs=$('#joinUs input[type="text"]');
		JQueryBind();
	}
}
window.onload=aboutLoad;
//bind事件
function JQueryBind(){
	$('#joinUs input[type="button"]').bind({
		'click':function(){
			$('#alert').html('');
			var noEmpty=1;
			var passAll=1;
			for(var i=0;i<boxs.length;i++){
				var v=boxs[i];
				if($(v).val().length<=0){
					alertBox(0,v);
					noEmpty=0;
					passAll=0;
				}else{
					var pass=check(i,$(v).val());
					passAll=passAll?pass:0;	//判断是否全部通过
					alertBox(pass,v);
				}	
			}
			if(!noEmpty)
				addAlert('!信息不能为空!');
			else if(passAll){				//如果全部信息通过上传申请
				if(confirm('信息一旦上传将不可修改，之后的通知将依此信息发送\n确定提交申请？'))
					UpdateApply();
			}
		}
	})
}//班级 邮箱 姓名 电话
function check(index,val){
	var pass=1;
	if(index==0){		//班级验证
		var inner=val.split('');
		var length=inner.length;
		for(var i=0;i<inner.length;i++){
			if(isNaN(inner[i]))
				if(!ChineseTest(inner[i])){
					addAlert('班级只接受汉字和数字');
					pass=0;
					break;
				}
		}
		if(pass){
			if(!(length==5||length==7)){
				addAlert('班级请输入5位或7位 中文+数字(例：计科152)');
				pass=0;
			}
			else if(!(ChineseTest(inner[0])&&ChineseTest(inner[1])
			&&!isNaN(inner[length-1])&&!isNaN(inner[length-2])&&!isNaN(inner[length-3]))){
				addAlert('班级的格式本程序认为不对(例：计科152)');
				pass=0;
			}
		}
	}
	else if(index==1){	//邮箱验证
		var reg=new RegExp("\\w+@\\w+(\\.\\w+)*\\.\\w+");
		if(!reg.test(val)){
			addAlert('邮箱格式示例 : 123@abc.com');
			pass=0;
		}
		if(pass){
			if(val.length>30){
				addAlert('邮箱过长(<=30)');
				pass=0;
			}
		}
	}
	else if(index==2){	//名字验证
		if(val.length<2){
			addAlert('名字再长点(>=2)');
			pass=0;
		}
		else if(val.length>15){
			addAlert('名字不要太长…(<=15)');
			pass=0;
		}
		if(pass){
			if(!stringChiTest(val)){
				var reg=new RegExp("\\w+");
				if(!reg.test(val)){
					addAlert('名字中不能出现符号');
					pass=0;
				}
			}
		}
	}
	else if(index==3){	//电话验证
		var chars=val.split('');
		for(var i=0;i<chars.length;i++){
			if(isNaN(chars[i])){
				addAlert('电话号只接受数字')
				pass=0;
				break;
			}
		}
		if(pass)
			if(chars.length!=11){
				addAlert('电话号请输11位，当前'+chars.length+'位');
				pass=0;
			}
	}
	return pass;
}
function addAlert(alert){
	$('#alert').html($('#alert').html()+alert+'&ensp;|&ensp;');
}
//测试一个字符是否是中文
function ChineseTest(char){
	var reg=new RegExp("[\\u4e00-\\u9fff]+","g");
	if(reg.test(char))
		return true;
	return false;
}
//监测一个字符串是否全是中文
function stringChiTest(string){
	var chars=string.split('');
	for(var i=0;i<chars.length;i++){
		if(!ChineseTest(chars[i]))
			return false;
	}
	return true;
}
//监测一个字符串是否没中文
function NoChineseTest(string){
	var chars=string.split('');
	for(var i=0;i<chars.length;i++){
		if(ChineseTest(chars[i]))
			return false;
	}
	return true;
}
//根据pass清空 为v添加边框
function alertBox(pass,v){
	if(pass){
		$(v).css({
		'border':'2px inset rgb(100,255,100)'
		})
		$(v).attr('pass',1);
	}
	else{
		$(v).css({
		'border':'2px inset rgb(255,100,100)'
		})
		$(v).attr('pass',0);
	}
}
/**
 * 上传申请
 * @returns
 *///班级 邮箱 姓名 电话
var applyXHR;
function UpdateApply(){
	if(applyXHR==null)
		applyXHR=CreateOtherXHR();
	if(applyXHR!=false){
		var uri='apply.action';
		applyXHR.open('post',uri,true);
		applyXHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		applyXHR.send("cls="+$(boxs[0]).val()+"&&e_mail="+$(boxs[1]).val()+"&&name="+$(boxs[2]).val()+"&&tel="+$(boxs[3]).val());
		applyXHR.onreadystatechange=ApplyResult;
	}
}
//申请结果 1成功 0失败 2重复
function ApplyResult(){
	if(applyXHR.readyState==4 &&applyXHR.status==200){
		var result=applyXHR.responseText;
		if(result==1){
			alert("你的申请已经收到，请静候佳音");
		}else if(result==0){
			alert("申请失败了");
		}else if(result==2){
			alert("我们已经收到过了你的申请，无需重复申请");
		}
	}
}
/**
 * 特效
 */
$(function(){
	$('#alertOfJoin').attr('para',0);
	$('#alertOfJoin').attr('statu',0);
	$('#alertOfJoin').bind({
		'mouseenter':function(){
			$(this).attr('statu',1);
			shine(this);
		},
		'mouseleave':function(){
			$(this).attr('statu',-1);
			fade(this);
		}
	})
})
function shine(v){
	if(v.getAttribute('statu')==1){
		var para=v.getAttribute('para');
		if(para<20){
			para=para*1+1;
			$(v).css({
				'box-shadow':'0 0 '+para+'px rgb(255,255,255)',
				'color':'white'
			})
			$(v).attr('para',para);
			setTimeout(function(){
				shine(v);
			},20)
		}
		else
			$(v).attr('statu',0);
	}
}
function fade(v){
	if(v.getAttribute('statu')==-1){
		var para=v.getAttribute('para');
		if(para>0){
			para=para*1-1;
			$(v).css({
				'box-shadow':'0 0 '+para+'px rgb(255,255,255)',
				'color':'rgb(180,200,255)'
			})
			$(v).attr('para',para);
			setTimeout(function(){
				fade(v);
			},10)
		}
		else
			$(v).attr('statu',0);
	}
}
