/**
 * More中引入
 * 我
 */

//接收登录监听
// pageListen=1;

var leftMe,leftIndex=0,leftShowing,	//左边
rightMe,rightIndex=0,rightShowing,	//右边
border,creaseStatu;					//我 边框

$(document).ready(function(){
	//边框
	border=$('.meBoder');
	$(border).attr('width',0);
	//信息
	leftMe=$('#leftMe .memberDetail');
	rightMe=$('#rightMe .memberDetail');
	for(var i=0;i<leftMe.length;i++){
		$(leftMe[i]).attr('margin',100);
		$(rightMe[i]).attr('margin',-100);
	}
	leftShowing=leftMe[leftIndex];
	rightShowing=rightMe[rightIndex];
	showLeft();				//显示信息
	//暗夜降临
	$('.Dark').css({
		'width':ScreenWidth,
		'height':window.screen.availHeight
	})
	//关于我
	$('#me').bind({
		'mouseenter':function(){
			$('.memberDetail').css({
				'color':'rgb(180,200,255)'
			})
			creaseStatu=1;
			creaseBorder();
		},
		'mouseleave':function(){
			$('.memberDetail').css({
				'color':'rgb(120,175,255)'
			})
			creaseStatu=-1;
			decreaseBorder();
		}
	})
	//关于的个人操作
	$('.operation').bind({
		'mouseenter':function(){
			$(this).css({
				'background':'rgb(180,180,255)'
			})
		},
		'mouseleave':function(){
			$(this).css({
				'background':'rgb(150,150,255)'
			})
		},
		'mouseup':function(){
			if(this.id=='modify_pass')
				openDark('modify_pass');
		}
	})
	//暗夜操作
	$('#modify_pass_html input[type="button"]').bind({
		'mouseenter':function(){
			$(this).css({
				'background':'rgb(200,200,255)'
			})
		},
		'mouseleave':function(){
			$(this).css({
				'background':'rgb(100,100,100)'
			})
		},
		'click':function(){
			modify_check(this);
		}
	})
})
function creaseBorder(){
	if(creaseStatu==1){
		var width=border[0].getAttribute('width');
		if(width<=95){
			width=width*1+5;
			$(border).attr('width',width);
			$(border[0]).css({
				'width':width+'%',
				'margin-right':(100-width)+'%'
			})
			$(border[1]).css({
				'width':width+'%',
				'margin-left':(100-width)+'%'
			})
			setTimeout(function(){
				creaseBorder();
			},7)
		}
		else
			creaseStatu=0;
	}
}
function decreaseBorder(){
	var width=border[0].getAttribute('width');
	if(width>0){
		width=width*1-5;
		$(border).attr('width',width);
		$(border[0]).css({
			'width':width+'%',
			'margin-right':(100-width)+'%'
		})
		$(border[1]).css({
			'width':width+'%',
			'margin-left':(100-width)+'%'
		})
		setTimeout(function(){
			decreaseBorder();
		},7)
	}
	else
		creaseStatu=0;
}
function showLeft(){
	var margin=leftShowing.getAttribute('margin');
	margin=margin*1-10;
	if(margin>=0){
		$(leftShowing).attr('margin',margin);
		$(leftShowing).css({
			'margin-left':margin+'%'
		})
		setTimeout(function(){
			showLeft();
		},7);
	}
	else{
		leftIndex++;
		leftShowing=leftMe[leftIndex];
		if(rightIndex<leftMe.length){
			setTimeout(function(){
				showRight();
			},7);
		}
	}
}
function showRight(){
	var margin=rightShowing.getAttribute('margin');
	margin=margin*1+10;
	if(margin<=0){
		$(rightShowing).attr('margin',margin);
		$(rightShowing).css({
			'margin-left':margin+'%'
		})
		setTimeout(function(){
			showRight();
		},10);
	}
	else{
		rightIndex++;
		rightShowing=rightMe[rightIndex];
		if(leftIndex<leftMe.length){
			setTimeout(function(){
				showLeft();
			},10);
		}
	}
}
function openDark(kind){
	if(kind=='modify_pass'){
		$('#modify_pass_html').fadeIn(500);
	}
}
function closeDark(kind){
	if(kind=='modify_pass'){
		$('#modify_pass_html').slideUp(300);
		$('#modify_pass_html input[type="password"]').val('');
		$('#modify_pass_html .errorAlert').text('');
	}	
}
//监测
function modify_check(button){
	var id=button.id;
	var pass=true;
	if(id=='modify_pass_cancle')
		closeDark('modify_pass');
	else if(id=='modify_pass_submit'){
		var inputs=$('#modify_pass_html input[type="password"]');
		var alerts=$('#modify_pass_html .errorAlert');
		for(var i=0;i<inputs.length;i++){
			var val=$(inputs[i]).val();
			$(alerts[i]).text('');
			if(val.length==0){
				$(alerts[i]).text('不能为空');
				pass=false;
			}
			else if(val.length<6||val.length>12){
				$(alerts[i]).text('密码由6位以上12位以下小写字母加数字组成');
				pass=false;
			}
			else{
				var reg=/^[a-z0-9]+$/i;
				if(!reg.test(val)){
					$(alerts[i]).text('密码由6位以上12位以下小写字母加数字组成');
					pass=false;
				}
			}
		}
		if(pass){
			if($(inputs[0]).val()!=$(inputs[1]).val()){
				$(alerts[1]).text('两次输入密码不一致');
				pass=false;
			}
		}
		if(pass){
			modify_pass($(inputs[0]).val());
			closeDark('modify_pass');
		}
	}
}
function modify_pass(password){

	post('/modify_pass',{password:password},function(result){
		if(result==1){
            alert("密码已修改,请重新登录")
			logout()
		}

		else
			alert("密码未修改")
	},'modify password')

}
