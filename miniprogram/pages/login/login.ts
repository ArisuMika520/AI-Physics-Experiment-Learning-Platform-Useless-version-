import * as userData from '../../data/user.js';

Page({
  data: {
    username: '',
    password: ''
  },

  handleUsernameInput(e: any) {
    this.setData({
      username: e.detail.value
    });
  },

  handlePasswordInput(e: any) {
    this.setData({
      password: e.detail.value
    });
  },

  handleLogin() {
    const { username, password } = this.data;
    if (username === userData.username && password === userData.password) {
      // @ts-ignore
      const customAlert = this.selectComponent('#custom-alert');
      customAlert.show();

      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }, 1500); // 延迟1.5秒以显示弹窗
    } else {
      wx.showToast({
      title: '用户名或密码错误',
      icon: 'none',
      duration: 2000
    });
  }
},

handleCJLULogin() {
  wx.showToast({
    title: '身份系统对接中，暂时无法使用',
    icon: 'none',
    duration: 2000
  });
}
});