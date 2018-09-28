$(function() {

    // 基于准备好的dom，初始化echarts实例
    // 需要实现柱状图 和 饼状图 
    // 1-左侧柱状图
    var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            // 标题文本
            text: '2017年注册人数',
            // 配置标题样式
            // textStyle: {
            //     color:'red',
            // }
        },
        // 提示框组件
        tooltip: {},
        // 图例
        legend: {
            data:['人数']
        },
        // x轴
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        // y轴  y轴一般是刻度   尽量根据数据自适应
        yAxis: {},
        // 配置的是数据
        series: [{
            name: '人数',
            // 表示图表的类型  bar柱状图  line 折线图  pie饼图
            type: 'bar',
            data: [500, 1500, 1200, 2200, 1500, 1200]
        }]
    };
    

    // 使用刚指定的配置项和数据显示图表。
    echarts_1.setOption(option1);



// 2-右侧饼图
var echarts_2 = echarts.init(document.querySelector('.echarts_2'));
option2 = {
    // 大标题
    title : {
        text: '热门品牌销售',
        // 子标题
        subtext: '2017年6月',
        x:'center'
    },
    // 提示框组件
    tooltip : {
        trigger: 'item',
        // 自定义提示框内容  鼠标移上饼图时会有相对应的提示
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        //配置图例对齐方式   水平 Horizontal  垂直 vertical
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','耐克王','阿迪王']
    },
    series : [
        {
            name: '品牌销量',
            type: 'pie',  //饼图
            // 圆的大小
            radius : '55%',
            // 圆心位置
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'耐克王'},
                {value:1548, name:'阿迪王'}
            ],
            // 表示额外的阴影等效果
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
echarts_2.setOption(option2);







})