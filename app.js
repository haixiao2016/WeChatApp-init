//app.js
const Util = require('./utils/util.js');
App({
  onLaunch: function () {
    //判断用户是否登陆
    
  },
  //全局定义通用访问请求函数
  fechApi(pageSelf = '', url, params, getType, success = (res) => { }, actionError = (res) => { }, fail = (res) => { }){
    let self  = this;
    //是否显示加载信息
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${this.globalData.baseUrl}${url}`,
      method:getType,
      data:params,
      header: { 'token': this.globalData.token||''},
      success:function(res){
        wx.hideLoading();
        console.log("成功");
        if(res.cuccess){
          success(res.data);
        }else if(res.err_code = 401){
          //未登录,执行登陆逻辑
          self.globalData.token = null;
          self.globalData.userInfo = null;
          self.signin();
        }
      },
      fail:function(err){
        wx.hideLoading();
        Util.showSelfModal(pageSelf, '请求失败');
      }
    })
  },
  signin:function(){
    wx.login({
      success:function(res){
        console.log(res)
      }
    })
  },
  globalData: {
    baseUrl:'https://bcf.baibaobike.com/',
    token:'',
    userInfo: null
  }
})