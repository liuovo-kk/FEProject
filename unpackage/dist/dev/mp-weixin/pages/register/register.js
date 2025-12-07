"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatarUrl: "/static/默认头像.png",
      // 默认头像路径
      username: "",
      phone: "",
      password: "",
      isAgree: false,
      isUploading: false
      // 上传状态标志
    };
  },
  methods: {
    // 选择头像
    chooseAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多选择一张
        sizeType: ["compressed"],
        // 可以指定是原图还是压缩图
        sourceType: ["album", "camera"],
        // 可以指定来源是相册还是相机
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 0) {
            this.avatarUrl = tempFilePaths[0];
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/register/register.vue:85", "选择图片失败", err);
          common_vendor.index.showToast({
            title: "选择图片失败，请重试",
            icon: "none"
          });
        }
      });
    },
    // 处理文件输入变化（备选方案，如果需要直接使用 input 方式）
    onAvatarChange(e) {
      const file = e.detail.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.avatarUrl = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    // 上传头像（模拟上传，实际开发中需要对接后端接口）
    uploadAvatar(avatarFile) {
      this.isUploading = true;
      common_vendor.index.showLoading({
        title: "上传中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        this.isUploading = false;
        common_vendor.index.showToast({
          title: "头像上传成功",
          icon: "success"
        });
      }, 2e3);
    },
    // 复选框状态变化
    checkboxChange(e) {
      this.isAgree = e.detail.value.length > 0;
    },
    // 提交注册
    submitRegister() {
      if (!this.isAgree) {
        common_vendor.index.showToast({
          title: "请先同意协议",
          icon: "none"
        });
        return;
      }
      if (!this.username.trim()) {
        common_vendor.index.showToast({
          title: "请输入用户名",
          icon: "none"
        });
        return;
      }
      if (!this.phone.trim()) {
        common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return;
      }
      if (this.phone.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入有效的11位手机号",
          icon: "none"
        });
        return;
      }
      if (!this.password.trim()) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      if (this.avatarUrl !== "/static/默认头像.png") {
        this.isUploading = true;
        common_vendor.index.showToast({
          title: "头像上传中...",
          icon: "loading"
        });
        setTimeout(() => {
          this.isUploading = false;
          this.finalizeRegistration();
        }, 2e3);
      } else {
        this.finalizeRegistration();
      }
    },
    // 完成注册流程（模拟）
    finalizeRegistration() {
      common_vendor.index.showLoading({
        title: "注册中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success",
          duration: 1500,
          success: () => {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            }, 1500);
          }
        });
      }, 2e3);
    },
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatarUrl,
    b: common_vendor.o((...args) => $options.onAvatarChange && $options.onAvatarChange(...args)),
    c: common_vendor.o((...args) => $options.chooseAvatar && $options.chooseAvatar(...args)),
    d: $data.username,
    e: common_vendor.o(($event) => $data.username = $event.detail.value),
    f: $data.phone,
    g: common_vendor.o(($event) => $data.phone = $event.detail.value),
    h: $data.password,
    i: common_vendor.o(($event) => $data.password = $event.detail.value),
    j: $data.isAgree,
    k: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    l: common_vendor.t($data.isUploading ? "上传中..." : "同意并继续"),
    m: !$data.isAgree ? 1 : "",
    n: !$data.isAgree,
    o: common_vendor.o((...args) => $options.submitRegister && $options.submitRegister(...args)),
    p: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
