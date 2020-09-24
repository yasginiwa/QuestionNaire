import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      openid: '',
      company: '',
      confirm: '',
      countoffset: '',
      timeoffset: '',
      attitude: '',
      box: '',
      date: '',
      channel: '',
      sugguestion: '',
      rate: ''
    },
    isSubmited: false,
    show: false
  },

  onChange(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: e.detail })
  },

  //  显示日期选择对话框
  onDateSelected() {
    this.setData({
      show: true
    })
  },

  //  日期选择器关闭
  onCalClose() {
    this.setData({
      show: false
    })
  },

  //  格式化日期
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${((date.getMonth() + 1) + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;
  },

  //  日期选择确认
  onCalConfirm(e) {
    this.setData({
      show: false,
      ['form.date']: this.formatDate(e.detail)
    })
  },

  //  表单验证
  validate(values) {
    //  验证单位
    if (values.company.length < 1) {
      Toast.fail('请填写单位')
      return false
    }

    //  验证送货收货确认
    if (values.confirm.length < 1) {
      Toast.fail('请选择送货收货确认情况')
      return false
    }

    //  验证送货品种、数量偏差情况
    if (values.countoffset.length < 1) {
      Toast.fail('请选择送货品种、数量偏差情况')
      return false
    }

    //  验证送货时间、地点偏差情况
    if (values.timeoffset.length < 1) {
      Toast.fail('请选择送货时间、地点偏差情况')
      return false
    }

    //  验证送货师傅礼貌情况
    if (values.attitude.length < 1) {
      Toast.fail('请选择送货师傅是否礼貌')
      return false
    }

    //  验证包装完好情况
    if (values.box.length < 1) {
      Toast.fail('请选择包装完好情况')
      return false
    }

    //  验证配送时间
    if (values.date.length < 1) {
      Toast.fail('请选择送货时间')
      return false
    }

    //  验证送货渠道
    if (values.channel.length < 1) {
      Toast.fail('请选择订货渠道')
      return false
    }

    //  验证建议
    if (values.sugguestion.length < 1) {
      Toast.fail('请填写问题或建议')
      return false
    }

    //  验证满意度
    if (values.rate.length < 1) {
      Toast.fail('请给满意度打分')
      return false
    }

    return true
  },

  //  表单提交
  formSubmit() {
    
    if (this.validate(this.data.form)) {
      
      const openid = wx.getStorageSync('openid')
      
      this.setData({
        ['form.openid']: openid
      })

      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        mask: true
      });

      wx.request({
        url: api.addNaireUrl,
        method: 'POST',
        data: this.data.form,
        success: (result) => {
          if (result.data.meta.status !== 201) {
            Toast.fail('提交失败')
            return
          }
          Toast.clear
          
          Toast.success('提交成功！')
          this.setData({
            isSubmited: true
          })
        }
      },
      )
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

 

})