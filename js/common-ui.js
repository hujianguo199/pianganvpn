/*
*   浏览器环境判断对象
* */
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {   //移动终端浏览器版本信息
            windows: /windows|win32/i.test(u), //Windows电脑
            mac: /Mac68K|MacPPC|Macintosh|MacIntel/i.test(u),//mac电脑
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

/*
*   顶部导航栏下载按钮、用户登录后用户中心按钮
*   根据浏览器环境对应不同链接
* */
$(document).on('mouseenter', '.pop-tip-btn', function () {
    if (!browser.versions.mobile) {
        $(this).find('.ui-pop-tip').stop().fadeIn();
        $(this).find('a:first').addClass('arrow-rotate');
    }
});
$(document).on('mouseleave', '.pop-tip-btn', function () {
    let btn = $(this);
    if (!browser.versions.mobile) {
        btn.find('.ui-pop-tip').stop().fadeOut();
        btn.find('a:first').addClass('arrow-reset');
    }
    setTimeout(function () {
        btn.find('a:first').removeClass('arrow-rotate arrow-reset');
    }, 200)
});

/*
*   页面滚动，顶部导航栏始终固定在上方
* */
$(document).on('scroll', _.debounce(function () {
    if ($(window).width() > 1080) {
        if ($(document).scrollTop() > 88) {
            $('.page-top').addClass('slideInDown');
            $('.page-content').css('marginTop', '88px');
        } else {
            $('.page-top').removeClass('slideInDown');
            $('.page-content').css('marginTop', '0');
        }
    } else {
        if ($(document).scrollTop() > 60) {
            $('.page-top').css('box-shadow', '0 5px 10px -6px rgba(0, 0, 0, 0.15)');
        } else {
            $('.page-top').css('box-shadow', 'none');
        }
    }
}, 600));

//  设置页面内容高度，充满屏幕
function setContentHeight() {
    if (!browser.versions.mobile) {
        $('.information-list-content').height($(window).innerHeight() - $('.page-top').innerHeight() - $('.page-footer').innerHeight() - 80);
    }
}

//  系统提示
function alertMsg(msg) {
    $('body').append('<div class="toast"></div>');
    $('.toast').text(msg).fadeIn();
    $('.login-overlay').addClass('overlay-toast');
    setTimeout(function () {
        $('.toast').fadeOut().remove();
        $('.login-overlay').removeClass('overlay-toast');
    }, 1500)
}

//  标准弹窗
/*
*   params                  required        defaultType
*
*   content:弹窗内容        true            string
*   header:弹窗标题         false           string
*   okText:确认文案         false           string
*   cancelText:取消文案     false           string
*   onOk:确认按钮回调       false           function
*   onCancel:取消按钮回调   false           function
*   autoClose:自动关闭      false           boolean
*   delay:自动关闭延时      false           number    unit:ms
* */
function MsgModal(options) {
    //  注册弹窗组件
    $('.login-overlay').addClass('overlay-toast');
    let modal = `<div class="ui-modal-primary-box">
                    <div class="ui-modal-primary">
                        ${options.header ? '<h3>' + options.header + '</h3>' : ''}
                        <p style="margin: ${options.header ? '0 0 16px' : '6px 0 46px'}">${options.content}</p>
                        <div class="ui-flex ui-modal-btn-group">
                            ${options.okText ? '<a href="javascript:void(0)" class="ui-btn-primary ui-modal-btn">' + options.okText + '</a>' : ''}
                            ${options.cancelText ? '<a href="javascript:void(0)" class="ui-btn-text ui-modal-btn--cancel">' + options.cancelText + '</a>' : ''}
                        </div>
                    </div>
                </div>`;
    $('body').append(modal);

    //  弹窗关闭事件
    options.close = (fn) => {
        $('.login-overlay').removeClass('overlay-toast');
        $('.ui-modal-primary-box').remove();
        fn && fn();
    };

    $('.ui-modal-btn').click(function () {
        options.close(options.onOk);
    });
    $('.ui-modal-btn--cancel').click(function () {
        options.close(options.onCancel);
    });
    let timer = function () {
        setTimeout(function () {
            options.close();
        }, options.delay || 3000);
    };
    options.autoClose && timer();
}
