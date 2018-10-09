$(function () {
    var currentPage = 1;  //当前页
    var pageSize = 5;  // 每页多少条

    // 一进入页面发送请求   获取数据渲染
    render();

    function render() {

        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('productTmp', info);
                $('tbody').html(htmlStr);


                // 进行分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //    更新当前页
                        currentPage = page;
                        // 让页面重新渲染
                        render();
                    }
                });
            }
        })
    }
})