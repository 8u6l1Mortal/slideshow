/*
轮播图基本结构
1.主盒box装着 → 动画时移动用的ul装着 → 装图的li → 最终的img内容
2.ul宽度 = li宽度 * li的数量
3.li浮动，排在一排
4.左右侧绝对定位的 滑动按钮
5.底部的absolute的 圆圈按钮

功能需求
1.鼠标enter经过box，左右侧按钮显示，鼠标leave离开box，按钮隐藏
2.点击左右侧按钮，可以移动ul
3.图标播放时，圆圈按钮同步变化
4.点击圆圈，可以播放相应图片
5.鼠标不经过box，可以自动播放，鼠标经过box，停止自动播放

在HTML引入js文件

这个回调函数动画.js 必须写到 index.js的上面引入
<script src="./js/callback funciton.js"></script>

引入我们首页的js文件
<script src="./js/slideshow.js"></script>
 */

// 第一步：由于该js文件是在head区link引入，所以为了js在Html元素加载完再显示。
window.addEventListener('load', function () {
    // 1-1获取元素
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    // 3-1 ul的移动距离 是小圆圈的索引号 乘以img宽度，注意是负值     // 3-2获得图片宽度
    var focusWith = focus.offsetWidth;
    //节流阀控制布尔值
    var flag = true;


    // 1-2鼠标经过，显示左右侧按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 7.2鼠标经过，取消自动播放
        clearInterval(timer)
    }) //1-3鼠标离开，隐藏左右侧按钮
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //7.3鼠标离开，开启自动播放
        var timer = setInterval(function () {
            arrow_r.click()
        }, 2000)
    })

    // 第二步：生成圆圈按钮，按钮数量同步于li的数量
    // 2-1获取ul ol元素
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // 2-2 循环遍历ul里面li的数量
    for (var i = 0; i < ul.children.length; i++) {
        // 2-3创建li元素create
        var li = document.createElement('li');
        // 3-3给ol的li设置自定义类名 和 索引号
        li.setAttribute('index', i)
        // 2-4将li添加append到ol里面
        ol.appendChild(li);
        // 2-6排他思想，给被点击的li，设置current底色
        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';//2-7清除所有
            }
            this.className = 'current';//2-8留下当前li的类名
            // 第三步：点击小圆圈，移动ul，带动li,img展示
            //5-4.获取ol图片的索引号，并让index的索引号值与num，clicle的值三者同步
            var index = this.getAttribute('index');
            num = index;
            clicle = index;
            // 3-4 调用动画的回调函数，开启圆圈按钮动画  公式为 自定义索引号乘以图片的宽度
            move(ul, -this.getAttribute('index') * focusWith)

        })
    }
    // 2-5将ol里第一个li设置底色类名current作为，默认样式
    ol.children[0].className = 'current';

    //第四步：点击右侧按钮，图片滚动功能 注意次数注意ul和按钮层级问题
    // 4-4 克隆第一张图片，放在ul里面最后一个位置，防止用户往前拉，轮播图框出现留白
    var last = ul.children[0].cloneNode(true)
    ul.appendChild(last)
    var num = 0;//4-1:声明一个变量，计算点击次数，
    var clicle = 0//5-2 计算右侧点击按钮次数
    arrow_r.addEventListener('click', function () {
        //8-1 判断上一个动画是否结果，
        if (flag) {
            //8-2如果结果了，结果为true，就执行这里的代码，且将节流阀设置为关闭false
            flag = false;
            //4-3如果num到了最后一张图片，就直接跳转到第一张，且num的次数重置为0，重新开始。
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            //4-2在动画函数中，用点击次数*图片宽度为移动距离
            num++;
            move(ul, -num * focusWith, function () {
                flag = true;//8-3节流阀，动画结束，开启节流阀
            });

            //第五步：点击右侧按钮，圆圈按钮跟着一起变化，
            //5.1申明一个变量，点击右侧按钮一次，变量就加一次
            clicle++;
            //5.2判断，如果图片到最后一张，就归原点
            if (clicle === ul.children.length - 1) {
                clicle = 0;
            }
            //5.3为了让按钮样式和点击右侧按钮次数同步，先清除所有样式，然后利用clicle为媒介，重新添加样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[clicle].className = 'current'
        }
    })
    //第六步：左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //6.1如果num为0，就跳转到最后一张图
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = num * focusWith + 'px'
            }
            //6.2因为是左侧按钮，所以都倒者移动图片
            num--;
            clicle--;
            //6.3小圆圈按钮的样式也要同步
            if (clicle < 0) {
                clicle = ol.children.length - 1
            }
            move(ul, -num * focusWith, function () {
                flag = true;
            });//动画效果
            for (var i = 0; i < ol.children.length; i++) {//点击样式
                ol.children[i].className = ''
            }
            ol.children[clicle].className = 'current'

        }
    });

    // 第七步：自动播放功能
    // 7.1页面一打开就开启定时器，设置为每2秒就点击一次定时器，实现自动播放功能
    var timer = setInterval(function () {
        arrow_r.click()
    }, 2000)

    //第八步：优化 节流阀 限制高频率的点击，防止动画过快，所以用节流阀限制点击频率，等上一个动画结束后，再执行下一个动画

    //第九步：图片回弹效果

});
