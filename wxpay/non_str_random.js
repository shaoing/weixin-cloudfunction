/*
 * WeChat Pay Non_Str Random
*/
function non_str() {
  var data = '';
  var chars = ['0', 'l', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (var i = 0; i < 32; i++) {
    var id = parseInt(Math.random() * (chars.length - 1));
    data += chars[id];
  }
  return data;
}

module.exports = non_str