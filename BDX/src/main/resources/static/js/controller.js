var ScreenWidth=window.screen.availWidth-2;
$(function(){
	//设置body的尺寸
	$('body').css({
		'width':ScreenWidth,
		'height':0
	})
	//解决添加新闻板块中的右按钮左边距问题
	var buttons=$('#news input[type="button"]');
	$(buttons[1]).css('margin-left','-4px');
	//打开不同的操作
	$('.bigBox').attr('statu',0);
	$('.bigBox .boxTitle').bind({
		'click':function(){
			if($(this).attr('statu')==1){
				$(this).attr('statu',0);
				$(this).parents().children('.operation').slideUp(200);
			}
			else{
				$(this).attr('statu',1);
				$(this).parents().children('.operation').slideDown(200);
			}
		}
	})
})
