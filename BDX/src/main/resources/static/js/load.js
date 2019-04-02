/**
 * 加载 js引用必须load方法 否则加载不成功
 * 
 * onmouseover、nmouseout：鼠标移动到自身时候或其子元素身上都会触发事件
 * onmouseenter、onmouseleave：鼠标移动到自身触发事件，移动到其子元素身上不会触发事件
 */
var inhref=0,inselect=0,rightWord='',rightPass='',
XHR=false,LogStatu,ScreenWidth,pageListen,member;			//pageListen不能赋值，否则会覆盖之前已经赋过的值

function load(){
	// loadHibernate();			//加载Hibernate

	/**
	 * 网页宽度为屏幕可用的宽度
	 */
	ScreenWidth=window.screen.availWidth-7;
	$('body').css('width',ScreenWidth);
	$('#href').css('width',ScreenWidth-100);
	$('#select').css('width',ScreenWidth-100);
	/**
	 * 导航栏下拉监听
	 */
	document.getElementById('hreftable').onmouseenter=function(){
		inhref=1;
		setTimeout(function(){
			$('#select').fadeIn(300);
		},50); 
		$('#body').css('z-index','-1');				//在显示下拉框的时候使body浮到下层
	};

	document.getElementById('hreftable').onmouseleave=function(){
		inhref=0;
		setTimeout(function(){
			if(inselect==0){
				$('#select').fadeOut(150);
				setTimeout(function(){
					$('#body').css('z-index','1')	//在隐藏下拉框的时候使body浮到上层
				},150)
			}	
		},50);
		//setInterval(outSelect,50);//每隔50ms后执行outSelecet

	};
	document.getElementById('select').onmouseenter=function(){
		inselect=1;
	};
	document.getElementById('select').onmouseleave=function(){
		inselect=0;
		setTimeout(function(){
			if(inhref==0){
				$('#select').slideUp(150);
				setTimeout(function(){
					$('#body').css('z-index','1')
				},150)
			}	
		},50);

	};
	/**
	 * 导航栏css监听
	 */
    let hrefs=$('.href');
    let selections=$('.select');
	for(let i=0;i<hrefs.length;i++){
        let hr=hrefs[i];
		hr.onmouseenter=function(){
			$(this).css({
					'box-shadow':'0px 0px 15px rgb(180,180,255)',
					'text-shadow':'0 0 10px rgb(200,255,255)',
					'color':'rgb(200,255,255)'
				})
		};
		hr.onmouseleave=function(){
			$(this).css({
					'box-shadow':'none',
					'text-shadow':'none',
					'color':'rgb(100,200,255)'
				})

		};
		hr.setAttribute('h',hr.getElementsByTagName('a')[0].href);
		hr.onmouseup=function(){
			self.location=this.getAttribute('h');
		};
		/*
		 * 如果直接使用hrefs[i]来添加对应href的css则全都指向hrefs[6](不存在)
		 */
        let se=selections[i];
		se.setAttribute('v',i);
		se.onmouseenter=function(){
			$(this).css({
					'background':'rgba(0,170,255,0.7)'
			});
			$(hrefs[this.getAttribute('v')]).css({
					'text-shadow':'0 0 10px rgb(200,255,255)',
					'color':'white'
				})
		};
		se.onmouseleave=function(){
				$(this).css({
					'background':'none'
				});
				$(hrefs[this.getAttribute('v')]).css({
					'text-shadow':'none',
					'color':'rgb(102,204,255)'
				})
		};
        let options=se.getElementsByTagName('div');
		for(let j=0;j<options.length;j++){
			options[j].setAttribute('parent-url',hr.getAttribute('h'));
		}
	}
	/**
	 * options监听
	 */

    let options=$('#select div');
	for(let i=0;i<options.length;i++){
        let o=options[i];

		o.onmouseenter=function(){
			$(this).css({
				'background':'linear-gradient(to bottom,rgba(0,255,255,0.2),rgba(0,255,255,0.45)',
				'color':'rgb(235,235,255)',
				'cursor':'pointer'
			})

		};

		o.onmouseleave=function(){
			$(this).css({
				'background':'none',
				'color':'rgb(170,200,255)',
				'cursor':'auto'
			})
		};

		o.setAttribute('h',o.getAttribute('parent-url')+o.getElementsByTagName('a')[0].getAttribute('href'));
		o.onmouseup=function(){
			/*
			 * 几种网页跳转方式
			 */
			self.location=this.getAttribute('h');
//			window.location.href=this.getAttribute('h');
//			top.location=o.getAttribute('h');
		}
	}
	/**
	 * 登录框的监听
	 */
	//TODO 根据登录状态判断下步动作
	checkUser();
	document.getElementById('key').onmouseup=function(){
		if(LogStatu==1){
			LogStatu=0;
			logout();
		}
		$('#licence').fadeIn('fast');
		$('#number').val(rightWord);
		$('#password').val(rightPass);

	};
	document.getElementById('cancle').onmouseup=function(){
		$('#licence').fadeOut('fast');
	};
	document.getElementById('submit').onmouseup=function(){
        let number = $('#number').val();
        let password=$('#password').val();
		if(number.length<=0)
			alert("请输入学号！");
		if(!allIsNumber(number))
			alert("学号必须为数字");
		else if(number.length!=11)
			alert("学号必须为11位！");
		else if(password.length<=0)
			alert("请输入密码！");
		else if(!isRightPass(password))
			alert("密码中不能包含除下划线之外的符号");
		else{//尝试登陆
			login(number,password);
			$('#logging').slideDown('fast');
			$('#logging').css('color','blue');	
		}
	}

}
/**
 * 登录
 */
function login(number,password){

	post("/login",{
        number:number,
        password:password
	},function (result) {
        if(result!=null&&result.name!=null){
            member=result;

            $('#logging').text('认证成功！');
            setTimeout(function(){
                $('#logging').slideUp('fast');	//认证框滑上去
            },400);
            $('#licence').fadeOut('fast');		//输入框淡出
            $('#key').text('注销/Logout');		//文字变动
            setTimeout(function(){				//显示成员
                $('#logged').text(result.grp.name+" "+result.name);
                $('#logged').fadeIn('fast');
            },200);
            rightWord='';
            rightPass='';
            $('#key').css('background-image','url(/img/keyBlack.png)');//图片变更
            if(pageListen)
                afterLogin();
            $('#number').val('');		//学号框清空
            LogStatu=1;					//登录状态1
        }else{
            $('#logging').text('认证失败！');
            $('#logging').css('color','red');
            setTimeout(function(){
                $('#logging').slideUp('fast');
            },400);
        }
        $('#password').val('');			//密码框清空
    },"成员登录");

}
function logout(){
	$('#logged').fadeOut('fast');
	$('#logged').text('');
	$('#key').text('登录/LogIn');

	$('#key').css('background-image','url(/img/keyWhite.png)');//图片变更
	get("/log_out",function (result) {
		if(result==1)
			console.log("已登出")
    },"log out");

	if(pageListen)
		afterLogout();
}
//创建公共XHR
function CreateXHR(){
	if(XHR==false)
		XHR=CreateOtherXHR();
}

// 载入检测用户
function checkUser(){
	// get("log!check.action",checkResult,"check user");
	get("/log_check",function (result) {
        if(result!=null&&result.id!=-1&&result.name!=null){
        	member=result;

            $('#key').text('注销/Logout');		//文字变动
            $('#key').css('background-image','url(/img/keyBlack.png)');
            setTimeout(function(){
                $('#logged').text(result.grp.name+" "+result.name);
                $('#logged').fadeIn('fast');
            },200);
            rightWord='',rightPass='';
            LogStatu=1;							//登录状态1
            if(pageListen)
                afterLogin();					//有页面监听需要的页面执行listen方法
        }else{
            $('#key').text('登录/Login');		//文字变动
            $('#key').css('background-image','url(/img/keyWhite.png)');
            LogStatu=0;
            if(pageListen)						//有页面监听需要的页面执行listen方法
                afterLogout();
        }
        $('#number').val('');
        $('#password').val('');

    },"check user")
}
$(document).ready(function(){
	load();
});
