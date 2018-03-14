import axios from './axios';
import util from './util';
let module = {
    util,
    axios
};
module.install = function (Vue) {
    Vue.prototype.util = util;
    Vue.prototype.axios = axios;
}
export default module;