window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;

    // 1 自动播放图片-css3的平移 transform: translateX(-100px) 
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s'; // 过渡
        ul.style.transform = 'translateX(' + translatex + 'px)'; // 平移
    }, 2000);

    // 2 无缝滚动
    ul.addEventListener('transitionend', function () {
        if (index === 3) {
            index = 0;
            // 去掉过渡 快速回到真正意义第一张图片
            ul.style.transition = 'none';
            // 平移到0
            ul.style.transform = 'translateX(0px)';
        } else if (index < 0) {
            index = 2;
            // 去掉过渡 快速回到真正意义第一张图片
            ul.style.transition = 'none';
            var translatex = -index * w;
            // 平移
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }

        // 小圆圈样式跟随变化 当图片播放完毕后才设置小圆圈样式 所以代码要放这里
        ol.querySelector('.current').classList.remove('current');
        // 当前小li的索引等于index
        ol.children[index].classList.add('current');
    });

    // 手指滑动轮播图
    // ul的位置 = 初始位置 + 手指滑动距离
    var startX = 0;
    var moveX = 0; // 记录手指滑动的距离
    var flag = false; // 一开始滑动
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function (e) {
        flag = true;
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        // 取消过渡
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    });

    // 根据手指滑动距离判断显示上一张或下一张或回弹 30
    ul.addEventListener('touchend', function () {
        // 当有手指滑动时候做判断
        if (flag) {
            if (moveX > 50) {
                // 向右滑动 显示上一张
                index--;
                console.log(index);
            } else if (moveX < -50) {
                // 向右滑动 显示下一张
                index++;
                console.log(index);
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s'; // 过渡
            ul.style.transform = 'translateX(' + translatex + 'px)'; // 平移
        }
    });
});