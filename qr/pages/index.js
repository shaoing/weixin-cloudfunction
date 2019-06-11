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
