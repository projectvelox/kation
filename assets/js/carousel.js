var onSwipe = function (el, callback){
    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 30,
        restraint = 100,
        allowedTime = 300,
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir){};
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        swipedir = null;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
    }, false);
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint)
                swipedir = (distX < 0)? 'left' : 'right';
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint)
                swipedir = (distY < 0)? 'up' : 'bottom';
        }
        handleswipe(e, swipedir);
    }, false)
};
$.fn.swipe = function () {
    /* This is to enable swiping in bootstrap carousel*/
    this.each(function () {
        var element = this;
        if(!$(element).data('swipe-carousel')){
            onSwipe(element, function (e, direction) {
                if(direction == 'left') {
                    $(element).carousel('next');
                    e.preventDefault();
                }
                else if(direction == 'right'){
                    $(element).carousel('prev');
                    e.preventDefault();
                }
            });
            $(element).data('swipe-carousel', true);
        }
    });
};


$(document).ready(function(){
	$('.carousel').swipe();

	$('#bgvid').on('loadstart', function (event) {
    	$(this).addClass('loading');
 	});
});

