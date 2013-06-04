$(document).ready(function(){

	var screenWidth = $("#content").width(); //$(window).width();
	var screenHeight = $("#content").height(); //$(window).height();

	function Bug(x, y, radius, interval){
		this.x = x;
		this.y = y;
		this.interval = interval;
		this.radius = radius;

		var delay = setInterval(hideAndShow, interval);
		var curve;

		function hideAndShow(){

			if ($('#bug').css('display') != 'none') {
				$('#bug').toggle('slow');
			}
			var parent = $("#bug").parent();
			var height = parent.height();
			var width = parent.width();
			var radius = bug.radius;
			this.x = Math.floor(Math.random()*(width-2*radius))+radius;
			this.y = Math.floor(Math.random()*(height-2*radius))+radius;

			// if object is not displayed: 1. change position, 2. display objec
			// is it display: reverse sequence
			if ($("#bug").css('display') == 'none') {
				$("#bug").css({'left':this.x, 'top':this.y});
				$("#bug").toggle('slow');
				setTimeout(moveOnCurve, 1500);
			} else{
				//set delay to prevent "slowness" of function toggle
				setTimeout(function(){
				$("#bug").css({'left':this.x, 'top':this.y});
				}, 350);
			}
		}

		function moveOnCurve(){
			var o = document.getElementById('bug');

			var fromPoint = [this.x,this.y];
			var toPoint = getToPoint(fromPoint[0], fromPoint[1], bug.radius);
			var c1Curve = [fromPoint[0], toPoint[1]];
			var c2Curve = [toPoint[0], fromPoint[1]];

			curve = new CurveAnimator(fromPoint, toPoint, c1Curve, c2Curve);

		//	var o = document.getElementById('bug');
			o.style.position = 'absolute';

			curve.animate(3, function(point,angle){
				o.style.left = point.x+"px";
				o.style.top  = point.y+"px";
				o.style.transform =
			    o.style.webkitTransform =
			    o.style.MozTransform =
			    "rotate("+angle+"deg)";
			});
		}

		function getToPoint(x, y, radius){
			var minX = x - radius;

			//random x value between x-radius and x+radius
			var randomX = Math.floor(Math.random()*(2*radius))+minX;

			//using pythagoras, to calculate y value of the point
			var y2 = Math.round(Math.sqrt(Math.pow(radius,2)-Math.pow((x-randomX),2)));
			y2 *= Math.round(Math.random()) * 2 - 1
			y2 +=y;

			var toPoint = [randomX, y2];
			return toPoint;
		}

		this.destroy = function(){
			playAudio('bug-audio');
			curve.stop();
			$("#bug").css('background-image', 'url(./public/img/blood.png)');
			clearInterval(delay);
			setTimeout(function(){
				$('#bug').toggle();
			},3000);
			setTimeout(function(){
				$("#bug").css('background-image', 'url(./public/img/bug1.png)');
				delay = setInterval(hideAndShow, bug.interval);
			}, 2*60*1000);
		}
	};

	$('.animated_object').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$('#info').show('slow');
	});

	$('#info').hammer().on('doubletap', function(ev){
		ev.preventDefault();
		$(this).fadeOut();
	});


	$(function(){
		$('.object_draggable').draggable({snap: '#snappable', snapMode:'inner'});
	});

	//	behavior of #bug
	var bug = new Bug(100, 100, Math.floor(screenWidth*0.25), 4000)
	$('#bug').hammer().on('tap', function(ev){
		ev.preventDefault();
		bug.destroy();
	});

	//coffee
	$('.bean').hammer().on('tap', function(ev){
		ev.preventDefault();
		$('.bean').draggable();
		$('.bean').addClass('draggable');
		$('.bean .draggable').draggable({snap: '#cup-snap', snapMode: 'inner'});
	});

	var counter = 0;
	$('.bean').on('dragstop', function(event, ui){
		var right = (ui.position.left + $(this).width());
		var bottom = (ui.position.top + $(this).height());

		if (bottom >205 && bottom < 230 && right < 303 && right > 115) {
			$(this).toggle();
			$(this).draggable({disabled: true});
			counter++;
		}

		if (counter == 4) {

		}
	});

});