var Commom = {};
Commom.goodsHtml = {};
Commom.goodsDomTemplate = null;
Commom.goodsHtml.untreated = null;
Commom.goodsHtml.passed = null;
Commom.goodsHtml.failed = null;
$(function(){
	Commom.registerToolBarBtn();

	Commom.previewBtnDom = $('.pages-btn').eq(0).prop('outerHTML');
	Commom.nextBtnDom = $('.pages-btn').eq(1).prop('outerHTML');

	Commom.initPageBtn();

	Commom.registerPageBtn();

	Commom.registerGoodBtn();

	Commom.registerToolBarSelect();

	Commom.registerClassBtn();

	/*Commom.goodsHtml.untreated = $(".goods-container ul").html();*/

	/*Commom.goodsDomTemplate = $(".goods-container li").eq(0).prop('outerHTML');*/


	Commom.goodsDomTemplate = 
	'<div class="good-container">'+
	'<div class="good-info">'+
	'<span style="letter-spacing: -1px;">作品编号:</span>'+
	'<span id="good-id" style="font-size: 13px;">232</span>'+
	'<span style="margin-left: 622px;letter-spacing: -1px;">最后修改时间:</span>'+
	'<span id="good-modified-time" style="font-size: 13px;margin-left: 6px;">2015-09-06</span>'+
	'</div>'+
	'<div style="background-color: #FFF;width: 960px;height: 198px;">'+
	'<div class="good-pic-div">'+
	'<div class="good-pic">'+
	'<img id="good-img-1" src="http://192.168.1.101:8888/static/photo.png">'+
	'</div>'+
	'<div class="good-pic">'+
	'<img id="good-img-2" src="http://192.168.1.101:8888/static/photo.png">'+
	'</div>'+
	'<div class="good-pic">'+
	'<img id="good-img-3" src="http://192.168.1.101:8888/static/">'+
	'</div>'+
	'<div class="good-stl">'+
	'</div>'+
	'</div>'+
	'<div class="good-info-for-detail">'+
	'<p id="good-name" style="font-size: 14px;font-weight: bold;margin-top: 22px;">jinx_暴走萝莉</p>'+
	'<p id="good-description" style="  font-size: 12px;font-weight: bold;margin-top: -1px;width: 260px;height: 32px;margin-bottom: 14px;color: #7A7A7A;">das</p>'+
	'<span id="good-price" style="font-size: 14px;color: #FF766F;">￥1.0</span>'+
	'<span id="good-type" style="margin-left: 17px;font-size: 13px;font-weight: bold;">stl文件</span>'+
	'<span id="good-file-size" style="margin-left: 8px;font-size: 13px;font-weight: bold;">0.738MB</span>'+
	'<div name="good-deny" class="good-btn" style="  float: left;margin-left: 30px;background-color: #D7D7D7;color: #767676;">驳回作品</div>'+
	'<div name="good-pass" class="good-btn" style="float: right;margin-right: 9px;">审核通过</div>'+
	'</div>style'+
	'</div>'+
	'</div>';

	Commom.registerShow3dBtn();
});


Commom.registerShow3dBtn = function(){
	$('.good-stl').click(function(){
		var thisGoodId = $(this).parents('.good-container').find('#good-id').html();
		l('id:'+thisGoodId);
		/*var fullscreenBtnDom = '<div class="fullscreen-btn"></div>'*/
		var show3dDom = '<div id="show-3d"></div>'
		$('.good-stl').each(function(index){
			/*$(this).html(fullscreenBtnDom);		   */
			$(this).html(null);		   
		});
		$(this).append(show3dDom);
		showStlFileInRemoteServer(thisGoodId , 'unpassed',  162, 162, 'show-3d');
		$('.good-stl').each(function(index){
			$(this).unbind('click');
		});
		Commom.registerShow3dBtn();
		$(this).unbind('click');
	});
}


Commom.registerToolBarBtn = function(){
	$('.tool-bar').children('div').eq(0).click(function(){
		$('.goods-container').show();
		$('.chat-container').hide();
		$(this).addClass('tool-bar-choosed').removeClass('tool-bar-not-choosed').siblings().removeClass('tool-bar-choosed');
	});

	$('.tool-bar').children('div').eq(1).click(function(){
		$('.goods-container').hide();
		$('.chat-container').show();
		$(this).addClass('tool-bar-choosed').removeClass('tool-bar-not-choosed').siblings().removeClass('tool-bar-choosed');
	});
}

Commom.registerGoodBtn = function(){
	$('#good-deny-infos').hover(function(){
		$(this).show();					   
	},function(){
		$(this).hide();					   
	});

	$('#good-pass-infos').hover(function(){
		$(this).show();					   
	},function(){
		$(this).hide();					   
	});

	$("[name|='good-deny']").hover(function(){
		var domOffset = $(this).offset();
		var infoWinTop = domOffset.top -$('#good-deny-infos').height() - parseInt($(this).css('padding-top'))+1;
		var infoWinLeft = domOffset.left - $('#good-deny-infos').width()/2 + $(this).width()/2; 
		$('#good-deny-infos').css('top', infoWinTop);
		$('#good-deny-infos').css('left', infoWinLeft);
		$('#good-deny-infos').show();
	},function(){
		$('#good-deny-infos').hide();
	});

	$("[name|='good-pass']").hover(function(){
		var domOffset = $(this).offset();
		var infoWinTop = domOffset.top -$('#good-pass-infos').height() - parseInt($(this).css('padding-top'))+1;
		var infoWinLeft = domOffset.left - $('#good-pass-infos').width()/2 + $(this).width()/2; 
		$('#good-pass-infos').css('top', infoWinTop);
		$('#good-pass-infos').css('left', infoWinLeft);
		$('#good-pass-infos').show();
	},function(){
		$('#good-pass-infos').hide();
	});

	$("[name|='good-deny']").click(function(){
		var workId = $(this).parents('.good-container').find('#good-id').html();					 
		workId = parseInt(workId);
		var denyReasonId = $("[name|='deny-reason']:checked").val()
		$.post('/adminer/pass_failed', {'id': workId, 'state': denyReasonId}, function(e){
			l('deny succeed');
			var goods = JSON.parse(e).works_auditing;
			Commom.appendGood(goods);
			Commom.initPageBtn();
			Commom.registerPageBtn();
			Commom.registerGoodBtn();
			Commom.registerShow3dBtn();
			Commom.goodsHtml.untreated = $(".goods-container ul").html();
		})
	});

	$("[name|='good-pass']").click(function(){
		var workId = $(this).parents('.good-container').find('#good-id').html();					 
		workId = parseInt(workId);
		var goodType = $('#good-type').val();
		var goodStyle = $('#good-style').val();
		$.post('/adminer/work_passing', {'id': workId, 'type_state': goodType, 'style_state': goodStyle}, function(e){
			l('pass succeed');
			var goods = JSON.parse(e).works_auditing;
			Commom.appendGood(goods);
			Commom.initPageBtn();
			Commom.registerPageBtn();
			Commom.registerGoodBtn();
			Commom.registerShow3dBtn();
			Commom.goodsHtml.untreated = $(".goods-container ul").html();
		})
	});
}


Commom.registerPageBtn = function(){
	var goodSum = $(".goods-container ul").find('li').length;
	var pageSum = (goodSum+1)/2;
	$('.pages-btn').click(function(){
		var btnVal = $(this).attr('value');

		// btn next and btn preview
		if(btnVal === '-1' || btnVal === '+1'){
			var nowPageNo;
			$('.pages-btn').each(function(index){
				if($(this).hasClass('choosed')){
					nowPageNo = $(this).attr('value');
					if((btnVal === '-1' && nowPageNo > 1)||(btnVal === '+1' && nowPageNo < goodSum/2)){
						var targPageNo = parseInt(nowPageNo)+parseInt(btnVal);
						$('.pages-btn').eq(targPageNo).click();
					}
					return false;
				}
			});
		}else{ // btn num
			var containerHeight = $(".goods-container ul").height();
			$(this).addClass('choosed').siblings().removeClass('choosed');
			$(".goods-container ul").animate({
				scrollTop: containerHeight*(btnVal-1)+'px'  //让body的scrollTop等于pos的top，就实现了滚动
			},0);
		}
	});
	$('.pages-btn').eq(1).click();
}


Commom.registerToolBarSelect = function(){
	$('.tool-bar-select').hover(function(){
		$('.tool-bar-select div').show();						   
		Commom.registerClassBtn();
	},function(){
		$('.tool-bar-select div').hide();						   
		$('.tool-bar-select div').eq(0).show();						   
	});
}


Commom.registerClassBtn = function(){
	$('.tool-bar-select').find('div').unbind('click');
	$('.tool-bar-select').find('div').click(function(){
		$(this).show().siblings().hide();
		var btnVal = $(this).attr('value');

		if(btnVal === '0'){

			/*if(Commom.goodsHtml.untreated === null){*/
			$.post('/adminer/word_list', {}, function(e){
				l('0:'+JSON.stringify(e));
				var goods = JSON.parse(e).works_auditing;
				Commom.appendGood(goods);
				Commom.initPageBtn();
				Commom.registerPageBtn();
				Commom.registerGoodBtn();
				Commom.registerShow3dBtn();
			})
			/*}else{*/
			/*$(".goods-container ul").html(Commom.goodsHtml.untreated);*/
			/*Commom.initPageBtn();*/
			/*Commom.registerPageBtn();*/
			/*Commom.registerGoodBtn();*/
			/*Commom.registerShow3dBtn();*/
			/*}*/
		}else if(btnVal === '1'){

			/*if(Commom.goodsHtml.passed === null){*/
			$.post('/adminer/has_failed', {}, function(e){
				l('1:'+JSON.stringify(e));
				var goods = JSON.parse(e).works_auditing;
				Commom.appendGood(goods);
				Commom.initPageBtn();
				Commom.registerPageBtn();
				Commom.removeGoodBtn();
				Commom.registerShow3dBtn();
				l('ov');
			})
			/*}else{*/
			/*$(".goods-container ul").html(Commom.goodsHtml.passed);*/
			/*Commom.initPageBtn();*/
			/*Commom.registerPageBtn();*/
			/*Commom.removeGoodBtn();*/
			/*Commom.registerShow3dBtn();*/
			/*}*/
		}else if(btnVal === '2'){

			/*if(Commom.goodsHtml.failed === null){*/
			$.post('/adminer/has_passed', {}, function(e){
				l('2:'+JSON.stringify(e));
				var goods = JSON.parse(e).works_auditing;
				Commom.appendGood(goods);
				Commom.initPageBtn();
				Commom.registerPageBtn();
				Commom.removeGoodBtn();
				Commom.registerShow3dBtn();
			})
			/*}else{*/
			/*$(".goods-container ul").html(Commom.goodsHtml.failed);*/
			/*Commom.initPageBtn();*/
			/*Commom.registerPageBtn();*/
			/*Commom.removeGoodBtn();*/
			/*Commom.registerShow3dBtn();*/
			/*}*/
		}
		var thisDom = $(this).prop('outerHTML');
		$(this).remove();
		$('.tool-bar-select').prepend(thisDom);
	});
}

Commom.initPageBtn = function(){
	l('even_1');
	var goodSum = $(".goods-container ul").find('li').length;
	var pageSum = (goodSum+1)/2;

	// make sure the goods sum is even number
	if(goodSum%2 === 1){
		var blankGoodDom = '<li><div style="width:960px;height:244px;"></div></li>'
		$(".goods-container ul").append(blankGoodDom);	
	}
	$('.pages-bar').html(null);
	$('.pages-bar').append(Commom.previewBtnDom);
	$('.pages-bar').append(Commom.nextBtnDom);
	for(var i=1; i<=pageSum; i++){
		var pageDom = '<div class="pages-btn" value="'+i+'">'+i+'</div>';
		$('.pages-btn').last().before(pageDom);
	}
	l('even');
}

Commom.appendGood = function(goods){
	$(".goods-container ul").html(null);
	goods.forEach(function(item, index){
		$(".goods-container ul").append(Commom.goodsDomTemplate);
		$(".goods-container li").eq(index).find('#good-id').html(item.id);
		$(".goods-container li").eq(index).find('#good-modified-time').html(item.modify_time);
		$(".goods-container li").eq(index).find('#good-img-1').attr('src', item.preview_1);
		$(".goods-container li").eq(index).find('#good-img-2').attr('src', item.preview_2);
		$(".goods-container li").eq(index).find('#good-img-3').attr('src', item.preview_3);
		$(".goods-container li").eq(index).find('#good-name').html(item.goods_name);
		$(".goods-container li").eq(index).find('#good-description').html(item.description);
		$(".goods-container li").eq(index).find('#good-price').html(item.goods_price);
		$(".goods-container li").eq(index).find('#good-type').html(item.type+'文件');
		$(".goods-container li").eq(index).find('#good-file-size').html(item.file_size+'MB');
	});
}

Commom.removeGoodBtn = function(){
	$(".goods-container li").each(function(index){
		$(this).find('.good-btn').each(function(index){
			$(this).remove();							  
		});
	});
}
