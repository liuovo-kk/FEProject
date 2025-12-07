"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const activeTab = common_vendor.ref("published");
    const refreshing = common_vendor.ref(false);
    const publishedList = common_vendor.ref([{
      id: 1,
      image: "/static/robot-arm.jpg",
      description: "未来科技发展"
    }]);
    const likedList = common_vendor.ref([{
      id: 101,
      image: "/static/code-matrix.jpg",
      description: "计算机的未来"
    }]);
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    const onRefresh = () => {
      refreshing.value = true;
      setTimeout(() => {
        refreshing.value = false;
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1500);
    };
    const navigateToModifyPassword = () => {
      common_vendor.index.navigateTo({
        url: "/pages/modify-password/modify-password"
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        confirmColor: "#DD514C",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.showToast({
              title: "退出成功",
              icon: "success",
              duration: 1500
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/login"
              });
            }, 1500);
          }
        }
      });
    };
    const previewImage = () => {
      common_vendor.index.previewImage({
        urls: ["/static/robot-arm.jpg"]
      });
    };
    const previewLikedImage = () => {
      common_vendor.index.previewImage({
        urls: ["/static/code-matrix.jpg"]
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/my/my.vue:182", "我的页面加载完成");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(navigateToModifyPassword),
        c: common_vendor.o(handleLogout),
        d: activeTab.value === "published" ? 1 : "",
        e: common_vendor.o(($event) => switchTab("published")),
        f: activeTab.value === "liked" ? 1 : "",
        g: common_vendor.o(($event) => switchTab("liked")),
        h: activeTab.value === "published"
      }, activeTab.value === "published" ? common_vendor.e({
        i: publishedList.value.length > 0
      }, publishedList.value.length > 0 ? {
        j: common_assets._imports_1,
        k: common_vendor.o(previewImage)
      } : {}, {
        l: publishedList.value.length === 0
      }, publishedList.value.length === 0 ? {} : {}) : {}, {
        m: activeTab.value === "liked"
      }, activeTab.value === "liked" ? common_vendor.e({
        n: likedList.value.length > 0
      }, likedList.value.length > 0 ? {
        o: common_assets._imports_2,
        p: common_vendor.o(previewLikedImage)
      } : {}, {
        q: likedList.value.length === 0
      }, likedList.value.length === 0 ? {} : {}) : {}, {
        r: refreshing.value,
        s: common_vendor.o(onRefresh)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
