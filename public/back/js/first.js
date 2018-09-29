$(function () {
    var currentPage = 1;  //当前页
    var pageSize = 5;     //每页多少条
    //1.一进入页面 需要发送ajax请求  请求页面

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('tmp', info);
                $('tbody').html(htmlStr);

                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 规定版本号必须为3
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    // event  是插件包装过的对象
                    // originalEvent   是原始的事件对象
                    // type 指代当前点击的页码类型  
                    // page 普通页码  first  第一页  last 最后一页  next 下一页  prev 上一页
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值  第一页就会显示1  
                        // console.log(page);
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        });
    }


    // 2.点击添加分类按钮  显示添加模态框
    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
    })


    // 3-通过表单校验插件   实现表单校验功能
    $('#form').bootstrapValidator({
        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',   //校验成功
            invalid: 'glyphicon glyphicon-remove',  //校验失败
            validating: 'glyphicon glyphicon-refresh'  //校验中
        },
        // 配置校验字段
        fields: {
            categoryName: {
                //配置校验字段
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    })

    // 4-注册表单校验成功事件 阻止校验成功时默认提交    通过ajax提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();


        // 通过ajax提交
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#addModal').modal('hide');
                    // 重新渲染页面
                    currentPage = 1;
                    render();
                    // 表单内容和校验状态都要重置   resetForm   默认参数是false   只有传true 才会将内容和状态都重置
                    $('#form').data('bootstrapValidator').resetForm(true);//重置表单，并且会隐藏所有的错误提示和图标
                }
            }
        })
    })



})