var ScreenWidth=window.screen.availWidth-7;
$(function(){
    //禁止页面后撤
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

	//设置body的尺寸
	$('body').css({
		'width':ScreenWidth,
		'height':window.screen.availHeight
	})
	$('#submit').width($('input[type="text"]').width()+3);
	$('#submit').height($('input[type="text"]').height());
	$('#submit').css('marginLeft',$('input[type="text"]').css('marginLeft'));
});
function check(){
	let inputs=$('.in');
	if(isRightPass($(inputs[0]).val())){
		if(isRightPass($(inputs[1]).val())){
			$('#number').val($(inputs[0]).val());
			$('#password').val($(inputs[1]).val());
			return true;
		}
	}
	$('.in').css({
		'border-color': '#ff0000'
	});
	return false;
}