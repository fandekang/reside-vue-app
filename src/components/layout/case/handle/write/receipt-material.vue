<template>
  <div class="material-wrapper">
    <div class="add-material">
      <button class="btn" @click="add">添加材料</button>
    </div>
    <div class="materials">
      <load-more-cell
        ref="loadMore"
        :pager="pager"
        :dataUrl="dataUrl"
        :auto-fill="false"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded.sync="allLoaded"
      >
        <template slot-scope="scope" v-if="scope.source">
          <div class="cell" v-for="(item, index) in scope.source" :key="index">
            <div class="up">
              <div class="title">001 房客身份证</div>
              <div class="operate-wrapper">
                <button class="btn del" @click="del">删除</button>
                <button class="btn edit" @click="edit">修改</button>
              </div>
            </div>
            <div class="down">
              <div class="box">
                <div class="value">复印件</div>
                <div class="name">材料类型</div>
              </div>
              <div class="box middle">
                <div class="value">第一页</div>
                <div class="name">起始页数</div>
              </div>
              <div class="box right">
                <div class="value">共2页</div>
                <div class="name">材料页数</div>
              </div>
            </div>
          </div>
        </template>
      </load-more-cell>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataUrl:
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO,
      pager: {
        curPage: 1,
        pageSize: 2
      },
      allLoaded: false
    };
  },
  created() {
    // this.$http
    //   .get(
    //     process.env.ROOT_API +
    //       "recdata/getRecdataList?serialNO=" +
    //       this.$route.query.serialNO
    //   )
    //   .then(
    //     res => {
    //       res = JSON.parse(res.bodyText);
    //       if (res.success) {
    //       }
    //     },
    //     err => {
    //       throw new Error(err);
    //     }
    //   );
  },
  methods: {
    loadTop() {
      // alert('下啦')
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      // alert('上拉')
      this.$refs.loadMore.onBottomLoaded();
    },
    add() {
      this.$store.commit("toggleMaterialDialogVisible", {
        materialDialogVisible: true
      });
      this.$store.commit("changeMaterialDialogTitle", {
        materialDialogTitle: "添加收件材料"
      });
    },
    del() {
      alert("del");
    },
    edit() {
      alert("edit");
    },
    materialDialogBackEvent() {
      this.materialDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.material-wrapper {
  .add-material {
    margin: 15px 0;
    .btn {
      padding: 4px 12px;
      border: none;
      outline: none;
      background-color: rgba(131, 81, 208, 1);
      color: #fff;
    }
  }
  .materials {
    .cell {
      padding: 10px 10px;
      margin-bottom: 15px;
      background-color: rgba(242, 242, 242, 1);
      .up {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .title {
          font-size: 1.8em;
          font-weight: 650;
        }
        .operate-wrapper {
          display: flex;
          .btn {
            margin-left: 0.82em;
            padding: 2px 8px;
            font-size: 1em;
            border: none;
            outline: none;
            color: #fff;
          }
          .del {
            background-color: rgba(255, 0, 0, 1);
          }
          .edit {
            background-color: rgba(153, 51, 204, 1);
          }
        }
      }
      .down {
        display: flex;
        .box {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          .value {
            width: 100%;
            font-size: 1.2em;
            color: #5fb878;
          }
          .name {
            width: 100%;
            margin-top: 3px;
            font-size: 1em;
            color: #ccc;
          }
        }
        .middle {
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .middle,
        .right {
          .value,
          .name {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
