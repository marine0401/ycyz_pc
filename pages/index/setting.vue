<template>
	<view class="page">
		<view class="box1" @click="alarm_set(salinity_code,salinity_set,salinity_placehodertext)">
			<view class="j1"><image class=icon src="../../static/盐度.png"></image></view>
			<view class="j2">盐度设置</view>
			<view class="j3"></view>
		</view>
		<view class="box1" @click="alarm_set(altitude_code,altitude_set,altitude_placehodertext)">
			<view class="j1"><image class=icon src="../../static/海拔.png"></image></view>
			<view class="j2">海拔设置</view>
			<view class="j3"></view>
		</view>
		<view class="box1" @click="save()">
			<view class="j1"><image class=icon src="../../static/海拔.png"></image></view>
			<view class="j2">保存设置</view>
			<view class="j3"></view>
		</view>
	</view>
	
</template>

<script>
	import common from '../../m_Common/m_common.js'
	export default {
		data(){
			return{
				salinity_code:'100,',
				salinity_set:'设备盐度设置',
				salinity_placehodertext:'请输入盐度值',
				altitude_code:'101,',
				altitude_set:'设备海拔设置',
				altitude_placehodertext:'请输入海拔',
			}
		},
		
		methods:{
			
			alarm_set(code,titletext,placeholdertext){
				var symbol = localStorage.getItem('token')
				uni.showModal({
					title: titletext,
					cancelColor: "#FF0606",
					placeholderText: placeholdertext,
					content: '',
					type:"number",
					editable: true,
					success: function (res) {
						var data = "1,"+code+ res.content
						var topic = "/device_" + symbol + "/control";
						console.log(topic)
						common.publishData(topic, data);
					}
			})
		},
		save(){
			var data = "1,103,1"
			var symbol = localStorage.getItem('token')
			var topic = "/device_" + symbol + "/control";
			common.publishData(topic, data);
		}
	}
}	
</script>

<style>
	.page{
		height: 100%;
	}
	.icon{
		width: 80rpx;
		height: 80rpx;
	}
	.box1{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.box1:hover{
		background-color: darkgray;
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
</style>