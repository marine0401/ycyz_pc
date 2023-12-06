<template>
	<view class="right">
		<view class="box">
			<view class="b1"> 
				<picker @change="attribute_change" :range="attribute_array">
					<label>{{$t('attr')}}:</label>
					<label >{{attribute_array[attribute_index]}}</label>
				</picker>
			</view>
			<view class="b5">
				<view class="j2">当前设备：{{this.current_device}}</view>
				<view class="j3"></view>	
			</view>
			<view class="b5">
				<picker class="picker" @change="dev_id_change" :range="dev_id_array" :value="dev_id_index">
					<label class="lang">设备切换</label>
				</picker>
			</view>	
		</view>
		
		<view class="charts-box">
		  <scroll-view scroll-x="true">
			<qiun-data-charts type="mix" :opts="opts" :chartData="chartsDataLine" />  
		  </scroll-view>
		  <!-- 这里的type="demotype"演示了自定义图表类型的demo，您可以根据需求自己定义一种额外的图表类型 -->
		  
		  <!-- 如果不定义"demotype"这个图表类型，可以通过传递opts来覆盖line下的默认配置，如下 -->
		  <!-- <qiun-data-charts type="line" :opts="{extra:{line:{type:'curve'}}}" :chartData="chartsData.Line2"/> -->
		</view>
		 
		<view class="box">
			
			<view :class="[ selected == 0 ? 'b4' : 'b2']">
				<picker @change="day_change" :range="day_array">
					<label>{{$t('pastday')}}:</label>
					<label >{{day_array[day_index]}}</label>
					<label>{{$t('day')}}</label>
				</picker>	
			</view>
			<view :class="[ selected == 1 ? 'b4' : 'b2']" @click="b3">{{$t('average_week')}}</view>
			<view :class="[ selected == 2 ? 'b4' : 'b2']" @click="b4">{{$t('average_month')}}</view>
		</view>
		<view class="box1">
			<view class = "j1"><image class=icon src="../../../static/水温 (1).png"></image></view>
			<view class="j2" >{{$t('his1')}}{{text}}{{attribute}}{{$t('max')}}</view>
			<view class="j3">{{max}}</view>
		</view>
		<view class="box1">
			<view class = "j1"><image class=icon src="../../../static/水温 (2).png"></image></view>
			<view class="j2" >{{$t('his2')}}{{text}}{{attribute}}{{$t('min')}}</view>
			<view class="j3">{{min}}</view>
		</view>
		<view class="box1">
			<view class = "j1"><image class=icon src="../../../static/水温 (3).png"></image></view>
			<view class="j2" >{{$t('his3')}}{{text}}{{attribute}}{{$t('average')}}</view>
			<view class="j3">{{average}}</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	
import { parse } from 'uuid';
	export default {
		data() {
			return {
				current_device:"",
				dev_id_array:[],
				dev_id_index:0,
				dev_id:"1",
				deviceCount:0,
				hTemper:0,
				lTemper:0,
				hPh:0,
				lPh:0,
				hOxygen:0,
				lOxygen:0,
				text:this.$t('last_24h'),
				average:0,
				max:0,
				min:0,
				selected:0,
				opts : {
				dataLabel: false,
					xAxis: {
				        labelCount:5, //x轴显示的数量
				  },
				  yAxis:{
					showTitle:true,
					data:[
					 	{	
							titleFontSize:15,
							titleOffsetY:-5,
							titleOffsetX:160,
						}
					   ], 
					 
					   
				  },
				
				
				},
				chartsDataLine:{
						
						"categories": [],
						"series": [{
							"type":"line",
							"name": "温度",
							"data": [],
							"color":"#00aaff"
						},
							{
								"name": this.$t('strange_dot'),
								"data": [],
								"type": "point",
								"color": "#f04864"
							}	
						],
						
					
				},
				attribute:this.$t('temp'),
				devicename:"simulation",
				attribute_array:[this.$t('temp'),"PH",this.$t('oxygen')],
				attribute_index:0,
				device_array:["simulation","xianxiang","benin"],
				device_index:0,
				day_array:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
				day_index:0,
				day_shift:0,
			}
		},
		onReady() {
			var data = localStorage.getItem('userinfo')
			data = JSON.parse(data)
			this.deviceCount = data.deviceCount
			this.dev_id = getApp().globalData.g_id
			this.getdata(this.attribute,this.devicename,"day",this.day_shift,this.dev_id)
		},
		onLoad() {
			var data = localStorage.getItem('userinfo')
			data = JSON.parse(data)
			this.deviceCount = data.deviceCount
			this.device_array = [data.symbol]
			this.devicename = data.symbol
			this.hTemper=getApp().globalData._hTemper
			this.lTemper=getApp().globalData._lTemper
			this.hPh=getApp().globalData._hPh
			this.lPh=getApp().globalData._lPh
			this.hOxygen=getApp().globalData._hOxygen
			this.lOxygen=getApp().globalData._lOxygen
			

			var str = this.$t('history_chart')
			uni.setNavigationBarTitle({
			    title:str
			});
		},
		onShow() {
			this.setdeviceArray()
		},
		methods: {

			getdevicelist(symbol){
				uni.request({
						url: 'http://47.100.200.181:8000/get_device_list', // 路径
						method: 'POST', // 请求方法
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							symbol:symbol,
						}, //发送的数据
						success: (res) => {
							this.dev_id_array =res.data
							console.log("chart "+Number(getApp().globalData.g_id))
							this.current_device=this.dev_id_array[Number(getApp().globalData.g_id)-1]
							this.dev_id_index = Number(getApp().globalData.g_id)-1
						},
					})
			},
			setdeviceArray(){
				let token = localStorage.getItem('token')
				this.getdevicelist(token)
			},
			dev_id_change:function(e){
				this.dev_id_index = e.target.value
				this.dev_id=Number(this.dev_id_index) + 1
				this.selected = 0
				console.log("index"+this.dev_id_index)
				this.current_device=this.dev_id_array[this.dev_id_index]
				this.getdata(this.attribute,this.devicename,"day",this.day_shift,this.dev_id)
			},
			resolve(data){
				
				this.chartsDataLine["series"][0]["name"] = this.attribute
				var categories = [];
				var exception_categories = [];
				categories = JSON.parse(JSON.stringify(data.data.submission_date))
				this.chartsDataLine["categories"] = categories
				var value = [];
				var exception_value=[];
				
				value = JSON.parse(JSON.stringify(data.data.value))
				var temp = 0;
				var len = 0;

				for (let var1 in value) {
					temp = temp + value[var1]
					len = len + 1

 					if(this.attribute == "温度" ||this.attribute == "temperature"){
						if(value[var1]> this.hTemper | value[var1] < this.lTemper){
							exception_value.push(value[var1])
						}else{
							exception_value.push(null)
						}
						
					}
					else if(this.attribute == "溶解氧浓度"||this.attribute == "dissolved-oxygen"){
						if(value[var1]> this.hOxygen | value[var1] < this.lOxygen){
							exception_value.push(value[var1])
						}else{
							exception_value.push(null)
						}
						
					}else if(this.attribute == "PH"){
						if(value[var1]> this.hPh | value[var1] < this.lPh){
							exception_value.push(value[var1])
						}else{
							exception_value.push(null)
						}
					}
					
				}
				this.average = parseFloat(temp/len).toFixed(1);
				this.max = Math.max(...value).toFixed(1);
				this.min = Math.min(...value).toFixed(1);
				
				this.chartsDataLine["series"][0]["data"]=value
				this.chartsDataLine["series"][1]["data"]=exception_value
			},
			getdata(attribute,devicename,interval,shift_day,deviceid){
				if(interval == "day"){
					this.opts["yAxis"]["data"][0]["title"] = this.$t('last_24h')+attribute+this.$t('chart')+ this.$t('inthelast24')
				}else if(interval == "week"){
					this.opts["yAxis"]["data"][0]["title"] = this.$t('last_week')+attribute+this.$t('chart')+ this.$t('inthelastweek')
				}else if(interval == "month"){
					this.opts["yAxis"]["data"][0]["title"] = this.$t('last_month')+attribute+this.$t('chart')+ this.$t('inthelastmonth')
				}
				uni.request({
					url: 'http://47.100.200.181:8000/get_data', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					} ,
					data: {
						get_attribute: attribute,
						deviceName: devicename,
						time_interval: interval,
						day_shift:shift_day,
						deviceId:deviceid,
					},
				
						success: (res) => {
							this.resolve(res)
						}
				
			})
		},
		b4(){
			this.text = this.$t('history')
			this.selected = 2
			this.getdata(this.attribute,this.devicename,"month",this.day_shift,this.dev_id)
		},
		b3(){
			this.text = this.$t('history')
			this.selected = 1
			this.getdata(this.attribute,this.devicename,"week",this.day_shift,this.dev_id)
		},
		attribute_change:function(e){
			this.text = this.$t('last_24h')
			this.selected = 0
			this.attribute_index = e.target.value
			this.attribute=this.attribute_array[this.attribute_index]
			this.getdata(this.attribute,this.devicename,"day",this.day_shift,this.dev_id)
		},
		device_change:function(e){
			this.text = this.$t('last_24h')
			this.selected = 0
			this.device_index = e.target.value
			this.devicename=this.device_array[this.device_index]
			this.getdata(this.attribute,this.devicename,"day",this.day_shift,this.dev_id)
		},
		day_change:function(e){
			this.text = this.$t('last_24h')
			this.selected = 0
			this.day_index = e.target.value
			this.day_shift=this.day_array[this.day_index]
			this.getdata(this.attribute,this.devicename,"day",this.day_shift,this.dev_id)
		}   
		
	}
}
</script>

<style>
	.charts-box{
		
		margin-top: 100rpx;
		margin-bottom: 5rpx;
		
	}
	.box{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		background-color: aliceblue;
	}
	.box1{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.j1{
		width:10%;
		height: 80rpx;
	}
	.j2{
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
		margin-left: 30rpx;
	}
	.j3{
		width:20%;
		height: 80rpx;
		line-height: 70rpx;
		text-align: center;
		
	}
	.b1{
		width: 32%;
		height: 100rpx;
		color: black;
		background-color: skyblue;
		text-align: center;
		line-height: 100rpx;
		margin-right: 1rpx;
		
	}
	
	.b5{
		width: 34%;
		height: 100rpx;
		color: black;
		background-color: skyblue;
		text-align: center;
		margin-right: 1rpx;
		line-height: 100rpx;
	}
	
	.b4{
		width: 33%;
		height: 100rpx;
		color: black;
		line-height: 100rpx;
		background-color: skyblue;
		text-align: center;
		margin-right: 1rpx;
		margin-left: 1rpx;
	}
	.b2{
		width: 33%;
		line-height: 100rpx;
		height: 100rpx;
		color: black;
		background-color: grey;
		text-align: center;
		margin-right: 1rpx;
		margin-left: 1rpx;
		
	}
	.icon{
		width: 80rpx;
		height: 80rpx;
	}
	
</style>
