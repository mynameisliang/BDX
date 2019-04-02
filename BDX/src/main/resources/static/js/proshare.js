$(function(){
	$('#countryField .project').bind({
		'mouseenter':function(){
			$(this).css({
				'background': 'linear-gradient(to bottom,rgb(255,255,0),rgb(120,120,255))',
				'color':'rgb(255,255,255)',
				'font-size':'22px'
			})
		},
		'mouseout':function(){
			$(this).css({
				'background': 'none',
				'color':'rgb(255,255,0)',
				'font-size':'20px'
			})
		}
	})
	$('#provinceField .project').bind({
		'mouseenter':function(){
			$(this).css({
				'background': 'linear-gradient(to bottom,rgb(0,255,2255),rgb(120,120,255))',
				'color':'rgb(200,255,255)',
				'font-size':'22px'
			})
		},
		'mouseout':function(){
			$(this).css({
				'background': 'none',
				'color':'rgb(0,255,255)',
				'font-size':'20px'
			})
		}
	})
	$('#otherField .project').bind({
		'mouseenter':function(){
			$(this).css({
				'background': 'linear-gradient(to bottom,rgb(125,255,125),rgb(120,120,255))',
				'color':'rgb(225,255,225)',
				'font-size':'22px'
			})
		},
		'mouseout':function(){
			$(this).css({
				'background': 'none',
				'color':'rgb(125,255,125)',
				'font-size':'20px'
			})
		}
	})
})
