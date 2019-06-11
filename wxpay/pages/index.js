pay: function () {
    wx.cloud.callFunction({ 
      name: 'wxpay', 
      data: {
        openid: wx.getStorageSync('openid'), 
        total_fee: this.data.fee * 100 
      }, complete: res => { 
        wx.requestPayment({ 
          timeStamp: res.result.data.timeStamp, 
          nonceStr: res.result.data.nonceStr, 
          package: res.result.data.package, 
          signType: 'MD5', 
          paySign: res.result.data.paySign
        }) 
      } 
    })  
  },
