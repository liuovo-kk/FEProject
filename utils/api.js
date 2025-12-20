// utils/api.js

import http from './request.js';

// 用户登录
export const login = (data) => {
	return http.post('/auth/login', data);
};

// 用户注册
export const register = (data) => {
	return http.post('/auth/register', data);
};

// 获取用户资料（需要 Token）
export const getUserProfile = () => {
	return http.get('/api/users/profile');
};

// 修改密码（需要 Token）
export const changePassword = (data) => {
	return http.put('/api/users/password', data);
};

// 退出登录（需要 Token）
export const logout = () => {
	return http.post('/api/auth/logout');
};