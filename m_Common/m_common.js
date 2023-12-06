

const mqtt = require('uni_modules/mqtt/dist/mqtt.min.js');
export default{
	
}
import {
	MQTT_IP,
	MQTT_OPTIONS
} from '@/mqttConfig.js';

import {v4} from 'uuid'
var client = null
function publishData(topic,data){	
		MQTT_OPTIONS.clientId = v4()
		var that = this
		var message
		
		var data
		// #ifdef H5
		client = mqtt.connect('ws://' + MQTT_IP, MQTT_OPTIONS)
		console.log(MQTT_OPTIONS)
		// #endif
		// #ifdef MP-WEIXIN||APP-PLUS
		client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
		// #endif
		client.on('connect', () => {
				console.log("connnect success!")
				client.publish(topic, data, {
								qos: 1
						})
					}).on('error', (err) => {
							console.log(err)
							client.end()
		})
		
		
		
}

function connect(symbol){	
		MQTT_OPTIONS.clientId = v4()
		var that = this
		var message
		
		var data
		// #ifdef H5
		client = mqtt.connect('ws://' + MQTT_IP, MQTT_OPTIONS)
		console.log(MQTT_OPTIONS)
		// #endif
		// #ifdef MP-WEIXIN||APP-PLUS
		client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
		// #endif
		client.on('connect', function() {
		console.log('连接成功')
		client.subscribe("/device/property", function(err) {
			if (!err) {
				console.log('订阅成功')
				}
			})
		}).on('reconnect', function(error) {
		console.log('正在重连...', "/device/property")
		}).on('error', function(error) {
				console.log('连接失败...', error)
		}).on('end', function() {
				console.log('连接断开')
		}).on('message', function(topic, message) {
				data = JSON.parse(message.toString())
				console.log(data)
				console.log("id" + getApp().globalData.g_id)
				console.log(symbol)
				getApp().globalData.g_mqtt_data = data;
		})
}
//导出
module.exports  = {
	client,
	connect,
	publishData
}