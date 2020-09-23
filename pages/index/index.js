Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      company: '',
      confirm: '',
      countOffset: '',
      timeOffset: '',
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

  //  表单提交
  formSubmit() {
    console.log(this.data.form)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //  处理是否确认送货信息
  // handleConfirmChange(e) {
  //   console.log(`confirm: ${e.detail}`)
  //   this.setData({
  //     form: {
  //       confirm: e.detail
  //     }
  //   })
  // },

  // //  数量、种类是否偏差
  // handleCountOffsetChange(e) {
  //   console.log(`countOffset: ${e.detail}`)
  //   this.setData ({
  //     form: {
  //       countOffset: e.detail
  //     }
  //   })
  // },

  // //  时间、地点是否偏差
  // handleTimeOffsetChange(e) {
  //   console.log(`timeOffset: ${e.detail}`)
  //   this.setData ({
  //     form: {
  //       timeOffset: e.detail
  //     }
  //   })
  // },

  // //  处理态度是否良好
  // handleAttitudeChange(e) {
  //   console.log(`attitude: ${e.detail}`)
  //   this.setData ({
  //     form: {
  //       attitude: e.detail
  //     }
  //   })
  // },

  // //  处理包装是否完好
  // handleBoxChange(e) {
  //   this.setData ({
  //     form: {
  //       box: e.detail
  //     }
  //   })
  // },

  //  处理选择配送具体日期
  // handleDateChange(e) {
  //   this.setData ({
  //     form: {
  //       date: e.detail
  //     }
  //   })
  // },

  //  处理选择渠道
  // handleChannelChange(e) {
  //   this.setData ({
  //     form: {
  //       channel: e.detail
  //     }
  //   })
  // },

  //  处理其他建议

  //  处理满意度星级
  // handleRateChange(e) {
  //   this.setData ({
  //     form: {
  //       rate: e.detail
  //     }
  //   })
  // },

  submit(e) {
    console.log(e)
  }


})