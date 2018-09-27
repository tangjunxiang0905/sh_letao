$(function () {
    // 1-进行表单校验配置
    //   1-1用户名不能为空  长度为2-6位
    //   1-2密码不能为空 长度为6-12位
    // 实现表单校验功能  进行表单校验初始化
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，固定写法
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',   //校验成功
            invalid: 'glyphicon glyphicon-remove',  //校验失败
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },



        //配置校验字段
        fields: {
            username: {
                //配置校验规则 
                validators: {
                    //非空校验
                    notEmpty: {
                        //    提示信息
                        message: '当前用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '请输入3-6位用户名'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password: {
                //配置校验规则                
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '当前密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '请输入6-12位密码'
                    },
                    // callback, 专门用于配置回调的提示说明
                    callback: {
                        message:"密码错误",
                    }
                }
            }
        }
    })
})



// 2-通过submit  按钮进行提交表单  可以让表单校验插件进行校验
// 2-1 校验通过 默认将表单继续提交  会跳转页面  需要在校验通过后，
// 阻止默认的提交  通过ajax进行登录请求
// 2-2 校验失败  表单校验插件本身就会阻止默认的提交


// 思路：注册表单校验成功事件  阻止默认的表单提交  通过ajax 进行提交
$('#form').on('success.form.bv', function (e) {
    // 阻止默认的表单提交
    e.preventDefault();
    // console.log(111);

    // 通过ajax请求
    $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        // 通过表单序列化快速获取表单值
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (info) {
            // console.log(info);
            
            if (info.success) {
                location.href = 'index.html';
            }
            if (info.error === 1000) {
                // alert('用户名不存在');
                $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
            } 
            if (info.error === 1001) {
                // alert('密码错误');
                $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
            }
        }
    })
})




// 3-添加重置功能
// 属性选择器
$('[type="reset"]').on('click',function() {
    // 调用插件的方法  进行重置
    // resetForm(布尔值)有两个参数 
    // 1-  true  表示将表单内容和校验状态都重置
    // 2-  false 只重置校验状态  
    $('#form').data('bootstrapValidator').resetForm();
})