// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.prototype.HOST = '/api'

Vue.config.productionTip = false



import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI)

import axios from 'axios'

import Vuex from 'vuex'
Vue.use(Vuex);
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
const store = new Vuex.Store({
    state: {
      //host: "http://prsmartoa.com:3334/",
      //host: "http://127.0.0.1:3333/springboot/",
      //host: "http://192.168.3.76:3335/",
      //host:"http://prsmartoa.com:10529/springboot/",
      user: null,
      self: '',
    },
    getters: {
      getBasicUrl(state) {

      },
      getUser(state) {
        return state.user;
      },
      getWindowHeight(state) {
        return state.height;
      },
      getWindowWidth(state) {
        return state.width;
      },
    },
    mutations: {
      setSelf(state, self) {
        state.self = self;
      },
      setUser(state, user) {
        state.user = user;
      },
      /**
       *
       * @param arr
       * @param method 要排序的字段
       */

      /**
       *
       * @param arr要排序的数字
       * @param custom {method:"字段名",order:0 从小到大 | 1 从大到小 }
       */
      arrayOrder(state, custom) {
        let arr = custom.arr;
        if (!arr) {
          return;
        }
        let method = custom.method;
        let order = custom.order;
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (order === 0) {
              if (arr[j][method] > arr[j + 1][method]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            } else {
              if (arr[j][method] < arr[j + 1][method]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            }
          }
        }


      },

      /**
       * post 多个文件
       * @param state
       * @param custom
       */
      postFiles(state, custom) {
        let headers = {
          'Content-Type': 'multipart/form-data'
        };
        axios.post(custom.url, custom.formData, {headers: headers})
          .then(res => {
            this.commit("handelResponse", {
              respose: res, callback: data => {
                custom.callback(data);
              }
            });
          });
      },
      postCustom(state, custom) {
        let url = custom.url;
        let po = custom.po;
        let callback = custom.callback;
        let myFormDatas = new FormData();
        let mark = 'po';
        if (custom.mark) {
          mark = custom.mark;
        }
        myFormDatas.append(mark, JSON.stringify(po));
        axios({
          url: url,
          method: "POST",
          data: myFormDatas,
        })
          .then(res => {
            this.commit("handelResponse", {
              respose: res, callback: data => {
                custom.callback(data);
              }
            });
          })
      },

      postFormDataCustom(state, custom) {
        let url = custom.url;
        let callback = custom.callback;
        let myFormDatas = custom.formdata;
        axios({
          url: url,
          method: "POST",
          data: myFormDatas,
        })
          .then(res => {
            this.commit("handelResponse", {
              respose: res, callback: data => {
                custom.callback(data);
              }
            });
          })
      },
      getCustom(state, custom) {
        let url = custom.url;
        axios.get(url)
          .then(res => {
            this.commit("handelResponse", {
              respose: res, callback: data => {
                custom.callback(data);
              }
            });
          });
      },
      downCustom(state, custom) {
        let url = custom.url;
        axios.get(url)
          .then(res => {

          });
      },
      handelResponse(state, custom) {
        let res = custom.respose.data;
        if (res.code == 1000) {
          if (res instanceof String) {
            let result = JSON.parse(res.data);
            custom.callback(result);
          } else {
            custom.callback(res.data);
          }
        } else {
          this.commit('notify', {type: 1, msg: res.msg});
        }
      },
      getMsgType(state, typepo) {
        let typecustom = typepo.type;
        let type = "success";
        if (typecustom == 0 || typecustom == 1000) {
          type = "success";
        } else if (typecustom == 2) {
          type = "warning";
        } else if (typecustom == 1 || typecustom > 1000) {
          //适应中台系统
          type = "error";
        } else {
          type = typecustom;
        }
        typepo.callback(type);
      },

      confirm(state, callbackpo) {
        this.commit('getMsgType', {
          type: 1, callback: type => {
            state.self.$confirm(callbackpo.message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: type
            }).then(() => {
              callbackpo.callback(true);
            }).catch(() => {
              callbackpo.callback(false);
            });
          }
        });

      },
      showMessageBox(state, messagecustom) {
        this.commit('getMsgType', {
          type: messagecustom.type, callback: type => {
            ElementUI.Message({
              showClose: true,
              message: messagecustom.msg,
              type: type,
              duration: messagecustom.duration ? messagecustom.duration : 2000,
            });
          }
        });
      },
      notify(state, custom) {
        this.commit('getMsgType', {
          type: custom.type, callback: type => {
            ElementUI.Notification({
              title: custom.title,
              message: custom.msg,
              type: type,
              duration: 2000,
            });
          }
        });

      },
    }
  })
;

Vue.filter('dateFormat', (value) => {
  if (!value) {
    return value;
  }
  let date = new Date(value);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
});

Vue.filter('dateTimeFormat', (value) => {
  if (!value) {
    return value;
  }
  let date = new Date(value);

  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
});




export default store

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
