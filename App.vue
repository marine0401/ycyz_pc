<script>
	import './mqttConfig.js'
	import common from "./m_Common/m_common.js"	
	
	export default {
		created(){
			 if (localStorage.getItem("store") ) {
			        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(localStorage.getItem("store"))))
			    } 
				
			    //页面刷新前触发
			    window.addEventListener("beforeunload",()=>{
			        localStorage.setItem("store",JSON.stringify(this.$store.state))
			    })
		},
		onLaunch: function() {
			console.log('App Launch')
			let token = localStorage.getItem('token')
			let deviceId = Number(1)
			console.log('token'+token)
			if(token){
				uni.request({
					url: 'http://47.100.200.181:8000/get_userdata', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						symbol: token,
						deviceid:Number(deviceId) 
					},
					success: (res) => {
						if(res.data != ''){
							localStorage.setItem('userinfo', JSON.stringify(res.data));
						}
					},
				})
			}else{
				uni.navigateTo({
					url:'/pages/index/login/login',
					success() {
						uni.clearStorage()
					}
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		globalData:{
			
			g_id:'',
			g_mqtt_data:"",
			g_lastdatatime:"",
			district:"",
		},
		methods:{
			watch:function(method,istr){
			                var obj=this.globalData
			                console.log(obj)
			                Object.defineProperty(obj,istr,{
			                configurable:true,
			                enumerable:true,
			                set:function(value){
			                    this._consumerGoodsStatus=value
			                    method(value)
			                },
			                get:function(value){
			                            return this._consumerGoodsStatus
			                        }
			                    })
			                }
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-page-body,html,body{
			height: 100%;
	}
</style>
