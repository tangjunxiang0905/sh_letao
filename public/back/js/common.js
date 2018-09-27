// 想要使用进度条功能  使用NProgress 插件

// // 开启进度条  start
// NProgress.start();

// // 关闭进度条
// NProgress.done();

// 需求：在发送第一个ajax的时候  开启进度条    在全部ajax回来的时候  结束进度条
// ajax 全局事件
// .ajaxComplete（）  当每个ajax 完成时调用  不管成功还是失败都调用
// .ajaxError（）   当每个ajax请求失败时 进行调用
// .ajaxSend（） 在每个ajax请求发送之前调用
// .ajaxStart（）   在第一个ajax 请求发送时调用
// .ajaxStop（）  在所有的ajax 请求完成时调用
// .ajaxSuccess（）  当每个ajax请求成功时 调用

$(document).ajaxStart(function() {
    //开启进度条
    NProgress.start();
})
$(document).ajaxStop(function() {
    // 关闭进度条
    NProgress.done();
})