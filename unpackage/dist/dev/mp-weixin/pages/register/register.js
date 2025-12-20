"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const _sfc_main = {
  data() {
    return {
      // form: {
      // 	username: '',
      // 	password: '',
      // 	phone: ''.
      // }
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
    // chooseAvatar() {
    // 	// 使用 uni.chooseImage API 选择图片
    // 	uni.chooseImage({
    // 		count: 1, // 最多选择一张
    // 		sizeType: ['compressed'], // 可以指定是原图还是压缩图
    // 		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
    // 		success: (res) => {
    // 			const tempFilePaths = res.tempFilePaths;
    // 			if (tempFilePaths.length > 0) {
    // 				this.avatarUrl = tempFilePaths[0];
    // 				// 可以在这里调用上传头像的方法
    // 				// this.uploadAvatar(tempFilePaths[0]);
    // 			}
    // 		},
    // 		fail: (err) => {
    // 			uni.__f__('error','at pages/register/register.vue:93','选择图片失败', err);
    // 			uni.showToast({
    // 				title: '选择图片失败，请重试',
    // 				icon: 'none'
    // 			});
    // 		}
    // 	});
    // },
    // 处理文件输入变化（备选方案，如果需要直接使用 input 方式）
    // onAvatarChange(e) {
    // 	const file = e.detail.files[0];
    // 	if (file) {
    // 		// 使用 FileReader 读取文件并显示预览
    // 		const reader = new FileReader();
    // 		reader.onload = (event) => {
    // 			this.avatarUrl = event.target.result;
    // 		};
    // 		reader.readAsDataURL(file);
    // 		// 可以在这里调用上传头像的方法
    // 		// this.uploadAvatar(file);
    // 	}
    // },
    // // 上传头像（模拟上传，实际开发中需要对接后端接口）
    // uploadAvatar(avatarFile) {
    // 	this.isUploading = true;
    // 	// 模拟上传过程，实际开发中使用 uni.uploadFile
    // 	uni.showLoading({
    // 		title: '上传中...',
    // 	});
    // 	// 假装上传耗时 2 秒
    // 	setTimeout(() => {
    // 		uni.hideLoading();
    // 		this.isUploading = false;
    // 		uni.showToast({
    // 			title: '头像上传成功',
    // 			icon: 'success'
    // 		});
    // 	}, 2000);
    /*
    // 实际上传示例（需要后端接口支持）
    uni.uploadFile({
      url: 'https://your-backend-api.com/upload-avatar', // 替换为后端上传接口
      filePath: avatarFile.path,
      name: 'avatar',
      formData: {
        'user': 'test'
      },
      success: (uploadFileRes) => {
        const data = JSON.parse(uploadFileRes.data);
        if (data.success) {
          uni.showToast({
            title: '头像上传成功',
            icon: 'success'
          });
          // 保存头像 URL 到服务器，通常会返回新的头像 URL
          // this.avatarUrl = data.url;
        } else {
          uni.showToast({
            title: data.message || '头像上传失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        uni.__f__('error','at pages/register/register.vue:161','上传失败', err);
        uni.showToast({
          title: '头像上传失败',
          icon: 'none'
        });
      },
      complete: () => {
        this.isUploading = false;
      }
    });
    */
    // },
    // 复选框状态变化
    checkboxChange(e) {
      this.isAgree = e.detail.value.length > 0;
    },
    // 提交注册
    async submitRegister() {
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
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
      if (!passwordRegex.test(this.password)) {
        common_vendor.index.showToast({
          title: "密码格式不正确，需为8-20位且包含大小写字母和数字",
          icon: "none"
        });
        return;
      }
      try {
        const res = await utils_api.register({
          username: this.username,
          phone: this.phone,
          password: this.password
          // 注意：avatar 和 其它非必填字段暂时不传
        });
        common_vendor.index.__f__("log", "at pages/register/register.vue:241", "注册成功：", res);
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/register/register.vue:256", "注册失败：", error);
      }
    },
    // // 完成注册流程（模拟）
    // async finalizeRegistration() {
    // 	// 模拟注册过程，实际开发中使用 uni.request 提交数据到后端
    // 	uni.showLoading({
    // 		title: '注册中...'
    // 	});
    // 	try {
    // 		const res = await register(this.form);
    // 	}
    // // 假装网络请求，2秒后模拟成功
    // setTimeout(() => {
    // 	uni.hideLoading();
    // 	uni.showToast({
    // 		title: '注册成功',
    // 		icon: 'success',
    // 		duration: 1500,
    // 		success: () => {
    // 			// 注册成功后跳转到登录页
    // 			setTimeout(() => {
    // 				uni.navigateTo({
    // 					url: '/pages/login/login'
    // 				});
    // 			}, 1500);
    // 		}
    // 	});
    // }, 2000);
    // },
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatarUrl,
    b: common_vendor.o((...args) => _ctx.onAvatarChange && _ctx.onAvatarChange(...args)),
    c: common_vendor.o((...args) => _ctx.chooseAvatar && _ctx.chooseAvatar(...args)),
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
