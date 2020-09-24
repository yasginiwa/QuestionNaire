//app.js
import api from './utils/api'

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: async function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    if(wx.getStorageSync('userinfo')) {
      wx.hideLoading()
      return
    }

    //  获取js_code
    let getJscode = () => {
      return new Promise((resolve, reject) => {
        wx.login({
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    }

    //  请求openid 如首次登陆 则存储openid到本地 如不是 则存储openid到本地
    wx.request({
      url: api.openidUrl,
      method: 'POST',
      data: {
        js_code: await getJscode()
      },
      success: (res) => {
        
        wx.hideLoading()
        wx.request({
          url: api.naireUrl,
          data: {
            'openid': res.data.data.openid
          },
          success: (result) => {

            //  如果之前登陆过
            if(result.data.data.result.length) {

              let indexPage = getCurrentPages()[0]
              const { openid, company, confirm, countoffset, timeoffset, attitude, box, date, channel, sugguestion, rate } = result.data.data.result[0]

              indexPage.setData({
                form: { openid, company, confirm, countoffset, timeoffset, attitude, box, date, channel, sugguestion, rate },
                isSubmited: true
              })
              
            } else {
              wx.setStorageSync('openid', res.data.data.openid)
            }
          }
        })
      },
      fail: (err) => {
        console.log(err)
        wx.showToast({
          title: '网络开小差了...',
          duration: 1500,
          icon: 'none'
        })
      }
    })
  }
  
})
