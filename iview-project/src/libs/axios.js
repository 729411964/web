import axios from 'axios';
import qs from 'qs';
axios.defaults.method = 'post';
axios.defaults.timeout = 10000;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data, headers) {
    // By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use the following options.
    return qs.stringify(data);
}];
axios.defaults.validateStatus = function (status) {
    //去除loading框
    switch(status+""){
        case '404':
            break;
        case '500':
            break;
        case '401':
            break;
        case '200':
            break;
        default:
            break;
    }
    return status >= 200 && status < 300; // default
},
axios.interceptors.response.use(function (response) {

    if(response.data.respCode == "0000"){
        return response.data.data;
    }else{
        //进行提示弹框  并关掉loading层
        return Promise.reject({
            respDesc:response.data.respDesc,
            respCode:response.data.respDesc
        });
    }

}, function (error) {
    //进行提示弹框  并关掉loading层

    console.log(error);
    return Promise.reject(error);
});
export default axios;