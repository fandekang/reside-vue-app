<template>
  <div class="query-condition-wrapper">
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="currentDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
    ></mt-datetime-picker>

    <div class="form">
      <div class="form-item">
        <label class="label">案件编号：</label>
        <input type="text" class="inp" placeholder="请输入要查询的案件编号">
      </div>
      <div class="form-item">
        <label class="label">案件类型：</label>
        <input type="text" class="inp" placeholder="请输入要查询的案件类型">
      </div>
      <div class="form-item">
        <label class="label">申请人：</label>
        <input type="text" class="inp" placeholder="请输入要查询的申请人">
      </div>
      <div class="form-item">
        <label class="label">房东：</label>
        <input type="text" class="inp" placeholder="请输入要查询的房东">
      </div>
      <div class="form-item-select">
        <label class="label">申请日期：</label>
        <div class="date">
          <span class="btn" @click="startDateMethod">{{startDate}}</span>
          <span>至</span>
          <span class="btn" @click="endDateMethod">{{endDate}}</span>
        </div>
      </div>
    </div>

    <button class="query-btn">查询</button>
  </div>
</template>
<script>
import { formatDate } from "@/assets/js/common";

export default {
  data() {
    return {
      pickerVisible: false,
      startDate: "起始日期",
      endDate: "终止日期",
      currentDate: new Date(),
      selectStartOrEnd: 0
    };
  },
  methods: {
    handleConfirm(item) {
    //   console.log(formatDate(item));
      if (this.selectStartOrEnd) {
        this.endDate = formatDate(item);
      } else {
        this.startDate = formatDate(item);
      }
    },
    startDateMethod() {
      this.selectStartOrEnd = 0;
      this.$refs.picker.open();
    },
    endDateMethod() {
      this.selectStartOrEnd = 1;
      this.$refs.picker.open();
    }
  }
};
</script>
<style>
</style>

<style lang="scss" scoped>
.query-condition-wrapper {
  padding: 10px;
  .form {
    .form-item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid rgba(226, 226, 226, 1);
      .label {
        flex: 0 0 70px;
        width: 70px;
        font-size: 13px;
        color: #ccc;
      }
      .inp {
        flex: 1;
        width: auto;
        border: none;
        outline: none;
      }
      .inp::placeholder {
        font-size: 13px;
        color: #999;
      }
    }
    .form-item-select {
      margin-top: 20px;
      .label {
        display: inline-block;
        padding: 10px 0;
        font-size: 13px;
        color: #ccc;
      }
      .date {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333;
        .btn {
          padding: 2px 12px;
          font-size: 13px;
          background-color: rgba(242, 242, 242, 1);
          color: #999;
        }
      }
    }
  }
  .query-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 6px 20px;
    background-color: rgba(131, 81, 208, 1);
    color: #fff;
    border: none;
    outline: none;
  }
}
</style>
