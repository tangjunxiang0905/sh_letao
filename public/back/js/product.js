$(function () {
    var currentPage = 1;  //当前页
    var pageSize = 2;  // 每页多少条

    var picArr = []  //维护所有用于提交的图片对象

    //1. 一进入页面发送请求   获取数据渲染
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
                // console.log(info);
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
                    },
                    // 控制按钮显示的文字
                    // itemTexts  是一个函数  每个按钮在初始化的时候  都会调用该函数
                    // 将该函数的返回值 作为按钮的文本
                    // type  按钮的类型  first last prev next
                    // page  表示点击按钮跳转的页码
                    // current  表示当前页
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case 'page':
                                return page;
                            case 'first':
                                return '首页';
                            case 'last':
                                return '尾页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                        }
                    },

                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case 'page':
                                return "前往第" + page + "页";
                            case 'first':
                                return '首页';
                            case 'last':
                                return '尾页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                        }
                    },
                    // 使用bootstrap的提示框组件
                    useBootstrapTooltip: true,
                });
            }
        })
    }

    // 2. 点击添加商品  显示添加模态框
    $('#addBtn').click(function () {
        // 显示模态框
        $('#addModal').modal('show');

        // 发送ajax请求  获取全部的二级分类数据 进行渲染下拉框
        // 通过分页接口模拟  获取全部数据的接口  传page=1  pageSize=100
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('secondTmp',info);                
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });


    // 3-给下拉列表a标签 添加点击事件  通过事件委托注册
    // (1)  可以给动态生成的元素  添加点击事件
    // (2)  可以批量注册事件  且执行效率高  给大量子元素注册事件  只需给父元素注册一次即可
    $('.dropdown-menu').on('click','a',function() {
        // 获取文本值  设置给按钮
        var txt = $(this).text();
        $('#dropDownTXT').text(txt);
        // 获取id 设置给隐藏域
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);
    });



    // 4-进行文件上传初始化
    // 多文件上传  进行多次文件的上传请求
    
    $('#fileupload').fileupload({
        dataType:'json',
        // 文件上传  响应回来时调用的回调函数
        done:function(e,data) {
            // 后台返回的结果
            console.log(data.result);

            // 将图片对象名称和地址 存储在数组中  往前面追加
            picArr.unshift(data.result);
            
            var picUrl = data.result.picAddr;
            // 一旦响应得到图片地址  就渲染在页面给用户看
            $('#imgBox').prepend('<img src="'+ picUrl +'" width="100" height="100" alt="">')

            // 如果数组长度大于3 就需要移除最后一张
            // dom结构中  移除最后一张
            // 数组中  移除最后一项
            if(picArr.length > 3) {
                // 找到img类型中最后一个元素 移除
                $('#imgBox img:last-of-type').remove();
                // 移除数组中最后一项
                picArr.pop()
            }
        }
    })
})