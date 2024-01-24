function showPostList(type){

    $(".show > span.active").removeClass("active");
    $(".show > span."+type).addClass("active");
    if(type=="grid"){
        $("#container-post").removeClass("list_detail");

    }
    else{
        $("#container-post").addClass("list_detail");

    }
}

$( document ).ready(function() {

    if($("#post_top_bar").length>0){
        if($.cookie("post_list")=="grid" || $.cookie("post_list")=="lines"){
            showPostList($.cookie("post_list"));
        }
        $(".show > span").click(function(){
            if(!$(this).hasClass("active")){
                var type=$(this).hasClass("grid")?"grid":"lines";
                $.cookie("post_list",type,{path:"/"});
                showPostList(type);
            }


            var $posttable = $('#container-post');
            $posttable.imagesLoaded( function() {
                $posttable.isotope({
                    // options
                    itemSelector: '.post',
                    layoutMode: 'masonry'
                });
            });

        });

    }

    $('select:visible').not('.keep_raw').select2({
        minimumResultsForSearch: -1
    });

    var $posttable = $('#container');
    $posttable.imagesLoaded( function() {
        $posttable.isotope({
            // options
            itemSelector: '.post',
            layoutMode: 'masonry'
        });
    });


    // Menu fixe au scroll

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if(scroll > 350){
            $("#top").addClass("active");
        }else{
            $("#top").removeClass("active");
        }

        $('#btn-up').click(function() {
            $('html,body').animate({scrollTop: 0}, 'slow');

        });

        // Bouton pour revenir au haut de page

        if(scroll > 350){
            $('#btn-up').fadeOut();
        }else{
            $('#btn-up').fadeIn(1000);
        }
    });

    var defaults={
        pauseOnAction: true,
        pauseOnHover: true,
        animation:'slide',
        animationSpeed: 1200,
        start:function(slider){
            if(slider.currentSlide)
                $(slider.slides[slider.currentSlide]).addClass('slide-ready');
            else
                $(slider).find('.slides').children().not('.clone').eq(0).addClass('slide-ready');
        },
        after:function(slider){
            $(slider.slides).filter('.slide-ready').removeClass('slide-ready');
            $(slider.slides[slider.currentSlide]).addClass('slide-ready');
        }
    };
    $('.slider_simple').each(function(){
        $(this).addClass('flexslider').flexslider($.extend(defaults,$(this).data()));
    });

    if($(document.body).hasClass('page-product')){
        function createSliderForSku(){
            var flexSliders = $('.flexslider1:visible');
            flexSliders.each(function(){
                var $slider = $(this);
                if($slider.find('.flex-viewport').length == 0){
                    $('.flexslider1:visible').flexslider({
                        animation: 'slide',
                        move:1,
                        slideshow: false,
                        slideshowSpeed : 2000,
                        animationSpeed : 500,
                        animationLoop: true,
                        minItems: 1,
                        maxItems: 1,
                        touch : false,
                        keyboard : false,
                        pauseOnHover: false,
                        controlNav: "thumbnails",
                        start:columnsHeight
                    });
                }
            })
        }

        $('body').on('productDeclinationChange',createSliderForSku);
        createSliderForSku();

        $(window).load(function() {

            $('#quantities input').change(function(e){
                var val=parseInt($(this).val());
                if(isNaN(val) || val<1)
                    $(this).val(1);
            });
            $('#quantities .plus').click(function(e){
                var input=$(this).closest('#quantities').find('input');
                var val=parseInt(input.val());
                if(isNaN(val) || val<1)
                    val=2;
                else
                    val++;
                input.val(val).trigger('change');
                e.preventDefault();
            });
            $('#quantities .moins').click(function(e){
                var input=$(this).closest('#quantities').find('input');
                var val=parseInt(input.val());
                if(isNaN(val) || val<1)
                    val=1;
                else if(val>1)
                    val--;
                input.val(val).trigger('change');
                e.preventDefault();
            });
            $('body').on('click','.btn-cart.buy',function(e){
                var input=$(this).closest('.productInList').find('#quantities input');
                var val=parseInt(input.val());
                if(isNaN(val) || val<1)
                    val=1;
                addCart({id:$(this).data('id'),qty:val});
                e.preventDefault();
            });

            $('.flexslider').flexslider({
                animation: 'slide',
                itemWidth: 200,
                move:1,
                slideshow: true,
                slideshowSpeed : 3000,
                animationSpeed : 1000,
                minItems: 1,
                maxItems: 5,
                touch : false,
                keyboard : false,
                pauseOnAction: true,
                animationLoop: true,

                pauseOnHover: true,
                controlNav: false,
                randomize:true,
                start:columnsHeight
            });
        });
    }

});
