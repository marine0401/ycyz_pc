(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-setting"],{1158:function(A,t,a){"use strict";(function(A){var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=i(a("a027")),s={data:function(){return{salinity_code:"100,",salinity_set:"设备盐度设置",salinity_placehodertext:"请输入盐度值",altitude_code:"101,",altitude_set:"设备海拔设置",altitude_placehodertext:"请输入海拔"}},methods:{alarm_set:function(t,a,i){var s=localStorage.getItem("token");uni.showModal({title:a,cancelColor:"#FF0606",placeholderText:i,content:"",type:"number",editable:!0,success:function(a){var i="1,"+t+a.content,n="/device_"+s+"/control";A.log(n),e.default.publishData(n,i)}})},save:function(){var A="1,103,1",t=localStorage.getItem("token"),a="/device_"+t+"/control";e.default.publishData(a,A)}}};t.default=s}).call(this,a("5a52")["default"])},"31e0":function(A,t,a){var i=a("24fb");t=i(!1),t.push([A.i,".page[data-v-e4cdd344]{height:100%}.icon[data-v-e4cdd344]{width:%?80?%;height:%?80?%}.box1[data-v-e4cdd344]{width:100%;height:%?80?%;display:flex;flex-direction:row;margin-top:%?5?%;margin-bottom:%?5?%}.box1[data-v-e4cdd344]:hover{background-color:#a9a9a9}.j1[data-v-e4cdd344]{width:10%;height:%?80?%}.j2[data-v-e4cdd344]{width:70%;height:%?80?%;line-height:%?80?%;text-align:left;margin-left:%?30?%}.j3[data-v-e4cdd344]{width:20%;height:%?80?%;line-height:%?70?%;text-align:center}",""]),A.exports=t},a202:function(A,t,a){"use strict";a.r(t);var i=a("1158"),e=a.n(i);for(var s in i)"default"!==s&&function(A){a.d(t,A,(function(){return i[A]}))}(s);t["default"]=e.a},b28d:function(A,t,a){"use strict";var i;a.d(t,"b",(function(){return e})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}));var e=function(){var A=this,t=A.$createElement,i=A._self._c||t;return i("v-uni-view",{staticClass:"page"},[i("v-uni-view",{staticClass:"box1",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.alarm_set(A.salinity_code,A.salinity_set,A.salinity_placehodertext)}}},[i("v-uni-view",{staticClass:"j1"},[i("v-uni-image",{staticClass:"icon",attrs:{src:a("e1a1")}})],1),i("v-uni-view",{staticClass:"j2"},[A._v("盐度设置")]),i("v-uni-view",{staticClass:"j3"})],1),i("v-uni-view",{staticClass:"box1",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.alarm_set(A.altitude_code,A.altitude_set,A.altitude_placehodertext)}}},[i("v-uni-view",{staticClass:"j1"},[i("v-uni-image",{staticClass:"icon",attrs:{src:a("e37e")}})],1),i("v-uni-view",{staticClass:"j2"},[A._v("海拔设置")]),i("v-uni-view",{staticClass:"j3"})],1),i("v-uni-view",{staticClass:"box1",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.save()}}},[i("v-uni-view",{staticClass:"j1"},[i("v-uni-image",{staticClass:"icon",attrs:{src:a("e37e")}})],1),i("v-uni-view",{staticClass:"j2"},[A._v("保存设置")]),i("v-uni-view",{staticClass:"j3"})],1)],1)},s=[]},df6b:function(A,t,a){"use strict";a.r(t);var i=a("b28d"),e=a("a202");for(var s in e)"default"!==s&&function(A){a.d(t,A,(function(){return e[A]}))}(s);a("e345");var n,c=a("f0c5"),g=Object(c["a"])(e["default"],i["b"],i["c"],!1,null,"e4cdd344",null,!1,i["a"],n);t["default"]=g.exports},e1a1:function(A,t){A.exports="data:image/png;base64,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"},e1d6:function(A,t,a){var i=a("31e0");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[A.i,i,""]]),i.locals&&(A.exports=i.locals);var e=a("4f06").default;e("8511e1da",i,!0,{sourceMap:!1,shadowMode:!1})},e345:function(A,t,a){"use strict";var i=a("e1d6"),e=a.n(i);e.a},e37e:function(A,t){A.exports="data:image/png;base64,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"}}]);