
pageListen=1;
var formHtml,inputs;				//变量方法外赋值无效
// var binded=0;
function messageload(){
	formHtml=$('#visitorDO form').html();
//	load();							//加载关键js	
	let boxs=$('.Outbox');
	for(let i=0;i<boxs.length;i++){
		$(boxs[i]).css('margin-left',(window.screen.availWidth-$(boxs[i]).width())/2);
	}
	inputs=$('#visitorDO input[type="text"]');
}
window.onload=messageload;
function isMember(){
	$('#visitorDO form').hide();
	$('#memberAlert').show();
//	$('#visitorDO').html('<div class="UniversalAlert">亲爱的星星,可以直接留言哦~</div>');
	$('#member').css({
		'background-image':'url(/img/right.png)'
	});
	$('#visitor').css({
		'background-image':'none'
	});

	light(1);
}
function isVisitor(){
	$('#visitorDO form').show();
	$('#memberAlert').hide();
//	$('#visitorDO').html('<form>'+formHtml+'</form>');
	$("#visitor").css({

		'background-image':'url(/img/right.png)'
	});
	$('#member').css({
		'background-image':'none'
	});

	light(0)
}
function afterLogin(){
	isMember();
}
function afterLogout(){
	isVisitor();
}
/**
 * 访客bind
 */
function visitorDo(){
	inputs=$('#visitorDO input[type="text"]');

	for(let i=0;i<inputs.length;i++){//文本框赋属性值

		$(inputs[i]).attr('index',i);
		$(inputs[i]).attr('clicked',0);
		$(inputs[i]).attr('pass',0);
	}
	$('#visitorDO input[type="text"]').bind({
		'focusin':function(){
			$(this).attr('clicked',1);
			$('#alert').text('');

            let noEmpty=1;
			for(let i=0;i<inputs.length;i++){
				if(i==this.getAttribute('index'))
					continue;
				else if(inputs[i].getAttribute('clicked')==1){
                    let v=inputs[i],pass=1;

					if($(v).val().length<=0){
						noEmpty=0;
						pass=0;
					}
					if(pass)
						pass=check(v);
					alertBox(pass,v);
				}
			}
			if(!noEmpty)
				addAlert('信息不能为空');
		}
	})
}
//JQUERY BIND
$(function(){
	$('#newMessage').bind({		//文本域框监听 检查所有信息框是否完整
		'focusin':function(){
			if(!LogStatu){

                let passAll=1,noEmpty=1;
				$('#alert').text('');
				for(let i=0;i<inputs.length;i++){
                    let v=inputs[i],pass=1;
					if($(v).val().length<=0){
						noEmpty=0;
						pass=0;
					}
					if(pass)
						pass=check(v);
					passAll=passAll?pass:0;
					$(v).attr('clicked',1);
					alertBox(pass,v);
				}
				if(!noEmpty)
					addAlert('信息不能为空');
				light(passAll);
			}
		}
	});
	$('#submitMessage').bind({
		'mouseup':function(){
			if($('#newMessage').val().length>15){
				if(LogStatu)
					memberMessage();
				else
					visitorMessage();
			}
			else
				alert("请输入15字符以上的留言");
		}
	});
	$('#clear').bind({
		'mouseup':function(){
			if($('#newMessage').val().length>0){
				if(confirm("确定清空？")){
					$('#newMessage').val('');
				}
			}
		}
	});
	visitorDo();
});
//检查指定的文本框
function check(v){
    let index=v.getAttribute('index'),val=$(v).val();
    let pass=1;
	if(index==0){
		//名字验证
		if(val.length<2){
			addAlert('名字可以再长点儿(>=2)');
			pass=0;
		}
		else if(val.length>15){
			addAlert('名字请不要太长…(<=15)');
			pass=0;
		}
	}	
	else if(index==1){
		//验证是否是英文

        let reg=new RegExp("\\w+");
		if((!NoChineseTest(val)&&(reg.test(val)))){//注意逻辑判断——(非)无中文，无符号 时
			addAlert('QQ(微信)号码只接受数字或字母');
			pass=0;
		}
		if(pass){
			if(val.length<5){
				addAlert('QQ(微信)号码过短了');
				pass=0;
			}
			else if(val.length>15){
				addAlert('QQ(微信)号码太长了')
				pass=0;
			}	
		}
	}
	else if(index==2){
		//电话验证

        let chars=val.split('');
		for(let i=0;i<chars.length;i++){
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
	else if(index==3){
		//邮箱验证
		if(!isEmailAdd(val)){
			addAlert('邮箱格式不正确(例 : abc@def.com)');
			pass=0;
		}
		if(pass){
			if(val.length>30){
				addAlert('邮箱过长(<=30)');
				pass=0;
			}
		}
	}
	return pass;
}
//向下方的警示框添加警告
function addAlert(alert){
	$('#alert').html($('#alert').html()+alert+'<br/>');
}
//根据pass清空 为v添加边框
function alertBox(pass,v){
	if(pass){
		$(v).css({
		'border':'2px inset rgb(100,255,100)'
		});

		$(v).attr('pass',1);
	}
	else{
		$(v).css({
		'border':'2px inset rgb(255,100,100)'
		});
		$(v).attr('pass',0);
	}
}
//上传留言
function memberMessage(){
	ajax('/message_came_from_member',"GET",{
		message:$('#newMessage').val()
	},uploadresult,'upload membeer message')
}
function visitorMessage(){
	ajax('/message_came_from_visitor',"GET",{
		name:$(inputs[0]).val(),
		qq:$(inputs[1]).val(),
		tel:$(inputs[2]).val(),
		email:$(inputs[3]).val(),

		message:$('#newMessage').val()
	},uploadresult,'upload visitor message')
}
function uploadresult(result){
		alert(result==1?"留言已经收到":"留言上传失败了……");
}
/**
 * 当按钮可显示时灯光特效在右边，否则在左边
 */
function light(order){
	if(order){
		$('.SubButton').fadeIn();
		$('#personChoose').css({
			'background': 'none'
		});
		$('#upLoadMessage').css({
			'background': 'linear-gradient(to bottom,rgb(120,150,255),rgb(120,120,255))'
		})
	}
	else{
		$('.SubButton').fadeOut();
		$('#personChoose').css({
			'background': 'linear-gradient(to bottom,rgb(120,150,255),rgb(120,120,255))'
		});

		$('#upLoadMessage').css({
			'background': 'none'
		})
	}	
}
