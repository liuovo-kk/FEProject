"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      common_vendor.index.__f__("log", "at pages/login/login.vue:41", "登录：", this.phone, this.password);
      if (this.phone && this.password) {
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
      } else {
        common_vendor.index.showToast({
          title: "请输入手机号和密码",
          icon: "none"
        });
      }
    },
    onForgotPassword() {
      common_vendor.index.navigateTo({
        url: "/pages/forget-passward/forget-passward"
      });
    },
    onRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: common_vendor.o((...args) => $options.onForgotPassword && $options.onForgotPassword(...args)),
    g: common_vendor.o((...args) => $options.onRegister && $options.onRegister(...args)),
    h: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
