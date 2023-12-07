<template>
	
		<view class ="page">
			<navigator  class = "first_page">{{$t('basic')}}</navigator>
			<view class="box4">
				<view class="box3">
					<view class= "box3_i1"  @click="attribute_set('temperature','温度手动输入','请输入当前时间温度',0b100000)"><image class=icon src="../../static/温度.png"></image>
					<text class= "box3_text1">{{temperature}}</text>
					</view>
					<view class= "box3_i1" @click="attribute_set('ph','PH手动输入','请输入当前时间PH',0b010000)" ><image class=icon src="../../static/酸值软测量.png"></image>
					<text class= "box3_text1">{{ph}}</text>
					</view>
					<view class= "box3_i1" @click="attribute_set('oxygen','溶解氧浓度手动输入','请输入当前时间溶解氧浓度',0b001000)" ><image class=icon src="../../static/溶氧.png"></image>
					<text class= "box3_text1">{{oxygen}}</text>
					</view>
					<view class= "box3_i1" @click="attribute_set('psu','盐度手动输入','请输入当前时间盐度',0b000100)"><image class=icon src="../../static/盐度.png"></image>
					<text class= "box3_text1">{{psu}}</text>
					</view>
					<view class= "box3_i1" @click="attribute_set('orp','氧化还原电位手动输入','请输入当前时间氧化还原电位',0b000010)"><image class=icon src="../../static/氧化还原电位.png"></image>
					<text class= "box3_text1">{{orp}}</text>
					</view>
					<view class= "box3_i1" @click="attribute_set('nh3','氨氮浓度手动输入','请输入当前时间氨氮浓度',0b000001)" ><image class=icon src="../../static/水质氨氮.png"></image>
					<text class= "box3_text1"></text>
					</view>
				</view>
				<view class="box3">
					<view class= "box3_i2" @click="data_accquisition_mode_button(0b100000)">
					<text class= "box3_text2">{{$t('temp')}}( °C )</text>
					<view :class = "[((data_accquisition_mode&0b100000)==0b100000) ? 'circle-button-green' :'circle-button-red']"></view>
					</view>
					<view class= "box3_i2" @click="data_accquisition_mode_button(0b010000)">
					<text class= "box3_text2">{{$t('ph')}}</text>
					<view :class = "[((data_accquisition_mode&0b010000)==0b010000) ? 'circle-button-green' :'circle-button-red']"></view>
					</view>
					<view class= "box3_i2" @click="data_accquisition_mode_button(0b001000)">
					<text class= "box3_text2">{{$t('oxygen')}}(mg/L)</text>
					<view :class = "[((data_accquisition_mode&0b001000)==0b001000) ? 'circle-button-green' :'circle-button-red']"></view>
					</view>
					<view class= "box3_i2" @click="data_accquisition_mode_button(0b000100)">
					<text class= "box3_text2">{{$t('salinity')}}(‰)</text>
					<view :class = "[((data_accquisition_mode&0b000100)==0b000100) ? 'circle-button-green' :'circle-button-red']"></view>
					</view>
					<view class= "box3_i2" @click="data_accquisition_mode_button(0b000010)">
					<text class= "box3_text2">ORP(mV)</text>
					<view :class = "[((data_accquisition_mode&0b000010)==0b000010) ? 'circle-button-green' :'circle-button-red']"></view>
					</view>
					<view class= "box3_i2" @click="data_accquisition_mode_button(0b000001)">
					<text class= "box3_text2">氨氮浓度(mg/L)</text>
					<view :class = "[ ((data_accquisition_mode&0b000001)==0b000001) ? 'circle-button-green' :'circle-button-red']"></view>
					</view>
				</view>
				
			
				<view class="lasttime">最近一次数据时间：{{this.lastdatatime}}</view>
			</view>
		
			
			
			<view class="box5">
			<view class="scroll">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
						@scrolltolower="lower" @scroll="scroll">
					
					<view class="box1" >
						<view class="j1"><image class=icon src="../../static/设备管理.png"></image></view>
						<view class="j2">
						<picker class="picker" @change="dev_id_change" :range="dev_id_array">
							<label class="lang">设备切换</label>
						</picker>
						</view>
						<view class="j3"></view>
					</view>
					
					<view class="box1" @click="export_btn_is_checked">
						<view class = "j1"><image class=icon src="../../static/Microsoft-Excel (1).png"></image></view>
						<view class="j2">导出excel</view>
						<view class="j3"></view>
					</view>
					
					<view class="uniui-list" v-show="is_export_attr">
						<checkbox-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
								<view>
									<checkbox :value="item.value" :checked="item.checked" />{{item.name}}
								</view>
							</label>
						</checkbox-group>
					</view>
					<view class="box1" @click="export_btn" v-show="is_export_attr">
						<view class = "j1"><image class=icon src="../../static/确认.png"></image></view>
						<view class="j2">确认导出</view>
						<view class="j3"></view>
					</view>
					
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/高温报警.png"></image></view>
						<view class="j2">{{$t('alarm_temp')}}</view>
						<view class="j3"><switch :checked="temper_switch" @change="switchChange($event,alarm1)"></switch></view>
					</view>
					<view class="box1" @click="alarm_set('hTemper',alarm_temp,max_alarm)">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2"  >{{$t('alarm_temp_h')}}</view>
						<view class="j3">{{hTemper}}°C</view>
					</view>
					<view class="box1" @click="alarm_set('lTemper',alarm_temp,min_alarm)">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" >{{$t('alarm_temp_l')}}</view>
						<view class="j3">{{lTemper}}°C</view>
					</view>
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/报警,警报,报警灯,危险.png"></image></view>
						<view class="j2" >{{$t('alarm_ph')}}</view>
						<view class="j3"><switch :checked="ph_switch" @change="switchChange($event,alarm2)"></switch></view>
					</view>
					<view class="box1" @click="alarm_set('hPh',alarm_ph,max_alarm)">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" >{{$t('alarm_ph_h')}}</view>
						<view class="j3">{{hPh}}</view>
					</view>
					<view class="box1"@click="alarm_set('lPh',alarm_ph,min_alarm)">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" >{{$t('alarm_ph_l')}}</view>
						<view class="j3">{{lPh}}</view>
					</view>
					
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/感叹号-圈.png"></image></view>
						<view class="j2">{{$t('alarm_oxygen')}}</view>
						<view class="j3"><switch :checked="oxygen_switch" @change="switchChange($event,alarm3)"></switch></view>
					</view>
					<view class="box1" @click="alarm_set('hOxygen',alarm_oxygen,max_alarm)">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" >{{$t('alarm_oxygen_h')}}</view>
						<view class="j3">{{hOxygen}}mg/L</view>
					</view>
					<view class="box1" @click="alarm_set('lOxygen',alarm_oxygen,min_alarm)">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" >{{$t('alarm_oxygen_l')}}</view>
						<view class="j3">{{lOxygen}}mg/L</view>
					</view>	
					
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/感叹号-圈.png"></image></view>
						<view class="j2">盐度报警</view>
						<view class="j3"><switch :checked="psu_switch" @change="switchChange($event,alarm4)"></switch></view>
					</view>
					<view class="box1" @click="alarm_set('hPsu','盐度报警',max_alarm)">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" >盐度高位报警</view>
						<view class="j3">{{hPsu}}‰</view>
					</view>
					<view class="box1" @click="alarm_set('lPsu','盐度报警',min_alarm)">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" >盐度低位报警</view>
						<view class="j3">{{lPsu}}‰</view>
					</view>
					
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/感叹号-圈.png"></image></view>
						<view class="j2">ORP报警</view>
						<view class="j3"><switch :checked="orp_switch" @change="switchChange($event,alarm5)"></switch></view>
					</view>
					<view class="box1" @click="alarm_set('hOrp','ORP报警',max_alarm)">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" >ORP高位报警</view>
						<view class="j3">{{hOrp}}mV</view>
					</view>
					<view class="box1" @click="alarm_set('lOrp','ORP报警',min_alarm)">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" >ORP低位报警</view>
						<view class="j3">{{lOrp}}mV</view>
					</view>
					
					<view class="box1" @click="go_set">
						<view class="j1"><image class=icon src="../../static/设置.png"></image></view>
						<view class="j2">{{$t('setting')}}</view>
						<view class="j3"></view>
					</view>
				</scroll-view>
				
			</view>
			
			<view class="right">
				<view class="box">
					<view class="b1"> 
						<picker @change="attribute_change" :range="attribute_array">
							<label>{{$t('attr')}}:</label>
							<label >{{attribute_array[attribute_index]}}</label>
						</picker>
					</view>
					<view class="b5">
						<view class="k2">当前设备：{{this.current_device}}</view>
						<view class="k3"></view>	
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
				
			</view>
			
			</view>
			<view class = "clock">{{this.clock}}</view>
			
			<view class="copyright_text" >
				<view class = "text1"><text>{{$t('copyright')}}</text></view>
				<view class = "text1"><text>{{$t('school')}}</text></view>
				<view class = "text1"><text>{{$t('organization')}}</text></view>
			</view>
			
			
				
		</view>	
		
				
			
			
			
		
		
	
</template>

<script>
	
	import {
		g_id,
		g_ph,
		g_oxygen,
		g_temperature
	} from "../../m_Common/m_common.js"
	import XLSX from "../../m_Common/xlsx.mini.min.js"
import { Static } from "vue";
	var wb = XLSX.utils.book_new()
	var export_attr_count = 0;
	var received_data_count=0;
	export default {
		
		data() {
			return {
				
				is_export_attr:false,
				items: [{
										value: 'temperature',
										name: '温度'
									},
									{
										value: 'PH',
										name: 'PH',
										
									},
									{
										value: 'dissolved oxygen',
										name: '溶解氧'
									},
									{
										value: 'psu',
										name: '盐度'
									},
									{
										value: 'orp',
										name: 'ORP'
									},
									{
										value: 'nh',
										name: '氨氮浓度'
									}
								],
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
				lastdatatime:"",
				attribute:this.$t('temp'),
				devicename:"simulation",
				attribute_array:[this.$t('temp'),"PH",this.$t('oxygen'),"盐度","orp"],
				attribute_index:0,
				device_array:["simulation","xianxiang","benin"],
				dev_id:"1",
				device_index:0,
				day_array:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
				day_index:0,
				day_shift:0,
				current_device:"",
				alarm_temp:this.$t('alarm_temp'),
				alarm_ph:this.$t('alarm_ph'),
				alarm_oxygen:this.$t('alarm_oxygen'),
				max_alarm:this.$t('max_alarm'),
				min_alarm:this.$t('min_alarm'),
				temper_switch:false,
				ph_switch:false,
				oxygen_switch:false,
				psu_switch:false,
				orp_switch:false,
				alarm1:"temper_switch",
				alarm2:"ph_switch",
				alarm3:"oxygen_switch",
				alarm4:"psu_switch",
				alarm5:"orp_switch",
				dev_id_array:[],
				dev_id_index:0,
				hTemper:0,
				lTemper:0,
				hPh:0,
				lPh:0,
				hOxygen:0,
				lOxygen:0,
				hPsu:0,
				lPsu:0,
				hOrp:0,
				lOrp:0,
				data_accquisition_mode:0,
				data:"",
				clock:"",
				id:"",
				ph:"",
				altitude:"",
				psu:"",
				orp:"",
				temperature:"",
				oxygen:"",
				deviceCount:0,
				selected:0,
				show:false,
				scrollTop: 0,
				old: {
					scrollTop: 0,
				},
				
			}
		},
		onReady(){
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
			
			
			var str = this.$t('history_chart')
			uni.setNavigationBarTitle({
			    title:str
			});
			
			getApp().globalData.g_id= "1"
			this.page_attr_update();
			getApp().watch(this.getMqttData,'g_mqtt_data')
		},
		onShow() {
			this.setdeviceArray()
			let _this = this;
			setInterval(function(){
				_this.clock = _this.getTime()
			},1000);
		
		},
		methods: {
			getMqttData(val){
				var data = val;
				if(this.devicename == data.device){
					if(getApp().globalData.g_id == data.id){
						this.ph = data.params.ph/100.0
						this.oxygen = data.params.oxygen/100.0
						this.temperature = data.params.temperature/100.0	
						this.psu = data.params.psu/1000.0	
						this.orp = data.params.orp
						this.lastdatatime = this.getTime()
					}
				}
				
				
			},
			data_accquisition_mode_button(operationalDigit){
				if((this.data_accquisition_mode&Number(operationalDigit))==Number(operationalDigit)){
					
					operationalDigit =~Number(operationalDigit)
					this.data_accquisition_mode=this.data_accquisition_mode&Number(operationalDigit)
				}else{
					this.data_accquisition_mode=this.data_accquisition_mode^Number(operationalDigit)
					
				}
				uni.request({
					url: 'http://47.100.200.181:8000/attr_set', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						symbol: this.devicename,
						deviceid:Number(this.dev_id),
						attr:"data_accquisition_mode",
						data:this.data_accquisition_mode
					},
					success: (res) => {
						
					}
					
				})
				
			},
			checkboxChange: function (e) {
							var items = this.items,
								values = e.detail.value;
							for (var i = 0, lenI = items.length; i < lenI; ++i) {
								const item = items[i]
								if(values.includes(item.value)){
									this.$set(item,'checked',true)
								}else{
									this.$set(item,'checked',false)
								}
							}
			},
			
			export_btn_is_checked(){
				this.is_export_attr = !this.is_export_attr
			},
			export_btn(){
				var items = this.items
				export_attr_count=0;
				received_data_count=0;
				wb = XLSX.utils.book_new()
				
				for (var i = 0, lenI = items.length; i < lenI; ++i){
					const item = items[i]
					if(item.checked == true){
						export_attr_count++;
						uni.request({
							url: 'http://47.100.200.181:8000/export_attr', // 路径
							method: 'POST', // 请求方法
							header: {
							    'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								symbol: this.devicename,
								deviceid:Number(this.dev_id),
								attribute:item.name
							},
							success: (res) => {
								let sheetData = res.data
								console.log(sheetData)
								let sheet  = XLSX.utils.json_to_sheet(sheetData)
								XLSX.utils.book_append_sheet(wb, sheet, item.name)
								received_data_count++;
							}
							
						})
						
					}
				}
				var that = this
				setTimeout(function() {
					if(wb != null){
						var str = that.current_device+'.xlsx';
						XLSX.writeFile(wb,str)
					}	
				}, export_attr_count*5000); // 这里的 1000 表示延时的时间，单位是毫秒
				
				this.is_export_attr=false
				
			},
			getTime:function(){
				var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth()+1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
				month >= 1 && month <= 9 ? (month = "0"+month) : "";
				day >=0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-'+day +  ' ' + hour + ":" + minute + ":" + second;
				 return timer;
			},
			page_attr_update(){
				var data = localStorage.getItem('userinfo')
				data = JSON.parse(data)
				this.hTemper=data.h_temp;
				this.lTemper=data.l_temp;
				this.hPh=data.h_ph;
				this.lPh=data.l_ph;
				this.hOxygen=data.h_oxygen;
				this.lOxygen=data.l_oxygen;
				this.hPsu=data.h_psu
				this.lPsu=data.l_psu
				this.hOrp=data.h_orp
				this.lOrp=data.l_orp
				this.temper_switch = Boolean(data.temper_switch);
				this.ph_switch = Boolean(data.ph_switch);
				this.oxygen_switch = Boolean(data.oxygen_switch);
				this.psu_switch = Boolean(data.psu_switch);
				this.orp_switch = Boolean(data.orp_switch);
				
				this.deviceCount = data.deviceCount
				this.current_device = data.deviceName
				this.data_accquisition_mode = data.mode
				
				
				var str = this.$t('digital_system')+data.district+this.$t('observation_point')
				  uni.setNavigationBarTitle({
				    title:str
				});
			},
			getdevicelist(symbol){
				uni.request({
						url: 'http://47.100.200.181:8000/get_device_list', // 路径
						method: 'POST', // 请求方法
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						} ,
						data: {
							symbol:symbol,
						}, //发送的数据
						success: (res) => {
							this.dev_id_array =res.data
							
						},
					})
			},
			setdeviceArray(){
				let token = localStorage.getItem('token')
				this.getdevicelist(token)
			},
		   
			alarm_post(attr,data){
				var d = localStorage.getItem('userinfo')
				
				d = JSON.parse(d)
				uni.request({
						url: 'http://47.100.200.181:8000/attr_set', // 路径
						method: 'POST', // 请求方法
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						} ,
						data: {
							symbol:d.symbol,
							attr : attr,
							data : data,
							deviceid:Number(this.dev_id)
						}, //发送的数据
					})
			},
			switchChange(e,attr){
				this.alarm_post(attr,e.detail.value)
			},
			attribute_set(attribute,titletext,placeholdertext,operationdigit){
				if((this.data_accquisition_mode&Number(operationdigit))==Number(operationdigit)){
					return
				}
				var that = this
				uni.showModal({
					title: titletext,
					cancelColor: "#FF0606",
					placeholderText: placeholdertext,
					content: '',
					editable: true,
					success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						if(attribute == "temperature"){
							that.alarm_post('temperature',res.content)
						}else if(attribute=="ph"){
							that.alarm_post('ph',res.content)
						}else if(attribute == "oxygen"){
							that.alarm_post('oxygen',res.content)
						}else if(attribute == "psu"){
							that.alarm_post('psu',res.content)
						}else if(attribute == "orp"){
							that.alarm_post('orp',res.content)
						}else if(attribute == "nh3"){
							that.alarm_post('nh3',res.content)
						}
						
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
					
				})
			},
			alarm_set(attribute,titletext,placeholdertext){
				var that = this
				placeholdertext = placeholdertext.replace(/<br>/g,"\n")
				uni.showModal({
					title: titletext,
					cancelColor: "#FF0606",
					placeholderText: placeholdertext,
					content: '',
					editable: true,
					success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						if(attribute == "hTemper"){
							that.hTemper = res.content;
							
							that.alarm_post('h_temp',res.content)
						}else if(attribute=="lTemper"){
							that.lTemper = res.content;
							
							that.alarm_post('l_temp',res.content)
							
						}else if(attribute == "hPh"){
							that.hPh = res.content;
							
							that.alarm_post('h_ph',res.content)
						}else if(attribute == "lPh"){
							that.lPh = res.content
							
							that.alarm_post('l_ph',res.content)
						}else if(attribute == "hOxygen"){
							that.hOxygen = res.content
							that.alarm_post('h_oxygen',res.content)
						}else if(attribute == "lOxygen"){
							that.lOxygen = res.content
							that.alarm_post('l_oxygen',res.content)
						}else if(attribute == "hPsu"){
							that.hPsu = res.content
							that.alarm_post('h_psu',res.content)
						}else if(attribute == "lPsu"){
							that.lPsu = res.content
							that.alarm_post('l_psu',res.content)
						}else if(attribute == "hOrp"){
							that.hPsu = res.content
							that.alarm_post('h_orp',res.content)
						}else if(attribute == "lOrp"){
							that.lPsu = res.content
							that.alarm_post('l_orp',res.content)
						}
						
						
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
					
				})
			},
			go_set(){
				uni.navigateTo({
					url:"/pages/index/setting"
				})
			},
			n1(){
				uni.navigateTo({
					url:"/pages/index/chart_xianxiang/chart_xianxiang"
				})
			},
			dev_id_change:function(e){
				this.dev_id_index = e.target.value
				this.dev_id=Number(this.dev_id_index) + 1
				getApp().globalData.g_id= (this.dev_id_index + 1).toString()
				
				
				let token = localStorage.getItem('token')
				this.ph = "",
				this.altitude = "",
				this.psu = "",
				this.temperature = "",
				this.oxygen = "",
				this.orp="",
				this.lastdatatime="",
				this.selected = 0
				this.getdata(this.attribute,this.devicename,"day",this.day_shift,this.dev_id)
				uni.request({
					url: 'http://47.100.200.181:8000/get_userdata', // 路径
					method: 'POST', // 请求方法
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						symbol: token,
						deviceid:Number(this.dev_id_index)+1
					},
					success: (res) => {
						if(res.data != ''){
							localStorage.setItem('userinfo', JSON.stringify(res.data));
							this.page_attr_update()
						}
					},
				})
			},
			upper: function(e) {
							console.log(e)
							
						},
			lower: function(e) {
							console.log(e)
						},
			scroll: function(e) {
							console.log(e)
							this.old.scrollTop = e.detail.scrollTop
						},
			goTop: function(e) {
							// 解决view层不同步的问题
							this.scrollTop = this.old.scrollTop
							this.$nextTick(function() {
								this.scrollTop = 0
							});
							uni.showToast({
								icon: "none",
								title: "纵向滚动 scrollTop 值已被修改为 0"
							})
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
	
	//#ifdef H5
	.charts-box{
		
		margin-top: 100rpx;
		margin-bottom: 5rpx;
		
	}
	.page{
		height: 100%;
	}
	.first_page{
		width: 100%;
		height: 80rpx;
		background-color: aqua;
		line-height: 80rpx;
		text-align: center;	
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
	.box2{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		background-color: #c2fffd;
		margin-top: 5rpx;
	}
	.box3{
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		line-height: 100rpx;
	}
	.clock{
		display: flex;
		flex-direction: column;
		align-items: center;
		
		justify-content: center;
		width: 100%;
		position: absolute;
		bottom:200rpx;
		color: black;
		font-size: 100rpx;
		font-weight: bold;
		
	}
	.lasttime{
		
		line-height: 50rpx;
		margin-left:35%;
		color: black;
		font-size: 35rpx;
		font-weight: bold;
	}
	.box4{
		width: 100%;
		height: 250rpx;
		background-color: azure;
		border-color: deepskyblue;
		border-style: solid;
		border-width: 1rpx;
		-moz-box-shadow: inset 0 0 20px #00ffff;
		-webkit-box-shadow: inset 0 0 20px #00ffff;
		box-shadow: inset 0 0 20px #aaffff;
	}
	.box3_i1{
		width:16.6%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex; 
		flex-direction: row;
		text-align: center;
		align-items: center;
	}
	.box3_i2{
		width:16.6%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex; 
		flex-direction: column;
		text-align: left;
		align-items: flex-start;
	}
	
	.circle-button-green{
		height: 20rpx;
		width: 20rpx;
		margin-left: 30rpx;
		background-color: greenyellow;
		border-radius: 50%;
	}
	.circle-button-red{
		height: 20rpx;
		width: 20rpx;
		margin-left: 30rpx;
		border-radius: 50%;
		background-color: red;
	}
	.box3_text2{
		color: #af9a7a;
		font-weight: bold;
		line-height: 80rpx;
		
		font-size: 35rpx;
	}
	.box3_text1{
		color: black;
		font-size: 45rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
	.box5{
		width: 100%;
		height: 70%;
		display: flex;
		flex-direction: row;
	}
	.scroll{
		display: flex;
		flex-direction: row;
		height: 75%;
		width:25%;
		margin-bottom: 4rpx;
	}
	.box{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		background-color: aliceblue;
	}
	.right{
		display: flex;
		flex-direction: column;
		height: 60%;
		width: 75%;
	}
	.scroll-Y{
		height: 95%;
	}
	.icon{
		width: 80rpx;
		height: 80rpx;
	}
	.i1{
		width:10%;
		height: 80rpx;
	}
	.i2{
		width: 40%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;	
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
	.text1{
		height: 32rpx;
		width: 100%;
		text-align: center;
		line-height: 32rpx;
		font-size: 32rpx;
		
	}
	.copyright_text{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		position: absolute;
		bottom:15rpx;
		
	}
//#endif

	//#ifdef MP-WEIXIN
	.first_page{
		width: 100%;
		height: 80rpx;
		background-color: aqua;
		line-height: 80rpx;
		text-align: center;
		
		
	}
	.box1{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.box2{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		background-color: #c2fffd;
		margin-top: 5rpx;
	}
	.box3{
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
	}
	.box4{
		width: 100%;
		height: 200rpx;
		background-color: azure;
		border-color: deepskyblue;
		border-style: solid;
		border-width: 1rpx;
		-moz-box-shadow: inset 0 0 20px #00ffff;
		-webkit-box-shadow: inset 0 0 20px #00ffff;
		box-shadow: inset 0 0 20px #aaffff;
	}
	.box3_i1{
		width:30%;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 3%;
		display: flex; 
		flex-direction: row;
		text-align: center;
		align-items: center;
	}
	.box3_text2{
		color: #af9a7a;
		font-weight: bold;
		line-height: 80rpx;
		font-size: 35rpx;
	}
	.box3_text1{
		color: black;
		font-size: 45rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
	.scroll-Y {
			height: 720rpx;
			
		}
		
		
	.icon{
		width: 80rpx;
		height: 80rpx;
	}
	.i1{
		width:10%;
		height: 80rpx;
	}
	.i2{
		width: 40%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;	
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
	.k1{
		width:10%;
		height: 80rpx;
	}
	.k2{
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
		margin-left: 30rpx;
	}
	.k3{
		width:20%;
		height: 80rpx;
		line-height: 70rpx;
		text-align: center;
	}
	.text1{
		height: 32rpx;
		width: 100%;
		text-align: center;
		line-height: 32rpx;
		font-size: 32rpx;
	}
	.copyright_text{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		position: absolute;
		bottom:0;
	}
//#endif

	
</style>
