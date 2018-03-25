import Mock from 'mockjs';
import util from '../libs/util'
Mock.mock(util.getUrl("/xiaomiao"), 'post', function () {
  return {
    "respDesc": null,
    "data": {

      "money": "5000"
    },
    "respCode": "0000"
  }
});

export default Mock
