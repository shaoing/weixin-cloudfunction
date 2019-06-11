// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var user =  await db.collection('user').where({
    _openid: wxContext.OPENID // 填入当前用户 openid
  }).get();

  if (typeof (user.data[0]) != 'undefined'){
    return user.data[0]
  }else{
    return 0
  }

}
