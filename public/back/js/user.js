$(function () {
    //1一进入页面 需要发送ajax请求  请求用户列表数据，通过模板引擎  进行渲染
    var currentPage = 1;  //表示当前页
    var pageSize = 5;    //每页多少条

    // 声明一个全局变量  专门用于存储当前需要修改的用户id
    var currentId;
    var isDelete;

    render();

    function render() {
        //一进入页面 需要发送ajax请求  请求用户列表数据，通过模板引擎  进行渲染
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,  //页码
                pageSize: pageSize  //每页条数
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                //模板引擎 template(模板id，数据对象)
                var htmlStr = template('tmp', info);
                // 根据生成的htmlStr 模板   渲染tbody
                $('tbody').html(htmlStr);


                // 分页初始化测试

                $('#paginator').bootstrapPaginator({
                    // 指定bootstrap本版本
                    bootstrapMajorVersion: 3,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 当前页
                    currentPage: info.page,
                    // 给分页按钮添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        // console.log(page);
                        // 更新当前页
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    // 2-点击启用禁用按钮 显示模态框  通过事件委托绑定事件 
    $('tbody').on('click', '.btn', function () {
        // console.log(111);

        // 显示模态框
        $('#userModal').modal('show');
        // 获取当前要修改的用户id
        currentId = $(this).parent().data('id');
        // console.log(id);
        // 点击禁用按钮 将用户改成禁用状态  改成0  isDelete传0
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

    });

    // 3-点击模态框的确定按钮  实现修改用户状态  发送ajax请求
    // isDelete   0是禁用   1是正常
    // 如果传1  就将该用户状态修改成启用状态
    // 如果传0  就将该用户状态修改成禁用状态
    $('#submitBtn').on('click', function () {
    //    console.log(currentId,isDelete);
       
        // 发送ajax请求  需要用户id 和 isDelete  将用户修改状态
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if(info.success) {
                    // 关闭模态框
                    $('#userModal').modal('hide');
                    // 重新渲染页面
                    render();
                    
                }
            }
        })
    })
})