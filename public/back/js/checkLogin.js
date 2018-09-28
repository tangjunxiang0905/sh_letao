// 这个js用于拦截未登录用户  未登录的用户直接拦截到登录页面 
// 4-登录拦截功能
    // 如果当前用户没登录  需要拦截到登录页
    // 但是前端不知道用户有没有登录  后端知道  所以需要发送请求获取用户登录状态
$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info) {
        // console.log(info);
     if(info.error === 400) {
         location.href = 'login.html';
     }
     if(info.success) {
         console.log('当前用户已登录');
     }
    }
})