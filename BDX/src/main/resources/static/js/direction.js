var increaseStatu=1;
ScreenWidth=window.screen.availWidth;
function wayload(){
	var boxs=$('.Outbox');
	for(var i=0;i<boxs.length;i++){
		$(boxs[i]).css('margin-left',(ScreenWidth-$(boxs[i]).width())/2);
		$(boxs[i].getElementsByClassName('border')[0]).attr('length',50);
		$(boxs[i].getElementsByClassName('border')[0]).attr('statu',0);
	}
	
	$('.Outbox').bind({
		'mouseenter':function(){
			$(this.getElementsByClassName('border')[0]).attr('statu',1)
			dr_increase(this.getElementsByClassName('border')[0],this);
			$(this.getElementsByClassName('border')[0]).css({
				'box-shadow':'0 0 20px rgb(0,255,255)'

			});

			var dir=this.id=='PythonWay'?'right':'left';
			$(this).css({
				'color':'white',
				'background':'linear-gradient(to '+dir+',rgb(120,120,255),rgb(180,180,180))'
			})
		},
		'mouseleave':function(){
			$(this.getElementsByClassName('border')[0]).attr('statu',-1)
			dr_decrease(this.getElementsByClassName('border')[0],this);
			$(this.getElementsByClassName('border')[0]).css({
				'box-shadow':'none'
			});

			$(this).css({
				'color':'rgb(102,204,255)',
				'background':'none'
			})
		}
	})
}
window.onload=wayload;

var shortBoder=20,longBorder=85;
function dr_increase(border,outbox){
	if(border.getAttribute('statu')==1){
		var length=border.getAttribute('length');
		if(length<longBorder){
			length=length*1+5;
			marginTop=150-(1.5*length);
			$(border).css({
				'height':length+'%',
				'margin-top':marginTop+'px'
			});
			$(outbox).css({
				'box-shadow':'0 0 '+(length-shortBoder)+'px rgb(0,255,255)'
			});
			$(border).attr('length',length);
			setTimeout(function(){
				dr_increase(border,outbox);
			},10)
		}else{
			$(border).attr('statu',0);
		}
	}
}
function dr_decrease(border,outbox){
	if(border.getAttribute('statu')==-1){
		var length=border.getAttribute('length');
		if(length>shortBoder){
			length=length*1-5;
			marginTop=150-(1.5*length);
			$(border).css({
				'height':length+'%',
				'margin-top':marginTop+'px'

			});
			$(outbox).css({
				'box-shadow':'0 0 '+(length-shortBoder)+'px rgb(0,255,255)'
			});
			$(border).attr('length',length);
			setTimeout(function(){
				dr_decrease(border,outbox);
			},10)
		}else{
			$(border).attr('statu',0);
		}
	}
}
