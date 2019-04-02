

function tecShare(){
    let bigBoxs=$('.bigBox');
	for(let i=0;i<bigBoxs.length;i++){
		$(bigBoxs[i]).attr('statu',0);
		$(bigBoxs[i]).attr('size',25);
	}
	$('.bigBox').bind({
		'mouseenter':function(){
			$(this).attr('statu',1);
			ts_increase(this);
			$(this).css({
				'text-shadow':'0 0 30px rgb(0,255,255)'
			})
		},
		'mouseleave':function(){
			$(this).attr('statu',-1);
			ts_decrease(this);
			$(this).css({
				'text-shadow':'none'
			})
		}
	});
}
window.onload=tecShare;
let biggestSize=35,smallestSize=25;
function ts_increase(bigBox){
	if(bigBox.getAttribute('statu')==1){
        let size=bigBox.getAttribute('size');
		if(size<biggestSize){
			size=size*1+1;
			$(bigBox).css({
				'font-size':size+'px'
			});
			$(bigBox.getElementsByTagName('p')[0]).css({
				'font-size':size-10+'px'
			});
			$(bigBox).attr('size',size);
			setTimeout(function(){
				ts_increase(bigBox);
			},5);
		}
		else
			$(bigBox).attr('statu','0');
	}
}
function ts_decrease(bigBox){
	if(bigBox.getAttribute('statu')==-1){
        let size=bigBox.getAttribute('size');
		if(size>smallestSize){
			size=size*1-1;
			$(bigBox).css({
				'font-size':size+'px'
			});
			$(bigBox.getElementsByTagName('p')[0]).css({
				'font-size':size-10+'px'
			});
			$(bigBox).attr('size',size);
			setTimeout(function(){
				ts_decrease(bigBox);
			},15);
		}
		else
			$(bigBox).attr('statu','0');
	}
}
