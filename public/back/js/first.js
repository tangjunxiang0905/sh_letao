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
    $('#addBtn').on('click',function() {
        $('#addModal').modal('show');
    })

})