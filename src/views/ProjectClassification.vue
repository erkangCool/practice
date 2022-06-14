<template>
  <div class="home">
    <div class="header">xxx项目列表</div>
    <div class="search">
      <el-input v-model="projectTitle" placeholder="请输入项目名称"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="cardBox">
      <el-carousel
        :interval="4000"
        type="card"
        height="500px"
        loop
        ref="carousel"
        trigger="click"
        pause-on-hover
        v-if="list[0]"
      >
        <el-carousel-item
          style="display: flex"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card :body-style="{ padding: '0px' }" class="card">
            <img
              src="https://fastly.jsdelivr.net/gh/kangcoll/tcPic@main/2022-6-2-16:56:27-12.png"
              class="image"
            />
            <div style="padding: 14px; width: 100%">
              <el-button
                type="danger"
                class="delete"
                circle
                @click="deleteProject(index)"
              >
                <el-icon>
                  <CloseBold />
                </el-icon>
              </el-button>
              <h2 v-if="projectNameShow" @click="editProjectName(index)">
                项目名称:{{ item.projectName }}
              </h2>
              <el-input
                v-else
                ref="projectName"
                v-model="item.projectName"
                placeholder="请输入项目名称"
                @blur="projectNameShow = true"
              ></el-input>
              <div class="bottom">
                <div class="loginfo">
                  <h3 v-if="usreShow" @click="editUserName(index)">
                    用户名:{{ item.userName }}
                  </h3>
                  <el-input
                    v-else
                    ref="name"
                    v-model="item.userName"
                    @blur="usreShow = true"
                    placeholder="请输入用户名"
                  ></el-input>
                  <h3 v-if="passWordShow" @click="editPassWord(index)">
                    密码:{{ item.passWord }}
                  </h3>
                  <el-input
                    v-else
                    ref="passWord"
                    v-model="item.passWord"
                    @blur="passWordShow = true"
                    placeholder="请输入密码"
                  ></el-input>
                </div>
              </div>
              <div class="projectIntroduction">
                <h4>项目简介:</h4>
                <el-scrollbar height="200px">
                  <p v-if="detailsShow" @click="editDetail(index)">
                    {{ item.projectDetails || "点击此处输入简介" }}
                  </p>
                  <el-input
                    v-else
                    ref="details"
                    @blur="detailsShow = true"
                    v-model="item.projectDetails"
                    :rows="5"
                    type="textarea"
                    placeholder="请输入项目简介"
                  />
                </el-scrollbar>
              </div>
              <div>
                <el-input
                  v-if="pathShow"
                  v-model="item.path"
                  ref="path"
                  @blur="savePath(index, item.path)"
                ></el-input>
              </div>
              <div v-if="!pathShow" style="textalign: center">
                <a
                  :href="item.path"
                  style="text-decoration: none; color: #fff"
                  target="_blank"
                >
                  <el-button type="primary" class="button">查看</el-button>
                </a>
                <el-button
                  type="primary"
                  class="button2"
                  @click="editPath(index)"
                >
                  修改地址
                </el-button>
              </div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
      <div class="add">
        <el-button type="primary" @click="addProject">添加项目</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    nextTick,
    reactive,
    watch,
    onMounted,
    toRefs,
  } from "vue";
  import { saveProjectList, readProjectList } from "../utils/projectList";
  import { projectListType } from "../utils/projectListType";
  import { ElMessage, ElMessageBox } from "element-plus";

  export default defineComponent({
    name: "projectClassification",
    components: {},
    methods: {},
    setup() {
      //初始化定义的数据
      let project = reactive<{ list: projectListType[] }>({
        list: [],
      });
      /**
       * 项目名称的数据和方法
       */
      let projectNameShow = ref(true);
      // 获取ref
      let projectName = ref();
      //点击项目名称让输入框获取焦点
      function editProjectName(i: number) {
        projectNameShow.value = false;
        nextTick(() => {
          projectName.value[i].focus();
        });
      }

      /**
       * 用户名的数据和方法
       */
      let usreShow = ref(true);
      // 获取ref
      let name = ref();
      //点击用户名让输入框获取焦点
      function editUserName(i: number) {
        usreShow.value = false;
        nextTick(() => {
          name.value[i].focus();
        });
      }
      /**
       * 密码的数据和方法
       */
      let passWordShow = ref(true);
      // 获取ref
      let passWord = ref();
      //点击密码让输入框获取焦点
      function editPassWord(i: number) {
        passWordShow.value = false;
        nextTick(() => {
          passWord.value[i].focus();
        });
      }
      /**
       * 项目简介的数据和方法
       */
      let detailsShow = ref(true);
      // 获取ref
      let details = ref();
      //点击简介让输入框获取焦点
      function editDetail(i: number) {
        detailsShow.value = false;
        nextTick(() => {
          details.value[i].focus();
        });
      }
      /**
       * 项目地址的数据和方法
       */
      let pathShow = ref(false);
      // 获取ref
      let path = ref();
      //点击简介让输入框获取焦点
      function editPath(i: number) {
        pathShow.value = true;
        nextTick(() => {
          path.value[i].focus();
        });
      }
      //保存项目地址
      function savePath(i: number, val: string) {
        pathShow.value = false;
        path.value[i].path = val;
      }
      // 生命周期函数
      onMounted(() => {
        nextTick(() => {
          project.list = readProjectList();
        });
      });
      /**添加项目数据的方法 */
      let carousel = ref();
      function addProject() {
        project.list.push({
          projectName: "",
          userName: "",
          passWord: "",
          projectDetails: "",
          path: "https://www.baidu.com",
        });
        //添加后显示的索引就是新添加的那个
        nextTick(() => {
          if (project.list.length) {
            carousel.value.setActiveItem(project.list.length - 1);
          }
        });
      }

      /**删除项目 */
      function deleteProject(i: number) {
        ElMessageBox.confirm("确定删除该项目吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            project.list.splice(i, 1);
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消删除",
            });
          });
      }
      //监听数据变化后存入本地
      watch(() => project.list, saveProjectList, { deep: true });

      /**
       * 搜索项目
       */
      let projectTitle = ref("");
      function search() {
        if (projectTitle.value) {
          let isSearchWin = false;
          project.list.forEach((item, index) => {
            if (
              item.projectName == projectTitle.value &&
              item.projectName !== ""
            ) {
              carousel.value.setActiveItem(index);
              projectTitle.value = "";
              //搜索成功
              isSearchWin = true;
            }
          });
          if (!isSearchWin) {
            ElMessage({
              type: "error",
              message: "没有找到该项目,请确认您输入的项目名称是否正确!",
            });
          }
        }
      }
      return {
        //搜索项目
        search,
        projectTitle,
        //项目数据
        ...toRefs(project),
        projectNameShow,
        projectName,
        editProjectName,
        //用户
        usreShow,
        name,
        editUserName,
        //密码
        passWordShow,
        passWord,
        editPassWord,
        //详情
        detailsShow,
        details,
        editDetail,
        // 项目地址
        pathShow,
        path,
        editPath,
        savePath,
        // 添加
        addProject,
        carousel,
        //删除
        deleteProject,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .home {
    background: url("/public/img/bg/19.png");
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    min-width: 800px;
    min-height: 800px;
    position: relative;
    .search {
      display: flex;
      margin: auto;
      text-align: center;
      width: 300px;
      margin-bottom: 40px;
    }
    .header {
      text-align: center;
      color: #e06c75;
      font-weight: 600;
      font-size: 30px;
      line-height: 80px;
      margin-bottom: 60px;
    }
    .cardBox {
      width: 1600px;
      margin: auto;
      position: relative;

      .card {
        width: 100%;
        margin: 10px;
        position: relative;
        .delete {
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
        }
        .projectIntroduction {
          p {
            //上边距为0 其他边距为10
            margin: 0 10px;
          }
        }
        ::v-deep .el-card__body {
          display: flex;
          height: 100%;
        }
        .image {
          width: 40%;
          height: 100%;
          display: block;
        }
        .button {
          position: absolute;
          bottom: 15px;
          left: 75%;
          transform: translateX(-50%);
        }
        .button2 {
          position: absolute;
          bottom: 15px;
          left: 60%;
          transform: translateX(-50%);
        }

        .bottom {
          margin-top: 13px;
          line-height: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .loginfo {
            h3 {
              margin-bottom: 15px;
            }
          }
        }
      }
      .add {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        bottom: -100px;
        .el-button {
          width: 200px;
          height: 50px;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .is-in-stage {
    opacity: 0.5;
  }
  .is-active {
    opacity: 1;
  }
  .card:hover {
    .delete {
      opacity: 1 !important;
    }
  }
</style>
