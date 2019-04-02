/**
 * 1：children方法获得的仅仅是元素一下级的子元素，即：immediate children。
 * 2：find方法获得所有下级元素，即：descendants of these elements in the DOM tree
 * 3：children方法的参数selector 是可选的（optionally），用来过滤子元素，但find方法的参数selector方法是必选的。 
 */
var parts,page=1,allpage=0,pageWidth,RON=false,loadTime=1;
$(document).ready(function(){
	$('#mainImg').css('background-position',(ScreenWidth-900)/2);
	//暗夜降临
	$('.Dark').css({
		'width':ScreenWidth,
		'height':window.screen.availHeight

	});
	$('#scroller').attr('pages',1);		//设置页数属性 暂时为1
	parts=$('.newsPanel').html().split('devide');//通过‘devide’标识分割标题
										//获取新闻标签html代码
	$('#scroller').html('');			//清空滚动板
	pageWidth=ScreenWidth*0.672;		//获取新闻页宽度
	pageWidth+=60-pageWidth%30;
	getTitles();						//获取新闻标题和关于
	$('#scoller').attr('margin-left',0);//设置左边距属性
	$('#scoller').attr('statu',0);		//设置滑动状态属性
	$('.turn').bind({
		'mousedown':function(){
			$(this).css({
				'background':'rgb(150,150,255)'
			})
		},
		'mouseup':function(){
			$(this).css({
				'background':'none'
			})
		},
		'click':function(){
			$('#turnLeft').text('上一页');
			$('#turnRight').text('下一页');
			if(this.id=='turnLeft'){
				if(page>1){
					page-=1;
					$('#scroller').attr('statu',1);
					lastNewsPage(document.getElementById('scroller'),pageWidth,1);
				}else
					$('#turnLeft').text('没有了…');
			}
			else{
				if(page<allpage){
					page+=1;
					$('#scroller').attr('statu',-1);
					nextNewsPage(document.getElementById('scroller'),pageWidth,1);
				}else
					$('#turnRight').text('没有了…');
			}
			turnCheck();
		}
	});
    let inBlank=1;

	$('.Dark .Detail').bind({
		'mouseenter':function(){
			inBlank=0;
		},
		'mouseout':function(){
			inBlank=1;
		}
	});

	$('.Dark').bind({
		'click':function(){
			if(inBlank)
				$(this).fadeOut(200);
		}	
	})

});
function addNewsPage(num,news){
	console.log("NEW PAGE");

	allpage++;
	$('#pageSign').text('第'+page+'页,共'+allpage+'页');
    let scroller=$('#scroller');
    let pages=document.getElementById('scroller').getAttribute('pages');
	scroller.css({
		'width':pages*(pageWidth+100)+'px'	//设置scroller宽度
	});
	scroller.attr('pages',pages*1+1);		//设置scroller属性加一
    let allItem='';

	for(let i=0;i<num;i++){
		allItem+=parts[0];
		allItem+=news[i].about+"·"+news[i].title;//标题
		allItem+=parts[1];
		allItem+=news[i].id;//序号
		allItem+=parts[2];
	}
	scroller.append("<div class='newsPanel'>"+allItem+"</div>");
	$('.newsPanel').css('width',pageWidth+'px');	//对元素设置在创建此元素之后

	$('.newsItem').attr('border_width',1);			//设置渐变条宽度百分比
	$('.newsItem').attr('border_statu',0);			//设置渐变条渐变状态

    $('.newsItem').attr('id',0);			//设置渐变条渐变状态
	$('.newsItem').unbind();						//先解绑事件

	$('.newsItem').bind({							//绑定事件
		'mouseenter':function(){
            let s=$(this).children('.back_scroll')[0];

			if(!existStatuAttr(s,'width'))
				setAttr(s,'width','%',1);
			else
				setStatu(s,'width',1);
			increase(s,'width',3,'%',97,5);
		},
		'mouseleave':function(){
			let s=$(this).children('.back_scroll')[0];
			setStatu(s,'width',-1);
			decrease(s,'width',3,'%',1,5);
		},
		'mouseup':function(){
			$('#news_page').fadeIn(200);
			ajax('/news_detail',"GET",{
				id:$(this).find(".news_id").text()
			},function(result){
				$('#newsDetail').html("作者："+result.author.name+"&emsp;关于："+result.about+"&emsp;日期："+result.date_time
					+"<br><h3>"+result.title+"</h3>"
					+"<hr/><br>"+result.content);//显示内容
			},'appending news');
		}
	})
}
function lastNewsPage(panel,width,order){
	if(panel.getAttribute('statu')==1){
       let margin = panel.getAttribute('margin-left');
        if(margin%width!=0||order==1){
			margin=margin*1+30;
			$(panel).css({
				'margin-left':margin
			});
			$(panel).attr('margin-left',margin);
			setTimeout(function(){
				lastNewsPage(panel,width,0);
			},5);
		}
		else
			$(panel).attr('statu',0);
	}
}
function nextNewsPage(panel,width,order){
	//TODO 检查是否还有新闻
	if(panel.getAttribute('statu')==-1){

        let margin = panel.getAttribute('margin-left');
        if(margin%width!=0||order==1){
			margin=margin*1-30;
			$(panel).css({
				'margin-left':margin
			});

			$(panel).attr('margin-left',margin);
			setTimeout(function(){
				nextNewsPage(panel,width,0);
			},5);
		}
		else
			$(panel).attr('statu',0);
	}
}
function turnCheck(){//TODO 根据实情判断
	$('#pageSign').text('第'+page+'页,共'+allpage+'页');
}

function getTitles(){
	//先移除所有内容
    $('#scroller').html("");

	ajax("/news","GET",{
		// loadTime:loadTime
		page:page
	},function (result) {
		let toSet=new Array(7),index=0;
		for(let v=0; v<result.length; v++){
			if(v%7==0){
				if(toSet[0]!=null)
					addNewsPage(7,toSet);
				toSet=new Array(7);
				index=0
			}
            toSet[index]=result[v];
			index++
		}
        if(toSet[0]!=null)
            addNewsPage(index,toSet);
    },"请求新闻")

}