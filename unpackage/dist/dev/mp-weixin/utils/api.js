"use strict";
const utils_request = require("./request.js");
const login = (data) => {
  return utils_request.http.post("/auth/login", data);
};
const register = (data) => {
  return utils_request.http.post("/auth/register", data);
};
const changePassword = (data) => {
  return utils_request.http.put("/api/users/password", data);
};
const logout = () => {
  return utils_request.http.post("/api/auth/logout");
};
exports.changePassword = changePassword;
exports.login = login;
exports.logout = logout;
exports.register = register;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/api.js.map
