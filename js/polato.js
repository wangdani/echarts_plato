/**
 * 验证obj不为空
 */
function checkIsNull(obj){
	if( obj.length <= 0  ){
		return false;
	}
	return true;
}

function isFloat(val) {
	val = $.trim(val);
	val = parseFloat(val);
	if (isNaN(val)) {
		val = false;
	}
	return val;
}

function isNum(event) {
	var val = $(event.target).val();
	if (isFloat(val) === false) {
		$(event.target).val("");
		alert("必须为数字");
	}
}

//生成数据框架
function creatTheTable() {
	var theSize = $.trim($("#theSize").val());
	if (!checkIsNull(theSize)) {
		alert("数据量不能为空");
		return false;
	}
	creatTheTableDoing(theSize);
}

function creatTheTableDoing(theSize) {
	var str = "";
	for (var i = 0; i < theSize; i++) {
		str +=
			"<tr>" +
			"<td>" +
			"<input type=" + 'text' + " name=" + 'xData' + " />" +
			"</td>" +
			"<td>" +
			"<input type=" + 'text' + " name=" + 'barData' + " size=" + '5' + " maxlength=" + '8' + " onchange=" +
			'isNum(event)' + " />" +
			"</td>" +
			"<td>" +
			"<input type=" + 'text' + " name=" + 'numData' + " size=" + '5' + " maxlength=" + '8' + " onchange=" +
			'isNum(event)' + " disabled=" + 'disabled' + " />" +
			"</td>" +
			"<td>" +
			"<input type=" + 'text' + " name=" + 'lineData' + " size=" + '5' + " maxlength=" + '8' + " onchange=" +
			'isNum(event)' + " disabled=" + 'disabled' + "   />" +
			"</td>" +
			"</tr>";
	}

	str +=
		"<tr>" +
		"<td>" +
		"<b>累计：</b>" +
		"</td>" +
		"<td>" +
		"<input type=" + 'text' + " id=" + 'allNumData' + " size=" + '5' + " maxlength=" + '8' + " onchange=" +
		'isNum(event)' + " disabled=" + 'disabled' + "  />" +
		"</td>" +
		"<td>" +
		"--" +
		"</td>" +
		"<td>" +
		"--" +
		"</td>" +
		"</tr>";

	$("#tBody").html(str);
	$("#theTable").show();
}




//生成随机颜色
function getRandomColor() {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
//固定颜色循环
var colorListDemo = ['#e3d80c', '#04de5c', '#6f687d', '#ef671c', '#52932e', '#ba8f8f', '#05b6d8', '#e3bd0c', '#f9086e',
	'#aab3cd'
];
function getColorList(i) {
	var j = i % colorListDemo.length;
	return colorListDemo[j];
}

function testAll(){ 
	var i=0;
	var interval = setInterval(function(){
		testFunc();
		i++;
		if(i>500){
			clearInterval(interval);
		}
	},1000);  
}



/*
测试方法
*/
function testFunc(){
	document.getElementById("title").value= "测试标题";
	document.getElementById("barName").value= "测试柱状图名称";
	document.getElementById("lineName").value= "测试折线图名称";
	document.getElementById("barUnit").value= "测试柱状图单位";
	document.getElementById("lineUnit").value= "测试折线图单位";
	
	var max = 300;
	var theSize = $.trim($("#theSize").val());
	if (!checkIsNull(theSize)) {
		alert("数据量不能为空");
		return false;
	}
	var one = Math.floor(max/theSize);
	
	var barData = document.getElementsByName("barData");
	var xData = document.getElementsByName("xData");
	for(var i=0;i<barData.length;i++){
		max = max-Math.ceil(Math.random()*one);  
		barData[i].value = max;
		xData[i].value = "x轴测试文字"+(i+1);
	}
	doFunc();
}

/*
生成柏拉图方法
*/
function doFunc() {
	var b = $("[name='barData']");
	var n = $("[name='numData']");
	var c = $("[name='lineData']");

	var theSize = $.trim($("#theSize").val());
	var all = 0;

	for (var i = 0; i < theSize; i++) {
		var bV = isFloat(b.eq(i).val());
		all = all + bV;
		n.eq(i).val(all);
	}

	for (var i = 0; i < b.length; i++) {
		var nV = isFloat(n.eq(i).val());
		nV = nV * 100;
		var temp = Math.round(nV / all * 100) / 100;
		c.eq(i).val(temp);
	}
	$("#allNumData").val(all);

	doFuncEcharts();
}

function doFuncEcharts() {
	var title = $.trim($("#title").val());
	var barName = $("#barName").val();
	var lineName = $("#lineName").val();
	var barUnit = $("#barUnit").val();
	var lineUnit = "                      " + $("#lineUnit").val();
	var theSize = $.trim($("#theSize").val());
	var max = isFloat($("#allNumData").val());
	
	if (!checkIsNull(theSize)) {
		alert("数据量不能为空");
		return false;
	}

	var xData = new Array();
	var x2Data = new Array();
	var barData = new Array();
	var lineData = new Array();
	var a = $("[name='xData']");
	var b = $("[name='barData']");
	var c = $("[name='lineData']");
	var strflag = $.trim($("[name='sequenceRadio']:checked").val());
	if (strflag != "") {
		lineData.push(0);
		x2Data.push("");
	}
	for (var i = 0; i < theSize; i++) {
		//var aV = $.trim(a.eq(i).val());
		var aV = a.eq(i).val();
		var bV = isFloat(b.eq(i).val());
		if(bV==false){
			alert("柱状图数据不能为空");
			return false;
		}
		var cV = isFloat(c.eq(i).val());
		xData.push(aV);
		x2Data.push(aV);
		barData.push(bV);
		lineData.push(cV);

	}

	var indata = {
		title: title,
		barName: barName,
		lineName: lineName,
		barUnit: barUnit,
		lineUnit: lineUnit,
		theSize: theSize,
		xData: xData,
		x2Data: x2Data,
		barData: barData,
		lineData: lineData,
		max: max
	};
	creatEcharts(indata);

}


/*
	生成echartts统计图表
*/
function creatEcharts(indata) {
	var option = {
		title: {
			text: indata.title,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			bottom: '35%',
			left: '10%',
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true
				}
			},
			textStyle: {
				fontSize: 30
			},
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: indata.xData,
			splitLine: false,
			axisLabel: {
				rotate: 50,
				verticalAlign: 'middle',
				textStyle: {
					fontSize: 18 //更改坐标轴文字大小
				},
			},
		}, {
			type: 'category',
			show: false,
			boundaryGap: false,
			data: indata.x2Data,
			splitLine: false,

		}],
		yAxis: [{
				name: indata.barUnit,
				type: 'value',
				boundaryGap: [0, 0.1],
				splitLine: false,
				max: indata.max,
				axisLabel: {
					textStyle: {
						fontSize: 14 //更改坐标轴文字大小
					},
				},
			},
			{
				name: indata.lineUnit,
				type: 'value',
				axisLabel: {
					textStyle: {
						fontSize: 14 //更改坐标轴文字大小
					},
				},
				splitLine: false,
			}
		],
		series: [{
				name: indata.barName,
				type: 'bar',
				barCategoryGap: '0%',
				label: {
					show: true,
					position: 'insideTop',
					fontSize: 17,
				},
				itemStyle: {
					normal: {
						color: function(params) {
							var colorList = [];
							for (var i = 0; i < indata.theSize; i++) {
								colorList[i] = getRandomColor(); //随机颜色
								//colorList[i] = getColorList(i);		//固定颜色
							}
							return colorList[params.dataIndex]
						}
					},
					barBorderColor: 'tomato',
					barBorderWidth: 1,
					barBorderRadius: 2,
					label: {
						show: true,
						position: 'insideTop',
						fontSize: 17,
					}

				},
				data: indata.barData,
			},
			{
				name: indata.lineName,
				type: 'line',
				symbol: 'lozenge',
				symbolSize: 10,
				xAxisIndex: 1,
				yAxisIndex: 1,
				//
				label: {
					show: true,
					position: 'top',
					color: "black",
					formatter: '{c}%          ',
					fontSize: 17,
				},
				data: indata.lineData
			}

		]
	};

	//初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart_1'));

	//使用制定的配置项和数据显示图表
	myChart.setOption(option);
}
