"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    const handleModify = () => {
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
      if (newPassword.value.length < 6) {
        common_vendor.index.showToast({
          title: "密码长度不能少于6位",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "修改中...",
        mask: true
      });
      setTimeout(() => {
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
          common_vendor.index.navigateBack();
        }, 1500);
      }, 1500);
    };
    const handleForgotPassword = () => {
      common_vendor.index.showModal({
        title: "忘记密码",
        content: "请联系客服或管理员重置密码",
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#9E7961"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: showOldPassword.value ? "text" : "password",
        c: oldPassword.value,
        d: common_vendor.o(($event) => oldPassword.value = $event.detail.value),
        e: common_vendor.t(showOldPassword.value ? "👁️" : "👁️‍🗨️"),
        f: common_vendor.o(($event) => togglePasswordVisibility("old")),
        g: showNewPassword.value ? "text" : "password",
        h: newPassword.value,
        i: common_vendor.o(($event) => newPassword.value = $event.detail.value),
        j: common_vendor.t(showNewPassword.value ? "👁️" : "👁️‍🗨️"),
        k: common_vendor.o(($event) => togglePasswordVisibility("new")),
        l: showConfirmPassword.value ? "text" : "password",
        m: confirmPassword.value,
        n: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        o: common_vendor.t(showConfirmPassword.value ? "👁️" : "👁️‍🗨️"),
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
