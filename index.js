// var ifaces = require('os').networkInterfaces(),
//     ip = null;

// Object.keys(ifaces).forEach(function(dev) {
//     ifaces[dev].forEach(function(details) {
//         if (details.family === 'IPv4') {
//             console.log(details.address);
//         }
//     });
// });
// console.log(ifaces);
// 
// 
// 
// 


'use strict';
var os = require('os');

var type = {
  v4: {
    def: '127.0.0.1',
    family: 'IPv4'
  },
  v6: {
    def: '::1',
    family: 'IPv6'
  }
};
// let str = networksetup -listallhardwareports
// console.log(str)

function internalIp(version) {
  var options = type[version];
  var ret = options.def;
  var interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach(function(el) {
    if (ret !== options.def) { // first
      return
    }
    interfaces[el].forEach(function(el2) {
      if (!el2.internal && el2.family === options.family) {
        ret = el2.address;
      }
    });
  });

  return ret;
}

function v4() {
  return internalIp('v4');
}

function v6() {
  return internalIp('v6');
}

module.exports = v4;
module.exports.v4 = v4;
module.exports.v6 = v6;
// console.log(v4())