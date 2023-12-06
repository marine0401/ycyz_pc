<template>
	<view>
		<view class="box1">
			<view class="j1"><image class=icon src="../../../static/设备管理.png"></image></view>
			<view class="j2">
			<picker class="picker" @change="symbol_change" :range="symbol_array">
				<label class="lang">服务商标识符列表</label>
			</picker>
			</view>
			<view class="j3"></view>
		</view>
		<view class="box1" @click="n2">
			<view class="j1"><image class=icon src="../../../static/设备管理.png"></image></view>
			<view class="j2">创建用户</view>
			<view class="j3"></view>
		</view>
		<view class="box1" @click="n3">
			<view class="j1"><image class=icon src="../../../static/设备管理.png"></image></view>
			<view class="j2">创建设备</view>
			<view class="j3"></view>
		</view>
	</view>
</template>

<script>
	import common from '../../../m_Common/m_common.js'
	export default {
		data() {
			return {
				symbol_array:[],
				symbol_index:0,
			}
		},
		onLoad() {
			common.connect()
			
			this.getsymbollist()
			
		},
		methods: {
			symbol_change:function(e){
				
				this.symbol_index = e.target.value
				uni.request({
					url: 'http://47.100.200.181:8000/get_userdata', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						symbol: this.symbol_array[this.symbol_index],
						deviceid:Number(1) 
					},
					success: (res) => {
						if(res.data != ''){
							localStorage.setItem('token', res.data.symbol);
							localStorage.setItem('deviceid', res.data.deviceId);
							localStorage.setItem('userinfo', JSON.stringify(res.data));
							
							uni.navigateTo({
								url:"/pages/index/index"
							})
						}
					},
				})
			},
			getsymbollist(){
				uni.request({
							url: 'http://47.100.200.181:8000/get_symbol_list', // 路径
							method: 'POST', // 请求方法
							header: {
							    'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								
							}, //发送的数据
							success: (res) => {
								this.symbol_array =res.data
								
							},
						})
			},
			n2(){
				uni.navigateTo({
					url:"/pages/index/logon/logon"
				})
			},
			n3(){
				uni.navigateTo({
					url:"/pages/index/createdevice"
				})
			}
			
		}
	}
</script>

<style>
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
	.icon{
		width: 80rpx;
		height: 80rpx;
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
