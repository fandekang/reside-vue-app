<template>
  <div class="material-dialog">
    <div class="form-wrapper">
      <div class="cell">
        <label class="label">材料编号 :</label>
        <input type="text" class="inp" v-model="datanum">
      </div>
      <div class="cell">
        <label class="label">材料名称 :</label>
        <input type="text" class="inp" v-model="dataname">
      </div>
      <div class="cell">
        <label class="label">起始页 :</label>
        <input type="text" class="inp" v-model="start">
      </div>
      <div class="cell">
        <label class="label">是否原件 :</label>
        <label class="radio">
          <input type="radio" v-model="value" value="1"> 是
        </label>
        <label class="radio">
          <input type="radio" v-model="value" value="0"> 否
        </label>
      </div>
    </div>
    <div class="submit">
      <button class="btn">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "1",
      datanum: "001",
      dataname: "房客身份证",
      start: "02"
    };
  }
};
</script>
<style lang="scss" scoped>
.material-dialog {
  margin-top: 5em;
  padding: 0 2.5em;
  .form-wrapper {
    .cell {
      display: flex;
      align-items: center;
      padding: 20px 0 10px 0;
      border-bottom: 1px solid rgba(226, 226, 226, 1);
      .label {
        display: inline-block;
        width: 5em;
        font-size: 1.3em;
        color: #ccc;
      }
      .inp {
        display: inline-block;
        width: 8.4em;
        border: none;
        outline: none;
        font-size: 1.4em;
        color: #333;
      }
      .radio {
        margin-right: 2em;
        display: flex;
        align-items: center;
        input[type="radio"] {
          margin: 0;
        }
      }
    }
  }
  .submit {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    .btn {
      padding: 4px 12px;
      font-size: 1.1em;
      background-color: rgba(131, 81, 208, 1);
      color: #fff;
      border: none;
      outline: none;
    }
  }
}
</style>
