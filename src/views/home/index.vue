<template>
    <div style="height: 100%">
        <div id="c1"></div>
        this is home
        <br />
        <a-button type="primary" size="large" @click="this.$router.push('/setting')">
            go to settting
        </a-button>
        <br />
        <a-button type="secondary" size="large" @click="loadGraph">
            show graph
        </a-button>
        <a-button type="secondary" size="large" @click="loadGraph('hide')">
            hide graph
        </a-button>
    </div>
</template>

<script setup>
import { reactive, onActivated, onMounted } from 'vue'
import { Chart } from '@antv/g2';
let _home = reactive({ name: '主页', selectedKeys: ['2'], chart: null })

onActivated(() => {
    console.log('home: onActivated');
})
onMounted(() => {
    console.log('home: onMounted');
})
const props = defineProps({
})

    const data = reactive([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
    ]);
function loadGraph(hide){
    if (hide && _home.chart) return _home.chart.hide();
    // Step 1: 创建 Chart 对象
    _home.chart = new Chart({
    container: 'c1', // 指定图表容器 ID
    width: 600, // 指定图表宽度
    height: 300, // 指定图表高度
    });

    // Step 2: 载入数据源
    _home.chart.data(data);

    // Step 3: 创建图形语法，绘制柱状图
    _home.chart.interval().position('genre*sold');

    // Step 4: 渲染图表
    _home.chart.render();
}
function onHomeClick() {
    _home.name = _home.name === '主页' ? 'Home' : '主页'
    props.setCurrentPage('setting')
}
</script>

<style scoped>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}
</style>
