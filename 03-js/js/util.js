function animate(obj,attr,target){
		clearInterval(obj.timer);
		var iSpeed =0;
		obj.timer=setInterval(function(){
			var current =parseFloat(getComputedStyle(obj,false)[attr]);
			if (attr=='opacity') {
				current=Math.round(current*100);
			}
			// current=current*100;
			if(current>target){
				iSpeed=-80;
			}else{
				iSpeed=80;
			}
			if (Math.abs(target-current)<Math.abs(iSpeed)) {
				if (attr=='opacity') {
					obj.style.opacity=target/100;
				}else{
					obj.style[attr]=target+'px';
				}
				obj.style.opacity=target/100;
				clearInterval(obj.timer);
			}else{
				if (attr=='opacity') {
				obj.style.opacity=(current+iSpeed)/100;
				}else{
				obj.style[attr]=current+iSpeed+'px';
				}				
			}			
		},30)	
	}

function getScrollTop(){
	return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
}
