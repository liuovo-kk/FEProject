"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatarUrl: "/static/默认头像.png",
      // 默认头像路径
      phone: "",
      code: "",
      newPassword: "",
      isSubmitting: false,
      // 提交状态标志
      isCounting: false,
      // 验证码倒计时标志
      countdown: 60
      // 验证码倒计时秒数
    };
  },
  methods: {
    // 获取验证码
    getCode() {
      if (!/^1\d{10}$/.test(this.phone)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号码",
          icon: "none"
        });
        return;
      }
      this.isCounting = true;
      this.countdown = 60;
      common_vendor.index.showToast({
        title: "验证码已发送",
        icon: "success"
      });
      const timer = setInterval(() => {
        if (this.countdown <= 1) {
          clearInterval(timer);
          this.isCounting = false;
          return;
        }
        this.countdown--;
      }, 1e3);
    },
    // 提交重置密码
    submitReset() {
      if (!this.phone.trim()) {
        common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return;
      }
      if (!/^1\d{10}$/.test(this.phone)) {
        common_vendor.index.showToast({
          title: "请输入有效的11位手机号",
          icon: "none"
        });
        return;
      }
      if (!this.code.trim()) {
        common_vendor.index.showToast({
          title: "请输入验证码",
          icon: "none"
        });
        return;
      }
      if (!this.newPassword.trim()) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      if (this.newPassword.length < 6) {
        common_vendor.index.showToast({
          title: "密码长度至少6位",
          icon: "none"
        });
        return;
      }
      this.isSubmitting = true;
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        this.isSubmitting = false;
        common_vendor.index.showToast({
          title: "密码已重置",
          icon: "success",
          success: () => {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            }, 1500);
          }
        });
      }, 1500);
    },
    // 返回登录页
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatarUrl,
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: $data.code,
    e: common_vendor.o(($event) => $data.code = $event.detail.value),
    f: common_vendor.t($data.countdown > 0 && $data.countdown < 60 ? $data.countdown + "s" : "获取验证码"),
    g: $data.isCounting,
    h: common_vendor.o((...args) => $options.getCode && $options.getCode(...args)),
    i: $data.newPassword,
    j: common_vendor.o(($event) => $data.newPassword = $event.detail.value),
    k: common_vendor.t($data.isSubmitting ? "提交中..." : "确认"),
    l: common_vendor.o((...args) => $options.submitReset && $options.submitReset(...args)),
    m: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-af6938b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/forget-passward/forget-passward.js.map
