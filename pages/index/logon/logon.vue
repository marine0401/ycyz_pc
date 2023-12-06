<template>
	<view>
		<view class="logon-content">
			<view class="logon-title">
				{{$t('logon')}}
			</view>
			<view class="user">
				<uni-icons class ="i1" type="person" color="#808080" size="25" ></uni-icons>
				<input type="text" :placeholder="account_p" :value="account" @input="clearInput" />
				<uni-icons class ="i2" type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
			</view>
			<view class="user">
				<uni-icons class ="i1" type="location" color="#808080" size="25" ></uni-icons>
				<input type="text" placeholder="请输入渔场名" :value="district" @input="clearInput2" />
				<uni-icons class ="i2" type="empty" color="#808080" size="25" ></uni-icons>
			</view>
			<view class="user">
				<uni-icons class ="i1" type="location" color="#808080" size="25" ></uni-icons>
				<input type="text" placeholder="请输入英文标识符" :value="symbol" @input="clearInput3" />
				<uni-icons class ="i2" type="empty" color="#808080" size="25" ></uni-icons>
			</view>
			<view class="password">
				<uni-icons class ="i1" type="locked" color="#808080" size="25" ></uni-icons>
				<input type="eye-filled" :placeholder="pwd_p"  v-model="passwordValue1" :password="showPassword" @input="isEyeIcon" />
				<uni-icons class ="i2" :type="iconType" color="#808080" size="25" v-if="showEyeIcon" @click="changePassword"></uni-icons>
			</view>	
			<view class="password">
				<uni-icons class ="i1" type="locked" color="#808080" size="25" ></uni-icons>
				<input type="eye-filled" :placeholder="pwd_p_a"  v-model="passwordValue2" :password="showPassword" @input="isEyeIcon"/>
				<uni-icons class ="i2" :type="iconType" color="#808080" size="25" v-if="showEyeIcon" @click="changePassword"></uni-icons>
			</view>	
			
			<!-- <view class="code-img-wrapper">
				<uni-icons class ="i1" type="checkbox" color="#808080" size="25" ></uni-icons>
				<input type="text" :placeholder="picture_p" :value="validate" @input="clearInput1" />
				<canvas style="width:350rpx;height:86rpx;" canvas-id="canvas" @click="updateImageCode"></canvas>
			</view> -->
			<button class="logon-btn" @click="submit">{{$t('confirm')}}</button>
			
		
		</view>
	</view>
</template>

<script>
	import { Mcaptcha  } from '@/src/utils/mcaptcha'
	export default {
		data() {
			return {
				account_p:this.$t('account_p'),
				pwd_p:this.$t('pwd_p'),
				pwd_p_a:this.$t('pwd_p_a'),
				picture_p:this.$t('picture_p'),
				account:"",
				passwordValue1:"",
				passwordValue2:"",
				district:"",
				symbol:"",
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮	
				validate:"",
				iconType:"eye-slash",
				showEyeIcon:false,
			}
		},
		onReady() {
			 this.mcaptcha = new Mcaptcha({
			     el: 'canvas',
			     width: 80,
			     height: 35,
			     createCodeImg: ""
			   });
		},
		methods: {
			// 刷新验证码
			updateImageCode() {
			  this.mcaptcha.refresh()
			},
			isEyeIcon:function(event){
				if (event.detail.value.length > 0) {
					this.showEyeIcon = true;
				} else {
					this.showEyeIcon = false;
				}
			},
			changePassword: function() {
				if(this.showPassword){
					this.iconType ="eye";
				}else{
					this.iconType = "eye-slash"
				}
				this.showPassword = !this.showPassword;
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.account = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearInput2: function(event) {
				this.district = event.detail.value;
			},
			clearInput3: function(event) {
				this.symbol = event.detail.value;
			},
			clearInput1: function(event) {
				this.validate = event.detail.value;
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.account = '';
				this.showClearIcon = false;
			},
			// 提交前校验图形验证码
			submit() {
				if(this.account == ""){
					return uni.showToast({ title: this.$t('account_p') })
				}
				if(this.passwordValue1=="" || this.passwordValue2=="" ){
					return uni.showToast({ title: this.$t('pwd_p') })
				}
				
				// if(this.validate == ""){
				// 	return uni.showToast({ title: this.$t('picture_p') })
				// }
				 
				/* let valid = this.mcaptcha.validate(this.validate)
				if(!valid) {
					return uni.showToast({ title: this.$t('wrong_pic') })
				} */
				if(this.passwordValue1 != this.passwordValue2){
					return uni.showToast({ title: this.$t('dismatch') })
				}
				uni.request({
					url: 'http://47.100.200.181:8000/logon', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					} ,
					data: {
						account: this.account,
						password: this.passwordValue1,
						district: this.district,
						symbol:this.symbol
					}, //发送的数据
					success: (res) => {
							//存储token
							if(res.data == 1){
								uni.showToast({
									title: this.$t('logon_success'),
									icon: 'none'
								})
								setTimeout(uni.navigateTo({
									url:"/pages/index/Navigator/Navigator"
								}),100000,"")
							}
							else {
								uni.showToast({
									title: '注册失败，账户已存在',
									icon: 'none'
								})
							}
					}
				})
			  
			}
		}
	}
</script>

<style >
	
	//#ifdef H5
	.logon-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
		height: 1800rpx;
		background-image: url("https://tse2-mm.cn.bing.net/th/id/OIP-C.4dWd0IWc2BKiKpHj1rS2OAHaNK?pid=ImgDet&rs=1");
		background-size: cover;
		box-sizing: border-box;
	}
	.logon-title {
		margin-top: 100rpx;
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;	
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
		width: 20%;
		margin-left: 1300rpx;
	}
	.password{
		display: flex;
		flex-direction: row;
		border-bottom: black;
		border-color: black;
		border-style: solid;
		border-width: 1rpx;
		border-top: 0;
		border-right: 0;
		border-left: 0;
		width: 20%;
		margin-left: 1300rpx;
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
	.code-img-wrapper{
		display: flex;
		flex-direction: row;
		border-bottom: black;
		border-color: black;
		border-style: solid;
		border-width: 1rpx;
		border-top: 0;
		border-right: 0;
		border-left: 0;
		width: 20%;
		margin-left: 1300rpx;
	}
	.logon-btn {
		width: 400rpx;
		height: 60rpx;
		background: #00ff7f;
		border-radius: 36rpx;
		color: #fff;
		font-size: 45rpx;
		text-align: center;
		line-height: 60rpx;
		align-self: center;
		bottom: 60rpx;
		margin-top: 200rpx;
	}
	
//#endif

	//#ifdef MP-WEIXIN
	.logon-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
		height: 1280rpx;
		background-image: url("https://tse2-mm.cn.bing.net/th/id/OIP-C.4dWd0IWc2BKiKpHj1rS2OAHaNK?pid=ImgDet&rs=1");
		background-size: cover;
		box-sizing: border-box;
	}
	.logon-title {
		margin-top: 100rpx;
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;	
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
	.password{
		display: flex;
		flex-direction: row;
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
	.code-img-wrapper{
		display: flex;
		flex-direction: row;
	}
	.logon-btn {
		width: 400rpx;
		height: 60rpx;
		background: #00ff7f;
		border-radius: 36rpx;
		color: #fff;
		font-size: 45rpx;
		text-align: center;
		line-height: 60rpx;
		align-self: center;
		bottom: 60rpx;
		margin-top: 200rpx;
	}
//#endif

</style>
