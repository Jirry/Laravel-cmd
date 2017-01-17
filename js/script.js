/**
 * Created by Jirry on 2016-03-18.
 */

$(function () {
    // 生成命令
    function create() {
        // 获取表名
        var name = $.trim($('#name').val());
        name = (name == '') ? 'example' : name;

        // 多单词处理（使用name.split(/[ -_]/)写法不兼容全大写字母）
        var name_arr = name.split(' ');
        if (name_arr.length <= 1)  name_arr = name.split('-');
        if (name_arr.length <= 1) name_arr = name.split('_');

        var snake_name = ''; // 蛇形命名
        var camel_case_name = ''; // 驼峰命名

        if (name_arr.length > 1) {
            // 多个单词
            $.each(name_arr, function (index, value) {
                if (index == 0) {
                    snake_name += value.toLowerCase();
                } else {
                    snake_name += '_' + value.toLowerCase();
                }

                camel_case_name += value.charAt(0).toUpperCase() + value.slice(1);
            });
        } else {
            // 单个单词
            snake_name = name.toLowerCase();
            camel_case_name = name.charAt(0).toUpperCase() + name.slice(1);
        }

        // cmd模版
        var obj = {
            'database': {
                '创建迁移文件': 'php artisan make:migration create_#snake_name#_table --create=#snake_name#',
                '运行迁移': 'php artisan migrate',
                '创建模型': 'php artisan make:model Models/#camel_case_name#',
                '创建填充器': 'php artisan make:seeder #camel_case_name#TableSeeder',
                '运行填充器': 'php artisan db:seed --class=#camel_case_name#TableSeeder',
            },
            'controller': {
                '创建空白控制器': 'php artisan make:controller #camel_case_name#Controller --plain',
                '创建资源控制器': 'php artisan make:controller #camel_case_name#Controller',
                '创建表单请求验证': 'php artisan make:request #camel_case_name#PostRequest',
            },
            'other': {
                '创建中间件': 'php artisan make:middleware #camel_case_name#Middleware',
                '运行Elixir': 'gulp --production',
            },
        }

        // html模版
        var template = '' +
            '<h5>#title#</h5>' +
            '<div class="zero-clipboard">' +
            '    <span class="btn-clipboard" data-clipboard-text="#cmd#">copy</span>' +
            '</div>' +
            '<pre>#cmd#</pre>';

        // 清空现有内容
        $('#content').empty();

        // 循环生成命令
        $.each(obj, function (group, item) {
            $('#content').append('<div id="cmd-' + group + '" class="box"></div>')

            $.each(item, function (key, value) {
                var cmd = value.replace(/#snake_name#/g, snake_name).replace(/#camel_case_name#/g, camel_case_name); //替换cmd模版
                var html = template.replace(/#title#/g, key).replace(/#cmd#/g, cmd); //替换html模版

                $('#cmd-' + group).append(html);
            });
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