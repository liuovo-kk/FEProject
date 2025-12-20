"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_api = require("../../utils/api.js");
const _sfc_main = {
  __name: "modify-password",
  setup(__props) {
    const oldPassword = common_vendor.ref("");
    const newPassword = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const showOldPassword = common_vendor.ref(false);
    const showNewPassword = common_vendor.ref(false);
    const showConfirmPassword = common_vendor.ref(false);
    const togglePasswordVisibility = (type) => {
      if (type === "old") {
        showOldPassword.value = !showOldPassword.value;
      } else if (type === "new") {
        showNewPassword.value = !showNewPassword.value;
      } else if (type === "confirm") {
        showConfirmPassword.value = !showConfirmPassword.value;
      }
    };
    const canSubmit = common_vendor.computed(() => {
      return oldPassword.value.trim() !== "" && newPassword.value.trim() !== "" && confirmPassword.value.trim() !== "" && newPassword.value === confirmPassword.value;
    });
    const handleModify = async () => {
      if (!canSubmit.value) {
        if (newPassword.value !== confirmPassword.value) {
          common_vendor.index.showToast({
            title: "两次输入的新密码不一致",
            icon: "none",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: "请填写所有密码信息",
            icon: "none",
            duration: 2e3
          });
        }
        return;
      }
      const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
      if (!newPasswordRegex.test(newPassword.value)) {
        common_vendor.index.showToast({
          title: "新密码必须为8-20位，且包含大小写字母和数字",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      try {
        common_vendor.index.showLoading({
          title: "修改中...",
          mask: true
        });
        await utils_api.changePassword({
          oldPassword: oldPassword.value,
          newPassword: newPassword.value
        });
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "密码修改成功",
          icon: "success",
          duration: 2e3
        });
        oldPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/my/my"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("error", "at pages/modify-password/modify-password.vue:155", "修改密码失败：", error);
      }
    };
    const handleForgotPassword = () => {
      common_vendor.index.navigateTo({
        url: "/pages/forget-passward/forget-passward"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: showOldPassword.value ? "text" : "password",
        c: oldPassword.value,
        d: common_vendor.o(($event) => oldPassword.value = $event.detail.value),
        e: showOldPassword.value ? "/static/icons/preview-open.png" : "/static/icons/preview-close.png",
        f: common_vendor.o(($event) => togglePasswordVisibility("old")),
        g: showNewPassword.value ? "text" : "password",
        h: newPassword.value,
        i: common_vendor.o(($event) => newPassword.value = $event.detail.value),
        j: showNewPassword.value ? "/static/icons/preview-open.png" : "/static/icons/preview-close.png",
        k: common_vendor.o(($event) => togglePasswordVisibility("new")),
        l: showConfirmPassword.value ? "text" : "password",
        m: confirmPassword.value,
        n: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        o: showConfirmPassword.value ? "/static/icons/preview-open.png" : "/static/icons/preview-close.png",
        p: common_vendor.o(($event) => togglePasswordVisibility("confirm")),
        q: common_vendor.o(handleForgotPassword),
        r: !canSubmit.value ? 1 : "",
        s: common_vendor.o(handleModify)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a1423707"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/modify-password/modify-password.js.map
