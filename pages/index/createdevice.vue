<template>
	<view class="logon-content">
	<view class="user">
		<uni-icons class ="i1" type="person" color="#808080" size="25" ></uni-icons>
		<input type="text" placeholder="请输入服务商标识符" :value="symbol" @input="clearInput" />
		<uni-icons class ="i2" type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
	</view>
	<view class="user">
		<uni-icons class ="i1" type="location" color="#808080" size="25" ></uni-icons>
		<input type="text" placeholder="请输入设备名" :value="devicename" @input="clearInput2" />
		<uni-icons class ="i2" type="empty" color="#808080" size="25" ></uni-icons>
	</view>
	
	<button class="confirm-btn" @click="confirm">确认</button>
	</view>
	
</template>

<script>
export default {
	data(){
			return {
			
			}
		},
		onReady() {
			
		},
		methods: {
			confirm(){
				uni.request({
					url: 'http://47.100.200.181:8000/createdevice', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						symbol: this.symbol,
						devicename:this.devicename
					},
					success: (res) => {
						uni.showToast({
							title: '创建成功',
							icon: 'none'
						})
					}
					
				})
			},
			clearInput: function(event) {
				this.symbol = event.detail.value;
			},
			clearInput2: function(event) {
				this.devicename = event.detail.value;
			},
			
		},
		}
</script>

<style>
	.logon-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
		height: 1800rpx;
		background-image: url("https://tse2-mm.cn.bing.net/th/id/OIP-C.4dWd0IWc2BKiKpHj1rS2OAHaNK?pid=ImgDet&rs=1");
		background-size: cover;
		box-sizing: border-box;
	}
	.user{
		display: flex;
		flex-direction: row;
		align-self: center;
		border-bottom: black;
		border-color: black;
		border-style: solid;
		border-width: 1rpx;
		border-top: 0;
		border-right: 0;
		border-left: 0;
	}
	.i1{
		position: relative;
		top: 20rpx;
	}
	.i2 {
		position: relative;
		top: 20rpx;
		right: 30rpx;
	}
	.logon-content input {
		position: relative;
		height:100rpx;
		width: 800rpx;
		background: #F8F8F8;
		border-radius: 50rpx;
		text-align: left;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 15px;
		margin-left: auto;
		margin-right: auto;
		background-color: transparent;
	}
</style>