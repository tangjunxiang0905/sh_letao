$(function() {
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
       fields:{
           username:{
               //配置校验规则 
               validators:{
                   //非空校验
                   notEmpty:{
                    //    提示信息
                       message:'当前用户名不能为空'
                   },
                   stringLength:{
                       min:3,
                       max:6,
                       message:'请输入3-6位用户名'
                   }
               }
           },
           password:{
               //配置校验规则                
               validators:{
                   //非空校验
                   notEmpty:{
                       message:'当前密码不能为空'
                   },
                   stringLength:{
                       min:6,
                       max:12,
                       message:'请输入6-12位密码'
                   }
               }
           }
       }
    })
})