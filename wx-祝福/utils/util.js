const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// let infoData = [{ itemid: '1', bgcolor: '#a80019', title: '新年祝福', txt: '新年伊始元，送你一支梅，纯洁意志坚，生活无限美。祝你：新年快乐！就像寒梅花，漂亮又善良，幸福花香飘。' }, { itemid: '2', bgcolor: '#b71c1a', title: '生日祝福', txt: '一直如少年干净纯粹，心安看透不美好，见过不善良却依旧善良' }, { itemid: '3', bgcolor: '#29689b', title: '节日祝福', txt: '愿你的快乐与岁月无关，愿你的纯真与经历无关。沧海桑田后依旧乘风破浪，尘埃落定后依旧炙热欢唱' }];
var infoData = [];
// wx.request({
//   url: 'http://wxapi.sanshengshi.co/api/zhufu.php', //仅为示例，并非真实的接口地址
//   success: function (res) {
//     console.log(res.data);
//     infoData = res.data;
//     console.log(infoData)
//   }
// })

// const selectItem = (id) => {
//   console.log(infoData)
//   // for (let i = 0; i <= infoData.length; i++) {
//   //   // console.log(id)
//   //   if (infoData[i].itemid == id) {
//   //     return infoData[i];
//   //   }
//   // }
// }

module.exports = {
  formatTime: formatTime,
  infoData,
  // selectItem
}
