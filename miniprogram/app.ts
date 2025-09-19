// app.ts
App<IAppOption>({
  globalData: {},
  
  onLaunch() {
    try {
      const systemInfo = wx.getSystemInfoSync()
      console.log('系统信息:', systemInfo)
    } catch (error) {
      console.error('获取系统信息失败:', error)
    }

    try {
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    } catch (error) {
      console.error('本地存储操作失败:', error)
    }

    wx.login({
      success: res => {
        if (res.code) {
          console.log('登录成功，code:', res.code)
        } else {
          console.error('登录失败:', res.errMsg)
        }
      },
      fail: (error) => {
        console.error('wx.login 调用失败:', error)
      }
    })

    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        console.log('检查更新结果:', res.hasUpdate)
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        console.error('更新失败')
      })
    }
  },

  onShow() {
    console.log('小程序显示')
  },

  onHide() {
    console.log('小程序隐藏')
  },

  onError(error: string) {
    console.error('小程序发生错误:', error)
  },

})