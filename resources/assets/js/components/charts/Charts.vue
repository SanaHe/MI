<template>
    <div class="charts">
        <div id="main" style="width: 600px;height:400px;"></div>
        <div id="pieC" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "Charts",
        data(){
          return{
          };
        },
        mounted(){
            var myChart = echarts.init(document.getElementById('main')).setOption(
                {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });

            // 指定图表的配置项和数据

            // 使用刚指定的配置项和数据显示图表。
            // myChart.setOption(option);
            var pieChart=  echarts.init(document.getElementById('pieC')).setOption(
                {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                })
        }
    }
</script>

<style scoped>

</style>