<template>
  <a-timeline>
    <a-timeline-item>09:00 打开电脑</a-timeline-item>
    <a-timeline-item>09:10 查看客户邮件</a-timeline-item>
    <a-timeline-item color="red">
      <template #dot><clock-circle-outlined style="font-size: 16px" /></template>
      09:30 内部会议
    </a-timeline-item>
    <a-timeline-item>12:00 午休时间</a-timeline-item>
    <a-timeline-item>14:00 客户跟进</a-timeline-item>
    <a-timeline-item>14:20 点个下午茶</a-timeline-item>
    <a-timeline-item>16:30 在线培训</a-timeline-item>
    <a-timeline-item>18:00 下班打卡</a-timeline-item>
  </a-timeline>
</template>
<script setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
</script>