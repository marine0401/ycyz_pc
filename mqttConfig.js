export const MQTT_IP = '47.100.200.181:8083/mqtt'//mqtt地址端口
const MQTT_USERNAME = 'admin'//mqtt用户名
const MQTT_PASSWORD = 'sl707_'//密码
 
export const MQTT_OPTIONS = {
	keepalive: 30,
    connectTimeout: 5000,
    clientId:'',
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
	sessionExpiryInterval:86400*365,
	clean: true,
}