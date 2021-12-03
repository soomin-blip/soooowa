$(function () {
    
    var $container = $('.image-sequence'),
    $images = $container.find('img'),

    $frameLength = $images.length,
    $currentFrame = 0,

    $counter = 0,
    $velocity = 0,

    $timer = null;



    $container.on('mousewheel', function(event) {
        console.log(event.deltaY);
        if(event.deltaY < 0) {
            $velocity += 1.5;
        }else{
            $velocity -= 1.5;
        }

        startAnimation();
    });

    function startAnimation(){
        if(!$timer){
            $timer = setInterval(animateSequence, 1000/30); 
        } 
    }

    function stopAnimation(){
        clearInterval($timer);
        $timer = null;
    }

    function animateSequence(){
        var nextFrame ;
        $velocity =  $velocity * 0.9;
        
        
        if( -0.00001 < $velocity && $velocity < 0.00001 ){
            stopAnimation();
        } else{
            $counter = ($counter + $velocity) % $frameLength;
            console.log($counter);
        }
        nextFrame = Math.floor($counter);

        $images.eq($currentFrame).hide();
        $images.eq(nextFrame).show();
        $currentFrame = nextFrame;

    }




	$(window).resize(function(){
		var wind = $(this),
				windowWidth = wind.width(),
				windowHeight = wind.height(),
				imageRatio = 864/486,  //배경이미지의 가로세로 비율
				browserRatio = windowWidth/windowHeight;
						
						
		if(imageRatio > browserRatio) {
					$container.css({
						height: '100%',
						width: windowHeight * imageRatio,
						top:0,
						left : (windowWidth - windowHeight * imageRatio)/2
					});
				} else {
					$container.css({
						width: '100%',
						height: windowWidth / imageRatio,
						left:0,
						top : (windowHeight - windowWidth / imageRatio)/2
					});					
					
				}
				
			});
			
			$(window).trigger('resize');
  
});
