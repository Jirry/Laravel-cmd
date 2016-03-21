/**
 * Created by Jirry on 2016-03-18.
 */

$(function () {
    // 生成命令
    function create() {
        // 获取表名
        var name = $('#name').val();
        name = (name == '') ? 'example' : name;

        // cmd模版
        var obj = {
            '创建迁移文件': 'php artisan make:migration create_#name#_table --create=#name#',
            '运行迁移': 'php artisan migrate',
            '创建模型': 'php artisan make:model Models/#Name#',
            '创建填充器': 'php artisan make:seeder #Name#TableSeeder',
            '运行填充器': 'php artisan db:seed --class=#Name#TableSeeder',
            '创建空白控制器': 'php artisan make:controller #Name#Controller --plain',
            '创建资源控制器': 'php artisan make:controller #Name#Controller',
            '创建表单请求验证': 'php artisan make:request #Name#PostRequest',
            '创建中间件': 'php artisan make:middleware #Name#',
        }

        // html模版
        var template = '' +
            '<h4>#title#</h4>' +
            '<div class="zero-clipboard">' +
            '    <span class="btn-clipboard" data-clipboard-text="#cmd#">copy</span>' +
            '</div>' +
            '<pre>#cmd#</pre>';

        // 清空现有内容
        $('#cmd').empty();

        // 循环生成命令
        $.each(obj, function (key, value) {
            var upper = name.charAt(0).toUpperCase() + name.slice(1);                       //首字母大写
            var cmd = value.replace(/#name#/g, name).replace(/#Name#/g, upper);     //替换cmd模版
            var html = template.replace(/#title#/g, key).replace(/#cmd#/g, cmd);    //替换html模版

            $('#cmd').append(html);
        });

        //复制功能
        new ZeroClipboard($('.btn-clipboard'));

        // 按钮提示
        $('.btn-clipboard').attr("title", "复制到剪贴板").data("container", "body").tooltip().click(function () {
            $(this).addClass("after").attr("title", "复制成功").tooltip("fixTitle").tooltip("show")
                .attr("title", "复制到剪贴板").tooltip("fixTitle");
        });
    }

    // 输入框内容改变
    $('#name').bind('input propertychange', function () {
        create();
    });

    create();

    $('#year').text(new Date().getFullYear());
});