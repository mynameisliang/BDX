/**
 * More中引入
 * 日历
 */
var LDateOLM,LDOLM,FDONM,			//上月最后一日，上月最后星期，下月首日星期;
P_YEAR,P_MONTH,P_DAY,				//当前显示年月日
THIS_YEAR,THIS_MONTH,THIS_DAY;		//现在年月日
var date=new Date();
var isPresentMonth;	
var rows;
function thisload(){
	$('#signIn').css('margin-left',(ScreenWidth-1100)/2);
	//_________________________日历
	//添加日历的行
	var rowHtml;
	for(var i=0;i<7;i++)
		rowHtml+='<tr class="inRow"></tr>'
	$('#content').html(rowHtml);
	rows=$('.inRow');
	//添加日历列
	var columnHtml;
	for(var i=0;i<7;i++)
		columnHtml+="<td class='inTd'></td>"
	for(var i=0;i<rows.length;i++){
//		if(i==0)
//			$(rows[i]).css('background','rgb(100,100,255)');
		$(rows[i]).html(columnHtml);
	}
	//TODO 设置每个单元格和行列属性
	//获取第一行所有列显示星期
	var days=rows[0].getElementsByTagName('td');
	var ChineseChars=['日','一','二','三','四','五','六'];
	var rg=100;
	for(var i=0;i<days.length;i++){
		$(days[i]).css('background','rgb('+rg+','+rg+',255)');
		$(days[i]).text(ChineseChars[i]);
		$(days[i]).attr('class','days');	//此处将星期的class设为days
		rg-=10;
	}
	P_YEAR=THIS_YEAR=date.getFullYear();
	P_MONTH=THIS_MONTH=date.getMonth()+1;
	P_DAY=THIS_DAY=date.getDate();
	var dayInWeek=date.getDay();
	//刷新日历板
	refreshCalendar(THIS_YEAR,THIS_MONTH,THIS_DAY,dayInWeek);
	jQueryBind();		//加载完js后再bind的jQuery
}
//____________________加载
window.onload=thisload;
/**
 * 刷新日历板
 * @param {Object} DatumYear	基准年
 * @param {Object} DatumMonth	基准月
 * @param {Object} DatumDay		基准日
 * @param {Object} dayInWeek	基准星期
 */
function refreshCalendar(DatumYear,DatumMonth,DatumDay,dayInWeek){
	//是否是当月
	isPresentMonth=(DatumYear==THIS_YEAR&&DatumMonth==THIS_MONTH);
	//获取时间显示在中间
	$('#dateShow').text(DatumYear+'-'+DatumMonth+(isPresentMonth?'-'+THIS_DAY:''));
	//获取1号周几
	var firstDay=(dayInWeek+1)-(DatumDay%7);			//本月起始日
	if(firstDay<0)
		firstDay=7+firstDay;
	var NOThisMonth=NumberOfDays(DatumYear,DatumMonth);	//本月总天数
	LDateOLM=NumberOfDays(DatumYear,DatumMonth-1);		//基准-上月最后一天
	LDOLM=(firstDay+6)%7;								//基准-上月最后周几
	FDONM=(NOThisMonth%7+firstDay)%7;					//基准-下月首日周几
	var NOLastMonth=LDateOLM-firstDay+1;				//上月在此版面起始日
	//开始向单元格添加数字
	var index=1,lastNotOver=true,thisNotOver=true;
	var cells=$('.inTd');
	$(rows[6]).show();								//显示第6行
	for(var i=0;i<cells.length;i++){
		$(cells[i]).css('background-image','none');	//去除所有对号
		if(firstDay-->0){
			$(cells[i]).text(NOLastMonth++);
			$(cells[i]).attr('v','0');
		}
		else{
			lastNotOver=false;
			if(index>NOThisMonth){
				index=1;
				thisNotOver=false;
			}
			if(!thisNotOver&&index>=7)
				$(rows[6]).hide();					//隐藏第6行
			$(cells[i]).attr('v',index);
			$(cells[i]).text(index++);
		}
		if(!lastNotOver&&thisNotOver){
			if(isPresentMonth&&(index-1==THIS_DAY))
				$(cells[i]).css('background-color','rgb(255,255,255)');//今日变色
			else
				$(cells[i]).css('background-color','rgb(200,200,255)');
			$(cells[i]).attr('month','1');
		}
			
		else{
			$(cells[i]).css('background-color','rgb(150,150,255)');
			if(lastNotOver)
				$(cells[i]).attr('month','0');
			else
				$(cells[i]).attr('month','2');
		}
	}
}
/**
 * 获取year年 month月的天数
 * @param {Object} year
 * @param {Object} month
 */
function NumberOfDays(year,month){
	if(month==0){		//在获取上月天数时防止出错
		month=12;
		year--;
	}
	if(month==1||month==3||month==5||month==7||month==8||month==10||month==12)
		return 31;
	else if(month==4||month==6||month==9||month==11)
		return 30;
	else{
		if(year%100!=0){
			if(year%4==0)
				return 29;
		}
		else
			if(year%400==0)
				return 29;
		return 28;
	}
}
//JQuery加载在所有加载项之前，所以部分js添加的元素此时不可调用
$(function(){
	$('#turnLeft,#turnRight').bind({
		'mouseenter':function(){
			$(this).css('box-shadow','0 0 10px rgb(0,0,0)');
		},
		'mouseout':function(){
			$(this).css('box-shadow','none');
		},
		'mouseup':function(){
			if(this.getAttribute('id')=='turnLeft')
				toLastMonth();
			else
				toNextMonth();
			if(LogStatu==1)
				getMonthInfo(addZero(P_YEAR)+'-'+addZero(P_MONTH));		//登录后方可查询对应月的签到信心
		}
	})
})
/**
 * 去上月
 */
function toLastMonth(){
	P_MONTH--;
	if(P_MONTH==0){
		P_MONTH=12;
		P_YEAR--;
	}
	refreshCalendar(P_YEAR,P_MONTH,LDateOLM,LDOLM);
}
/**
 * 去下月
 */
function toNextMonth(){
	P_MONTH++;
	if(P_MONTH==13){
		P_MONTH=1;
		P_YEAR++;
	}
	refreshCalendar(P_YEAR,P_MONTH,1,FDONM);
}
/**
 * 在js加载完之后加载的jQuery 
 * 部分属性是在之前js中定义的 而jQuery的bind是在加载完页面后便执行
 */
function jQueryBind(){
	$('.inTd').bind({
		'mouseenter':function(){
			if(this.getAttribute('month')!=1)
				$(this).css('background-color','rgb(165,165,255)');
			else
				$(this).css('background-color','rgb(230,230,255)');
		},
		'mouseout':function(){
			if(this.getAttribute('month')!=1)
				$(this).css('background-color','rgb(150,150,255)');
			else if(isPresentMonth&&$(this).text()==THIS_DAY)
				$(this).css('background-color','rgb(255,255,255)');
			else
				$(this).css('background-color','rgb(200,200,255)');
		},
		'mouseup':function(){
			P_DAY=$(this).text();
			if(this.getAttribute('month')==0)
				toLastMonth();
			else if(this.getAttribute('month')==2)
				toNextMonth();
			var date=P_YEAR+'-'+addZero(P_MONTH)+'-'+addZero(P_DAY);
			$('#dateShow').text(date);
			if(LogStatu==1)				//如果已经登录 则查询对应日期的签到情况
				getCheckInfo(date);
		}
	})
}
