"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://106.52.165.122:8080";
const TIMEOUT = 1e4;
const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      method = METHOD.POST,
      data = {},
      showLoading = true,
      showError = true
    } = options;
    if (showLoading) {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
    }
    const token = common_vendor.index.getStorageSync("token");
    const headers = {
      "Content-Type": "application/json"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    common_vendor.index.request({
      url: BASE_URL + url,
      method,
      data: method === METHOD.GET ? data : JSON.stringify(data),
      // GET 参数直接传，其他方法传 JSON
      header: headers,
      timeout: TIMEOUT,
      success: (res) => {
        if (showLoading) {
          common_vendor.index.hideLoading();
        }
        const {
          code,
          message,
          data: responseData
        } = res.data;
        if (code === 200) {
          resolve(responseData);
        } else {
          const errorMsg = message || "请求失败";
          if (showError) {
            common_vendor.index.showToast({
              title: errorMsg,
              icon: "none",
              duration: 2e3
            });
          }
          if (code === 401) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
              // 跳转到登录页
            });
          }
          reject({
            code,
            message,
            data: responseData
          });
        }
      },
      fail: (err) => {
        if (showLoading) {
          common_vendor.index.hideLoading();
        }
        const errorMsg = "网络异常，请检查网络连接";
        if (showError) {
          common_vendor.index.showToast({
            title: errorMsg,
            icon: "none"
          });
        }
        reject(err);
      }
    });
  });
}
const http = {
  get: (url, data, options) => request(url, {
    ...options,
    method: METHOD.GET,
    data
  }),
  post: (url, data, options) => request(url, {
    ...options,
    method: METHOD.POST,
    data
  }),
  put: (url, data, options) => request(url, {
    ...options,
    method: METHOD.PUT,
    data
  }),
  delete: (url, data, options) => request(url, {
    ...options,
    method: METHOD.DELETE,
    data
  })
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
