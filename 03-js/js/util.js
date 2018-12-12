
/**
* @param  {object} obj    [DOM节点对象]
* @param  {options[attr]} options   [属性和目标值的对象]
* @param  {boolean} isLinear [是否是匀速动画]
* @param  {number} options [动画结束时执行的函数]
*/
function animate(obj,options,isLinear,fnEnd){
//默认是匀速动画
if (isLinear==undefined) {
	isLinear=true;
}
//防止多次操作开启多个定时器
clearInterval(obj.timer);
//速度/步长
var iSpeed = 0; 
obj.timer = setInterval(function(){
	//代表是否终止所有动画
	var isStipAll=true;
	for(var attr in options){
		//代表是否终止当前动画，由于在循环定时器中，每次执行都会变成false，代表不终止当前动画
		var isStopCurrent=false;
		//获取当前最新的值
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		//opacity属性的处理，
		if(attr == 'opacity'){
			//1.乘以100是为了计算
			//2.四舍五入是为了计算
			current = Math.round(current*100);
		}
		//匀速动画处理
		if (isLinear) {
			//匀速动画速度的确定
			if(current>options[attr]){
			iSpeed=-10;
		}else{
			iSpeed=10;
		}
		//匀速动画终止条件
		if (Math.abs(options[attr]-current)<Math.abs(iSpeed)){
			//匀速动画终止后的处理；如果最后一次动画不够一个速度的话，直接达到目标值
			if (attr=='opacity') {
				obj.style.opacity=options[attr]/100;
			}else{
				obj.style[attr]=options[attr]+'px';
			}
			//代表终止当前的动画
			isStopCurrent=true;
		}else{
			//代表当前动画还没有结束，所以不能终止所有的函数
			isStipAll=false;
		}
		//减速动画的处理
		}else{
			//确定减速动画的速度
			iSpeed = (options[attr] - current)/10;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//减速动画终止条件
			if(!iSpeed){
				//代表终止当前的动画
				isStopCurrent=true;
			}else{
				//代表当前动画还没有结束，所以不能终止所有的函数
				isStipAll=false;
			}
		}	
		//如果终止当前的动画，运动		
		if(!isStopCurrent){
			if(attr == 'opacity'){
				obj.style.opacity = (current + iSpeed)/100 ;
			}else{
				obj.style[attr] = current + iSpeed + 'px';
			}				
		}
		//如果终止当前的动画，清除定时器		
	}
	if (isStipAll) {
		clearInterval(obj.timer);
		//动画执行完毕后执行函数
		typeof fnEnd=='function' && fnEnd();
	}		
},30)
}
function getScrollTop(){
	return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
}
function getScrollLeft(){
	return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft;
}
