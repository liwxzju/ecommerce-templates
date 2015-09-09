(function(){$.msgBox=function(title,msg,callback){if(msg&&typeof msg==="function"){callback=msg;}
GenerateHtml(title,msg);btnOk(callback);btnNo();};$.msgBox.mini=function(txt,time,callback){var str="<div id='msgBoxMini'></div>";$('body').append(str);var msgBoxMini=$('#msgBoxMini'),_time=1400;if(time&&typeof time=='number')_time=time;msgBoxMini.css({'min-height':'18px','min-width':'100px','position':'fixed','left':'50%','top':'50%','z-index':'9999','font-size':'16px','padding':'40px 50px','border-radius':'4px','box-shadow':'0px 0px 12px 2px #aaa','background':'rgba(121,208,206,.9)','color':'#fff','border':'3px solid #f9f9f9','text-align':'center'});var _w=msgBoxMini.outerWidth(true),_h=msgBoxMini.outerHeight(true);msgBoxMini.css({'margin-left':-_w/2,'margin-top':-_h/2});this.show=(function(){msgBoxMini.text(txt);msgBoxMini.show();setTimeout(function(){msgBoxMini.fadeOut(function(){msgBoxMini.remove();if(typeof time=='function'){time();}else if(typeof callback=='function'){callback();}});},_time);})();};var GenerateHtml=function(title,msg){var _html="";_html+='<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">'+title+'</span>';if(msg&&typeof msg!=="function"){_html+='<div id="mb_msg">'+msg+'</div>';}else{_html+='<textarea style="resize:none;" placeholder="请输入信息" id="mb_text" row="3"></textarea>';}
_html+='<div id="mb_btnbox">';if(msg&&typeof msg=="function"){_html+='<input id="mb_btn_no" type="button" value="取消" />';}
_html+='<input id="mb_btn_ok" type="button" value="确定" />';_html+='</div></div>';$("body").append(_html);GenerateCss();};var GenerateCss=function(){$("#mb_box").css({width:'100%',height:'100%',zIndex:'99999',position:'fixed',filter:'Alpha(opacity=60)',backgroundColor:'black',top:'0',left:'0',opacity:'0.6'});$("#mb_con").css({zIndex:'999999',width:'340px',position:'fixed',backgroundColor:'White',borderRadius:'10px'});$("#mb_tit").css({display:'block',fontSize:'14px',color:'#444',padding:'10px 15px',backgroundColor:'#DDD',borderRadius:'10px 10px 0 0',borderBottom:'3px solid #009BFE',fontWeight:'bold'});$("#mb_msg").css({padding:'40px 20px',lineHeight:'20px',color:"#444",borderBottom:'1px dashed #DDD',fontSize:'13px',textAlign:'center'});$("#mb_text").css({padding:'10px',lineHeight:'20px',color:"#444",height:'60px',width:'250px',margin:"10px 35px",border:'none',fontSize:'14px',outline:'none',overflow:'auto',borderBottom:'1px dashed #DDD'});$("#mb_btnbox").css({margin:'15px 0 10px 0',textAlign:'center'});$("#mb_btn_ok,#mb_btn_no").css({width:'85px',height:'30px',color:'white',border:'none',backgroundColor:'#168bbb',cursor:'pointer'});$("#mb_btn_no").css({"marginRight":"30px",background:"#ddd",color:"#666"});var _widht=document.documentElement.clientWidth;var _height=document.documentElement.clientHeight;var boxWidth=$("#mb_con").width();var boxHeight=$("#mb_con").height();$("#mb_con").css({top:(_height-boxHeight)/2+"px",left:(_widht-boxWidth)/2+"px"});};var btnOk=function(callback){$("#mb_btn_ok").on('click',function(){_msgTxt=$("#mb_text").val();$("#mb_box,#mb_con").remove();if(typeof(callback)==='function'){callback();}
return _msgTxt;});};var btnNo=function(){$("#mb_btn_no").on('click',function(){$("#mb_box,#mb_con").remove();return false;});};})();$(function(){var contact_btn=$('.contact-btn'),no_invite=$('.no-invite'),contact_wrap=$('.contact-info-wrap'),contact_close=$('.contact-close'),chat_box=$('.contact-wrap'),chat_btn=$('.contact-service-btn'),sign_input=$('.sign-input'),register_next=$('.register-next'),register_btn=$('.register-btn'),login_btn=$('.login-btn'),back_prev=$('.back-prev'),signIn_remeber=document.getElementsByClassName('signIn-remeber')[0],input_play_box=$('.input-play-box'),signIn=$('.signIn'),signUp=$('.signUp'),phone_register,phone_code;var uphone=getCookie('uphone');if(uphone){$('.is_registered').val(uphone);}
contact_btn.on('click',function(){contact_wrap.show();});no_invite.on('click',function(){contact_wrap.show();});contact_close.on('click',function(){contact_wrap.hide();});chat_btn.on('click',function(){contact_wrap.fadeOut();chat_box.fadeIn();});signUp.on('click',function(){input_play_box.animate({'left':0});signHeadCut($(this));});signIn.on('click',function(){input_play_box.animate({'left':-500});signHeadCut($(this));});function signHeadCut(_this){var _parent=_this.parent(),_siblings=_this.parent().siblings();if(_parent.hasClass('fr')){_this.removeClass('f16').addClass('f20');_siblings.find('a').removeClass('f20').addClass('f16');_parent.removeClass('fr').addClass('fl');_siblings.removeClass('fl').addClass('fr');}}
(function(){var bindphoneResult=[],signUpResult=[],signInResult=[],validResult=[],isRemeber=false,pw,pwagin;sign_input.on('blur',function(){var _this=$(this),_index=_this.parent().index(),_parents=_this.parent().parent().attr('data-p'),_next=_this.next(),_ts=_next.find('span'),_txt=_this.val(),_name=_this.attr('valid-type'),reg;switch(_name){case'signUp-phone':reg=/^1[3-8]+\d{9}$/;break;case'signUp-invitecode':reg=/^\d{4}$/;break;case'signUp-name':reg=/([\s\S]*)/;break;case'signUp-pw':pw=_this.val();reg=/^[a-zA-Z0-9_]{6,18}$/;break;case'signUp-pwagin':pwagin=_this.val();reg=/^[a-zA-Z0-9_]{6,18}$/;break;}
if(_txt&&reg.test(_txt)){validResult[_index]=true;if(_name=='signUp-pwagin'){if(pw!=pwagin){_next.slideDown();_this.addClass('active');validResult[_index]=false;}}
if(_this.hasClass('is_registered')){$.post('/account/check_phone',{'phone':_txt},function(e){result=JSON.parse(e);if(result['status']=='TRUE'){_next.slideUp();_this.removeClass('active');signInResult[0]=true;}else{_next.slideDown();_this.addClass('active');_ts.text('手机号未被注册');signInResult[0]=false;}});}
if(_this.hasClass('is_registered_r')){$.post('/account/check_phone',{'phone':_txt},function(e){result=JSON.parse(e);if(result['status']=='TRUE'){_next.slideDown();_this.addClass('active');_ts.text('手机号已被注册');signInResult[0]=false;}else{_next.slideUp();_this.removeClass('active');signInResult[0]=true;}});}
if(_this.hasClass('invitecode')){var _this=$(this);phone_register=_this.parents('.sign-bindphoto').find('.sign-input').eq(0).val();code_register=_this.parents('.sign-bindphoto').find('.sign-input').eq(1).val();$.post('/account/check_code',{'phone':phone_register,'code':code_register},function(e){result=JSON.parse(e);if(result['status']=='TRUE'){_next.slideUp();_this.removeClass('active');signInResult[1]=true;}else{_next.slideDown();_this.addClass('active');signInResult[1]=false;}});}
if(_this.hasClass('is_username')){var _this=$(this);username=_this.parents('.sign-signUp').find('.sign-input').eq(0).val();$.post('/account/check_username',{'username':username},function(e){result=JSON.parse(e);if(result['status']=='FALSE'){_next.slideUp();_this.removeClass('active');signInResult[0]=true;}else{_next.slideDown();_this.addClass('active');_ts.text('该用户名已被注册');signInResult[0]=false;}});}
if(!_this.hasClass('is_registered')&&!_this.hasClass('is_registered_r')&&!_this.hasClass('invitecode')&&!_this.hasClass('is_username')&&!_this.hasClass('login-upw')){if(_next.css('display')=='block'){_next.slideUp();_this.removeClass('active');}}}else{if(_this.hasClass('is_registered')){_ts.text('手机号格式不正确');}else if(_this.hasClass('is_registered_r')){_ts.text('手机号格式不正确');}
validResult[_index]=false;_next.slideDown();_this.addClass('active');}
switch(_parents){case'bindphone':bindphoneResult=validResult;break;case'signUp':signUpResult=validResult;break;case'signIn':signInResult=validResult;break;}});register_next.on('click',function(){testNoBlur($(this));if(bindphoneResult[0]&&bindphoneResult[1]){input_play_box.animate({'left':-250});}});register_btn.on('click',function(){var _this=$(this);testNoBlur(_this);username=_this.parents('.sign-signUp').find('.sign-input').eq(0).val();pwd=_this.parents('.sign-signUp').find('.sign-input').eq(1).val();if(signUpResult[0]&&signUpResult[1]&&signUpResult[2]){$.post('/account/u_register',{'phone':phone_register,'code':code_register,'username':username,'password':pwd},function(e){result=JSON.parse(e);if(result['status']=='FAILURE'){$.msgBox.mini('注册失败，请重新注册');}else{$.msgBox.mini('注册成功，请登陆');input_play_box.animate({'left':-500});signIn.removeClass('f16').addClass('f20');signUp.find('a').removeClass('f20').addClass('f16');signIn.parent().removeClass('fr').addClass('fl');signUp.parent().removeClass('fl').addClass('fr');}});}});back_prev.on('click',function(){input_play_box.animate({'left':0});});login_btn.on('click',function(){var _this=$(this),_input=_this.parents('.sign-signIn').find('.sign-input'),phone=_input.eq(0).val(),pwd=_input.eq(1).val(),pwd_ts=_input.eq(1).next().find('span');testNoBlur(_this);if(signIn_remeber.checked){isRemeber=true;}else{isRemeber=false;}
if(signInResult[0]&&signInResult[1]){$.post('/account/u_login',{'phone':phone,'password':pwd},function(e){result=JSON.parse(e);if(result['status']=='FAILURE'){pwd_ts.text('密码错误，请重新输入');_input.eq(1).addClass('active');_input.eq(1).next().slideDown();}else{if(isRemeber){addCookie('uphone',phone,10);}
window.location.assign('/shop/home');}});}});function testNoBlur(_this){var _len=_this.parent().find('.sign-empty-box').length,_inputs=_this.parent().find('.sign-input');for(var i=0;i<_len;i++){if(_inputs.eq(i).val()==''||_inputs.eq(i).val()==null){_inputs.eq(i).next().slideDown();_inputs.eq(i).addClass('active');}}}}());function addCookie(name,value,expiresDays){var cookieString=name+"="+escape(value);if(expiresDays>0){var date=new Date();date.setTime(date.getTime+expiresDays*24*3600*1000);cookieString=cookieString+"; expires="+date.toGMTString();}
document.cookie=cookieString;}
function getCookie(name){var strCookie=document.cookie,arrCookie=strCookie.split("; ");for(var i=0;i<arrCookie.length;i++){var arr=arrCookie[i].split("=");if(arr[0]==name)return arr[1];}
return"";}})
function imgSlider(s_ul,s_uli,s_oli,sSpeed,prev,next){var oul=$(s_ul),ali=$(s_uli),numli=$(s_oli),prev=$(prev),next=$(next),oliWidth=$(s_uli).width(),_now=0,_now2=0,timer=null;$(s_ul).css('width',$(s_uli).width()*$(s_uli).length);numli.click(function(){var index=$(this).index();_now=index;_now2=index;$(this).addClass('active').siblings().removeClass('active');oul.animate({'left':-oliWidth*index},500);clearInterval(timer);timer=setInterval(aSlider,sSpeed);});if(next){function stopT(both){both.mouseover(function(){clearInterval(timer);}).mouseout(function(){timer=setInterval(aSlider,sSpeed);});}
stopT(next);stopT(prev);next.click(function(){aSlider();});prev.click(function(){if(_now==0){ali.eq(numli.size()-1).css({'position':'relative','left':-oul.width()});_now=numli.size()-1;}else{_now--;}
_now2--;numli.eq(_now).addClass('active').siblings().removeClass('active');oul.animate({'left':-oliWidth*_now2},500,function(){if(_now==numli.size()-1){ali.eq(numli.size()-1).css('position','static');oul.css('left',-oliWidth*(numli.size()-1));_now2=numli.size()-1;}});});}
timer=setInterval(aSlider,sSpeed);function aSlider(){if(_now==numli.size()-1){ali.eq(0).css({'position':'relative','left':oul.width()});_now=0;}else{_now++;}
_now2++;numli.eq(_now).addClass('active').siblings().removeClass('active');oul.animate({'left':-oliWidth*_now2},500,function(){if(_now==0){ali.eq(0).css('position','static');oul.css('left',0);_now2=0;}});}
$(s_ul).mouseover(function(){clearInterval(timer);}).mouseout(function(){timer=setInterval(aSlider,sSpeed);});}