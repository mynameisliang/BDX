/**
 * More中引入
 * 签到 签到信息获取
 */
pageListen=1;
var signStatu=0,isToday=0;
var freshMonth=0;							//防止Session冲突，只有一个Session

// var X1=CreateOtherXHR(),X2=CreateOtherXHR();//防止XHR之间冲突

/**
 * 获取
 * @returns
 */
function afterLogin(){
	getCheckInfo();
	$('#UnlogedAlert').fadeOut();
	$('#me').fadeIn('fast');
	$('#operate').fadeIn('fast');

	//显式成员信息
	$("#memberNumber").text(member.id);
    	$("#memberName").text(member.name);
	$("#memberGroup").text(member.grp.name);
	$("#memberDirection").text(member.grp.direction)
}

/**
 * 获取并处理日期date的签到信息
 * @param date 日期
 */

function getCheckInfo(date){
	if(date==null){
		date="";
		freshMonth=1;
		isToday=1;
	}
	else if((P_YEAR+'-'+P_MONTH+'-'+P_DAY)===(THIS_YEAR+'-'+THIS_MONTH+'-'+THIS_DAY))
		isToday=1;
	else
		isToday=0;
	//TODO 签到信息处理
	ajax("/signdata","GET",{
		date:date
	},function (result) {
        $('.inDetail').slideDown('slow');

        // var chars=result.split("");
        if(result.length<1){
            $('#todaySign .detail').text('未签到');
            signStatu=0;
        }
        else{
            $('#todaySign .detail').text('');
            for(var i=0;i<result.length;i++){
                if(result[i].statu==1) {
                    signStatu = 1;
                    $('#todaySign .detail').append("<到："+result[i].time+"-");
                }
                else if(result[i].statu==0) {			//判断签到状态
                    signStatu = 0;
                    $('#todaySign .detail').append(result[i].time+"退>")
                }
            }
        }
        showTitleText();
        if(freshMonth){
            getMonthInfo();
            freshMonth=0;								//变量归零
        }
    },"请求签到信息")
}

/**
 * 注销用户时清空所有信息显示
 */
function afterLogout(){
	$('.detail').text('');
	$('.inDetail').fadeOut('fast');
	$('#UnlogedAlert').fadeIn();
	$('#me').fadeOut('fast');
	$('#operate').fadeOut('fast');
	document.getElementById('UnlogedAlert').onmouseup=document.getElementById('key').onmouseup;
	var cells=$('.inTd');
	for(var i=0;i<cells.length;i++)
		$(cells[i]).css('background-image','none');
	signStatu=0;
}
/**
 * 根据签到状态显示文字 
 */
function showTitleText(){
	if(isToday){
		if(signStatu)
			$('#signButton').text('点击签退');
		else
			$('#signButton').text('点击签到');
	}
	else
		$('#signButton').text('点击返回今日');
	 
}
//签到\签退按钮监听
$(function(){
	$('#signButton').css('background','rgb(120,170,255)');
	$('#signButton').bind({
		'mouseenter':function(){
			$(this).css({
				'background':'rgb(140,190,255)'
			})
		},
		'mouseout':function(){
			$(this).css({
				'background':'rgb(120,170,255)'
			})
		},
		'mouseup':function(){
			if(isToday)
				sign();
			else{
				refreshCalendar(THIS_YEAR,THIS_MONTH,date.getDate(),date.getDay());
				getCheckInfo();
			}
		}
	})

});

/**
 * 签到
 */
function sign(){

	ajax("/sign","GET",{
        isCheckin:signStatu==1?0:1
	},function (result) {
		if(result==1)
			alert("已签"+(signStatu==1?"退":"到"));
		else
			alert("未签"+(signStatu==1?"退":"到"));
        getCheckInfo()//重新获取签到信息
    },"签到/签退");

}
/**
 * 签到结果处理
 */
//function signResult(){
//	if(XHR.readyState==4 && XHR.status==200){
//		if(!XHR.responseText)
//			alert("添加信息失败，请联系管理员")
//		else{
//			alert("已签"+(signStatu==1?'退':"到"));
//			getCheckInfo();
//		}	
//	}
//}
/**
 * 获取本月签到信息
 * month的格式是 yyyy-MM
 */
function getMonthInfo(month){
	if(month==null){			//载入时传入参数为null 查询当天信息
		month="";
		if(THIS_YEAR+'-'+THIS_MONTH!=P_YEAR+'-'+P_MONTH)
			refreshCalendar(THIS_YEAR,THIS_MONTH,date.getDate(),date.getDay());
		P_YEAR=THIS_YEAR;
		P_MONTH=THIS_MONTH;
	}else{
		//非空则查询指定月信息
		if(month!=(THIS_YEAR+'-'+addZero(THIS_MONTH)))
			isToday=0;
		else
			isToday=1;
		if(isToday)
			getCheckInfo(THIS_YEAR+'-'+addZero(THIS_MONTH)+'-'+addZero(THIS_DAY));
		else					//根据是否是本月对界面进行修改
			$('#todaySign .detail').text('未选择日期');
	}
	showTitleText();


	ajax("/signdata_month","GET",{
        month:month
	},function (result) {
		monthMessage(result.result)
    },"查找月度签到信息");
}
//上面方法的结果接收方法
function monthMessage(result){
	result=result==null?"":result;
	var days=result.split('|');
	for(var i=0;i<days.length-1;i++){
		var chars=days[i].split('');
		if(chars[0]==0)
			days[i]=chars[1];
	}
	showRightSign(days);
	$('#monthSign .detail').text('共签到：'+(days.length-1)+' 天');
	var toShow;
	var timeLine=1;
	if(P_YEAR==THIS_YEAR){
		if(P_MONTH<THIS_MONTH)
			timeLine=0;
		else if(P_MONTH>THIS_MONTH)
			timeLine=2;
	}
	else if(P_YEAR<THIS_YEAR)
		timeLine=0;
	else
		timeLine=2;
	if(timeLine==1){
		var percent=(days.length-1)/THIS_DAY;
		if(percent<0.2)
			toShow='该奋斗的年龄请别选择安逸';
		else if(percent<0.4)
			toShow='不忘初心，方得始终';
		else if(percent<0.6)
			toShow='耐得住寂寞，方能守得住繁华';
		else
			toShow='度过一段能感动自己时光，你想要的，岁月统统都会还给你'
	}
	else if(timeLine==0)
		toShow='希望逝去的时光 让你看到前方依然泛着的微光';
	else
		toShow='逐梦当下 筑梦未来！';
	$('#words .detail').text(toShow);
}
/**
 * 根据接收信息在签过到的日期上打钩
 * @param message	签到的日期信息
 */
function showRightSign(message){
	var cells=$('.inTd');
	var index=0,beginSign=0;
	for(var i=0;i<cells.length;i++){
		if(index<message.length-1){
			if(cells[i].getAttribute('v')==1)
				beginSign=1;
			if(beginSign)
				if(cells[i].getAttribute('v')==message[index]){
					$(cells[i]).css('background-image','url(/img/right.png)');

					index++;
				}
		}
	}
}
