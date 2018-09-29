$(function () {
    //一进入页面 需要发送ajax请求  请求用户列表数据，通过模板引擎  进行渲染
    var currentPage = 1;  //表示当前页
    var pageSize = 5;    //每页多少条

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
})