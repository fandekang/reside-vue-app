<template>
  <div>
    <div class="material-wrapper">
      <div class="add-material">
        <!-- <button class="btn" @click="add">添加材料</button> -->
      </div>
      <div class="materials">
        <load-more-cell
          ref="loadMore"
          :pager="pager"
          :dataUrl="materialURL"
          :auto-fill="false"
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded.sync="allLoaded"
        >
          <template slot-scope="scope" v-if="scope.source">
            <div class="cell" v-for="(item, index) in scope.source" :key="index">
              <div class="up">
                <div class="title">{{item.datano}} {{item.dataname}}</div>
                <div class="operate-wrapper">
                  <button class="btn del" @click="del(item.id)">删除</button>
                  <button class="btn edit" @click="edit(item.id)">修改</button>
                </div>
              </div>
              <div class="down">
                <div class="box">
                  <div class="value">{{item.datatype == 1 ? '原件' : '复印件'}}</div>
                  <div class="name">材料类型</div>
                </div>
                <div class="box middle">
                  <div class="value">{{item.casenum}}</div>
                  <div class="name">案件号</div>
                </div>
                <div class="box right">
                  <div class="value">{{item.status == '1' ? '有效' : '无效'}}</div>
                  <div class="name">是否有效</div>
                </div>
              </div>
            </div>
          </template>
        </load-more-cell>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      pager: {
        curPage: 1,
        pageSize: 3
      },
      allLoaded: false
    };
  },
  props: {
    query: Object
  },
  created() {
    // alert(this.$route.query.serialNO)
    this.materialURL =
      process.env.ROOT_API +
      "recdata/getRecdataList?serialNO=" +
      this.$route.query.serialNO;
  },
  watch: {},
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
    del(id) {
      // alert(id);
      let ids = [];
      ids.push(id);
      ids = JSON.stringify(ids);

      this.$http
        .post(
          process.env.ROOT_API + "recdata/deleteObj",
          { ids: ids },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$toast("删除成功");
              this.materialURL =
                process.env.ROOT_API +
                "recdata/getRecdataList?serialNO=" +
                this.$route.query.serialNO +
                "&dt=" +
                Math.random();
            } else {
              this.$toast("删除失败");
            }
          },
          err => {
            this.$toast("删除失败");
            throw new Error(err);
          }
        );
    },
    edit(id) {
      this.$store.commit("toggleMaterialDialogVisible", {
        materialDialogVisible: true
      });
      this.$store.commit("changeMaterialDialogTitle", {
        materialDialogTitle: "修改收件材料"
      });
      this.materialEdit = true
      this.$store.commit('changeMaterialItemID', {materialItemID: id})
    }
  },
  computed: {
    materialURL: {
      get() {
        return this.$store.state.main.materialURL;
      },
      set(val) {
        this.$store.commit("changeMaterialURL", { materialURL: val });
      }
    },
    materialEdit: {
      get() {
        return this.$store.state.main.materialEdit;
      },
      set(val) {
        this.$store.commit('toggleMaterialEdit', {materialEdit: val})
      }
    }
  },
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
