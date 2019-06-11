  getQr:function(){
    wx.cloud.callFunction({
      name: 'qr',
      data: {
        openid: wx.getStorageSync('openid'),
      }, complete: res => {
        console.log(res);

        var base64 = wx.arrayBufferToBase64(res.result.buffer);
        console.log(base64);
        this.setData({ qrUrl: "data:image/PNG;base64," + base64 })
        console.log(this.data.qrUrl);
      }
    })  
  },
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
