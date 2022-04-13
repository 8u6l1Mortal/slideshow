window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus')
    var nav = this.document.querySelector('div')
    var back = this.document.querySelector('.goBack')
    var navt = nav.offsetTop
    var ul = focus.children[0]
    var ol = focus.children[1]
    var w = focus.offsetWidth;
    var index = 0;
    var startx = 0;
    var movex = 0;
    var flag = false;

    var timer = this.setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all 0.3s'
        ul.style.transform = 'translateX(' + translatex + 'px)'
    }, 2000);
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0
            var translatex = -index * w;
            ul.style.transition = 'none'
            ul.style.transform = 'translateX(' + translatex + 'px)'
        } else if (index < 0) {
            index = 2
            var translatex = -index * w;
            ul.style.transition = 'none'
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }
        ol.querySelector('.current').classList.remove('current')
        ol.children[index].classList.add('current')
    })
    ul.addEventListener('touchstart', function (e) {
        startx = e.targetTouches[0].pageX;
        clearInterval(timer)
    })
    ul.addEventListener('touchmove', function (e) {
        movex = e.targetTouches[0].pageX - startx;
        var translatex = -index * w + movex;
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translatex + 'px)'
        flag = true;
    })
    ul.addEventListener('touchend', function () {
        if (flag) {
            if (movex > 50) {
                index--;
            } else if (movex < -50) {
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all 0.3s'
            ul.style.transform = 'translateX(' + translatex + 'px)'
            flag = false;
        }
        clearInterval(timer)
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all 0.3s'
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }, 2000);
    })

    window.addEventListener('scroll', function () {
        if (window.pageXOffset >= navt) {
            back.style.display = 'block';
        } else {
            back.style.display = 'none';
        }
    })
    back.addEventListener('click', function () {
        window.scroll(0, 0)
    })
})