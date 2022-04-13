window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus')
    var ul = focus.children[0]
    var ol = focus.children[1]
    var startx = 0;
    var movex = 0;
    var index = 0;
    var flag = false;
    var focusw = focus.offsetWidth;
    function translateX(num) {
        var translatex = -index * focusw;
        ul.style.transition = num
        ul.style.transform = 'translateX(' + translatex + 'px)'
    }

    var timer = this.setInterval(function () {
        index++;
        translateX('all 0.3s')
    }, 2000)

    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0
            translateX('none')
        } else if (index < 0) {
            index = 2
            translateX('none')
        }
        ol.querySelector('.current').classList.remove('current')
        ol.children[index].classList.add('current')
    })

    ul.addEventListener('touchstart', function (e) {
        startx = e.targetTouches[0].pageX
        clearInterval(timer)
    })
    ul.addEventListener('touchmove', function (e) {
        movex = e.targetTouches[0].pageX - startx;
        var translatex = -index * focusw + movex
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true
    })
    ul.addEventListener('touchend', function () {
        if (flag) {
            if (movex > 50) {
                index--;
            } else if (movex < -50) {
                index++;
            }
            translateX('all 0.3s')
            flag = false;
        }
        clearInterval(timer)
        timer = setInterval(function () {
            index++;
            translateX('all 0.3s')
        }, 2000)
    })
})