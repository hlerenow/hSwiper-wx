const hSwiper=require("../../component/hSwiper/hSwiper.js");
var option={
	data:{
		//swiper插件变量
		hSwiperVar:{}
	},
	onLoad:function(){
	},
	onReady:function(){
		var swiper=new hSwiper({reduceDistance:60,varStr:"hSwiperVar",list:[1,2,3,4,5]});

		swiper.onFirstView=function(data,index){
			console.log("当前是第"+(index+1)+"视图","数据是："+data);
		};
		swiper.onLastView=function(data,index){
			console.log("当前是第"+(index+1)+"视图","数据是："+data);
		};
		swiper.afterViewChange=function(data,index){
			console.log("当前是第"+(index+1)+"视图","数据是："+data);			
		};
		swiper.beforeViewChange=function(data,index){
			console.log("当前是第"+(index+1)+"视图","数据是："+data);
		};

		//更新数据 
		setTimeout(()=>{
			console.log("3 s 后更新列表数据");
			//3 s 后更新列表数据
			this.setData({
				"hSwiperVar.list[0]":"修改"
			});
		}, 3000);



		setTimeout(()=>{
			console.log("5s后更新数据 并且更新视图");
			
			//5s后更新数据 并且更新视图
			var oldList=swiper.getList();
			swiper.updateList(oldList.concat([11,23,45]));			
		}, 5000);

	}
};

Page(option);