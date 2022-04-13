function move(element, target, callback) {
    clearInterval(element.timer)
    element.timer = setInterval(function () {
        var step = (target - element.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (element.offsetLeft == target) {
            clearInterval(element.timer);
            if (callback) {
                callback();
            }
            return;
        }
        element.style.left = element.offsetLeft + step + 'px';
    }, 15);
}