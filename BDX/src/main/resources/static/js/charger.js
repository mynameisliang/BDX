
let ScreenWidth=window.screen.availWidth-7;
let sourceBack;
let messages,Nlists,Mlists,listpage=0,isVisitor=true;//Message页面 ：所有信息、当前页数、是否是显示访客信息
let loaded=[0,0,0,0,0],num_of_page=0;
function charger_load(){
	//禁止页面后撤
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

//	var xhr=CreateOtherXHR();
//	if(xhr)
    let scroller=document.getElementById('scroller');

	sourceBack=scroller.style.background;
	//设置body的尺寸
	$('body').css({
		'width':ScreenWidth,
		'height':0

	});
	//设置选择器的宽度
//	$('#chooser').css('width',ScreenWidth*0.1);
	//设置标记
    let choices=$('.choice'),contents=$('.content');
	//1顶部颜色、2底部颜色
    let colors1=['180,220,255','180,255,220','220,180,255','220,255,180','255,220,180','255,180,220']
	,colors2=['102,204,255','102,255,204','204,102,255','204,255,102','255,204,102','255,102,204'];
	for(let v=0;v<choices.length;v++){
		$(choices[v]).attr('sign',v);
//		$(choices[v]).attr('sourceBack',document.getElementById('chooser').style.backgroundColor);
		$(contents[v]).css({
			'background':'linear-gradient(to bottom,rgb('+colors2[v]+'),rgb('+colors1[v]+'))',
			'border-top':'7px solid rgb('+colors2[v]+')',
			'color':'white'
		})
	}
	//初始页面

    let present=0;

	show(contents[present],present);
	loadPage(present);	//先显示再加载
	//滚动条监听
	$(window).scroll(function(){

        let fixed=$(window).scrollTop()<=$('#logo').height()?0:1;
		$('#scroller').css({
			'position':fixed?'fixed':'absolute',
			'margin-top':fixed?$('#logo').height()*-1:'0'
		})
	});

//	crease_onmousemove(scroller,'marginleft','per',4,0,-75,-75,5);
	crease_onmousemove(scroller,'marginleft','px',15,0,-300,-300,5);
//	$("#chooser").bind({
//		'mouseover':function(){
//			$(this).css('z-index','0');
//		},
//		'mouseout':function(){
//			$(this).css('z-index','1');
//		}
//	})
	$('.choice').bind({
		'mouseup':function(){

            let sign=parseInt($(this).attr('sign'));

			if(sign!=present){
				setAttr(contents[sign],'marginleft',"%",0);
				increase(contents[present],'marginleft',5,'%',100,10);
				setTimeout(function(){
					$(contents[present]).hide(); //隐藏上一个页面
					show(contents[sign],sign);	//显示当前页面
					loadPage(sign);				//加载当前页面
					present=sign;
				},300);
			}
			this.parentElement.onmouseleave();
		},
		'mouseenter':function(){
			$(this).css({
				'background':'rgb(255,255,255)',
				'color':'rgb('+colors2[$(this).attr('sign')]+')'
			})
		},
		'mouseleave':function(){
			$(this).css({
				'background':sourceBack,
				'color':'white'
			})
		}
	})

}

//加载页面
function loadPage(v){
	if(!loaded[v]){
		loaded[v]=1;
		switch(v){

		case 0://新闻添加浏览页
            let n_inputs=$('#news input[type="text"]'),n_area=$('#news textarea');
			$("#n_upload").bind({
				'mouseup':function() {
                    ajax("/charger/addNews", "GET",{
                        title: $(n_inputs[0]).val(),
                        about: $(n_inputs[1]).val(),
                        content: $(n_area).val()
                    }, function (result) {
                        if (result== 1)
                            alert("上传成功");
						else
							alert("上传失败");
                    }, "上传新闻");
                }
			});

			$('#n_clear').bind({
				'mouseup':function(){
					$('#news input[type="text"]').val("");
					$('#news textarea').val("");
				}
			});

            let NList=$('#NList');
			for(let i=0;i<6;i++){
				NList.append('<div class="list"></div>')
			}
			Nlists=$("#NList .list");//获取显示框
			break;
		case 1://留言查看页
            let mchoice_statu=1;
			MchoiceChange($('#Mchoice1'),0);
			MchoiceChange($('#Mchoice2'),1);
			// getVisitorMessage();


			$('#Mchoice1').bind({
				'mouseup':function(){
					if(mchoice_statu==2){
						MchoiceChange($(this),0);
						MchoiceChange($('#Mchoice2'),1);

						// getVisitorMessage();
						get_num_of_messages_pages(true)
					}

					mchoice_statu=1;
				}
			});

			$('#Mchoice2').bind({
				'mouseup':function(){
					if(mchoice_statu==1){
						MchoiceChange($(this),0);
						MchoiceChange($('#Mchoice1'),1);

						// getMemberMessage();
						get_num_of_messages_pages(false)
					}
					mchoice_statu=2;
				}
			});
			$('#turnLeft').bind({
				'mouseup':function(){
					// appendMessage(-1);
					set_messages_of_page(-1)
				}
			});
			$('#turnRight').bind({
				'mouseup':function(){
					// appendMessage(1);
					set_messages_of_page(1)
				}
			});

			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
			default:
		}
	}
}
function MchoiceChange(obj,is){
		if(is==1)
			obj.css({
				'color': 'white',
				'background': 'rgb(0,255,200)'
			});
		else
			obj.css({
				'color': 'rgb(0,255,200)',
				'background': 'white'
			})
	}
//显示并初始化页面
function show(obj,sign){
	switch(sign){//sign是选择器的属性标识，所以是字符串
	case 0:break;
	case 1:
		listpage=0;

        let MList=$('#MList');
        for(let i=0;i<15;i++){
            MList.append('<div class="list"></div>')
        }
		// getVisitorMessage();
        Mlists=MList.find(".list");//find方法寻找子元素 获取显示框
		get_num_of_messages_pages(true);
		break;
	}
	$(obj).slideDown(200);
}


//获取信息页数（初始化、切换用户类型时调用）
function get_num_of_messages_pages(visitor) {

	clearList(Mlists);
	isVisitor=visitor;
	let kind=visitor?"visitor":"member";
    get("/charger/num/"+kind,function (result) {
        num_of_page=result;
		set_messages_of_page(0)
    },"获取"+kind+"信息数目");
}
//获取page页的信息（切换信息页数）
function set_messages_of_page(next) {

    $('#turnLeft').text("上一页");
    $('#turnRight').text("下一页");
    //判断是否可以执行
    let not=false;
    switch(next){
        case -1:
            if(not=listpage==0){
                $('#turnLeft').text('没了……');
            }break;
        case 1:
            if(not=listpage>=num_of_page){
                $('#turnRight').text('没了……');
            }
    }
    if(not)
        return;
	//获取信息并处理
	let kind=isVisitor?"visitor":"member",page=listpage+next;
    get("/charger/message/"+kind+"/"+page,function (result) {

        listpage=0;
        // messages=result;
        $('#pageSign').text("第"+page+"页");
        //根据不同情况处理信息
        for(let i=0;i<Mlists.length;i++){
        	if(i>=result.length)
        		break;

        	let label=$(Mlists[i]),m=result[i],info="";
            if(isVisitor){
                $(label).text(m.message+" · EMAIL："+m.email);
                info="QQ/微信："+m.qq+" · 电话："+m.tel+" · 时间："+m.date_time;
			}
            else{
            	$(label).text("成员："+m.member.name+" · "+m.message);
                info="时间："+m.date_time;
			}

            $(label).tooltip({text:info})
        }
    },"获取留言");

}
function appendMessage(next){//添加访客留言
	$('#turnLeft').text("上一页");
	$('#turnRight').text("下一页");

    let not=false;

	switch(next){
	case -1:
		if(not=listpage==0){
			$('#turnLeft').text('没了……');
		}break;
	case 1:
		if(not=messages.length-(Mlists.length*(listpage+1))<=0){
			$('#turnRight').text('没了……');
		}
	}
	if(not)
		return;

	clearList(Mlists);
	listpage+=next;
	$('#pageSign').text("第"+(listpage+1)+"页");
	for(let i=0;i<Mlists.length;i++){
        let real_index=i+listpage*Mlists.length;
		if(real_index<messages.length-1){
			let l=$(Mlists[i]),m=messages[real_index];
			$(l).text(m.message+" · ");
			if(isVisitor)
				$(l).tooltip("QQ/微信："+m.qq+" · 电话："+m.tel+" · 邮箱："+m.email);
			else
				$(l).tooltip("");

            // let parts=messages[real_index].split("|");
			// $(Mlists[i]).text(parts[2]);
			// $(Mlists[i]).attr("info_",parts[0]);
			// $(Mlists[i]).tooltip({text: parts[1]});
//			var iparts=parts[0].split(","),info;
//

//			if(isVisitor)
//				info=iparts[1]+" · :"+iparts[3]+" · :"+iparts[4];
//			else
//				info=iparts[1]+" · Tel:"+iparts[2];
//			$(Mlists[i]).tooltip({text: info});
		}else{
			break;
		}
	}
}
function clearList(lists){

	for(let i=0;i<lists.length;i++){
		$(lists[i]).text("");
		$(lists[i]).tooltip({text:'————'});
	}
}

window.onload=charger_load;
