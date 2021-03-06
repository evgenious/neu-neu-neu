var toggle,
    impressumToggle = true,
    myImpressum = new impressumSlide();

$(document).ready(function () {
if (Modernizr.mq('screen and (min-width: 1025px)')) {     
addCustomScroll();
}    
});

$(window).resize(function() {
if (Modernizr.mq('screen and (min-width: 1025px)')) {    
addCustomScroll();}else{
removeCustomScroll();
} 
});


//Slim-------------------------------
function addCustomScroll(){   
$('.content').slimScroll({
    position: 'right',
    height: 'auto',
    color: '#fff',
    size: '5px',
    railVisible: false,
    alwaysVisible: false
});
} 

function removeCustomScroll(){
$('.content').slimScroll({destroy: true});
$('.content').attr('style', '');
}

//Impressum-------------------------------

$(".impressumBtn, .closeBtn").click(function() {
impressumToggle = !impressumToggle;
if(Modernizr.mq('screen and (min-width: 768px)')){    
myImpressum.desktop();
} else {
myImpressum.mobile();
}
});



//Klick Neu-------------------------------
$('.start').click(function () {
var el = $(this);
if (el.hasClass("open")) {
return;
    } else {
slide(el, false);
    }
});

//Klick Button -------------------------------
$('.cbutton').click(function () {
var el = $(this).parent(".start");
if ($(this).hasClass("closex")) {
        slide(el, true);
    } else {
        slide(el, false);
    }
});



function slide(el, toggle) {

    var btn = el.children("button");
    var height = el.height() - 160;
    this.ease = [100, 16];

    if (toggle === true) {

        btn.removeClass("closex").addClass("cbutton-click");

        el.velocity("reverse", {
            complete: function () {
                el.removeClass("open");
                btn.removeClass("cbutton-click");
            }
        });
        el.children("span").velocity("reverse");
        el.children("a").velocity("reverse");

    } else {

        el.addClass("open");
        btn.addClass("cbutton-click closex");

        el.velocity({
            marginTop: -height
        }, {
            duration: 400,
            delay: 50,
            easing: this.ease,
            complete: function () {
                btn.removeClass("cbutton-click");
                $(".content").css("height", height);
            }
        });

        el.children("a").velocity({
            translateY: "130px"
        }, {
            duration: 400,
            delay: 50,
            easing: this.ease
        });

        el.children("span").addClass("catHead").velocity({
            translateY: "130px",
            fontSize: "24px",
            fontWeight: "700"
        }, {
            duration: 400,
            delay: 50,
            easing: this.ease
        });

    }
}


function impressumSlide(){   
    
    this.desktop = function(){
    console.log (impressumToggle);   
    if (impressumToggle === false) {

        var slideTiles = "<div class='row row-no-padding slide-tiles'><div class='col-md-3 col-md-offset-3'></div><div class='col-md-3'></div><div class='col-md-3'></div>";

        $("body").find(".row:first-of-type").after(slideTiles);

        $("body").find(".slide-tiles div:nth-child(1)").velocity({skewY: "35deg"}, {duration: 0});
        $("body").find(".slide-tiles div:nth-child(2)").velocity({skewY: "-35deg"}, {duration: 0});
        $("body").find(".slide-tiles div:nth-child(3)").velocity({skewY: "-35deg"}, {duration: 0});

        $("body").find(".slide-tiles").children("div").each(function (i) {
        $(this).velocity({top: "-100%", position: "fixed", skewY: "0deg"}, 
        {duration: 400,delay: i * 30,complete: function () {
        if (i >= 2) {$(".impressum").velocity({opacity: 1}, {display: "block", duration: 50});}}, easing: "easeOut"});
        });
        
    } else {
        console.log("close");
        $(".impressum").velocity({opacity: 0}, {display: "none",duration: 0});
        $("body").find(".slide-tiles").children("div").each(function (i) {
        $(this).velocity("reverse", {complete: function () {
        if (i >= 2) {$("body").find(".slide-tiles").remove();
        $(".closeBtn").removeClass("cbutton-click");
        }}});})
    }
    }
    
    this.mobile = function(){
    $(".impressum").velocity({marginTop: "20px"}, {duration: 0});    
    if (impressumToggle === false) {  
    $(".impressum").velocity({opacity: 1, marginTop: "0"}, {display: "block", duration: 200});    
    } else {
    $(".impressum").velocity({opacity: 0, marginTop: "20px"}, {display: "none", duration: 200});
    $(".closeBtn").removeClass("cbutton-click");    
    }    
    }
}
