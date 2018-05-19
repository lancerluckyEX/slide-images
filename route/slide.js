var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return element
    }
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return elements
    }
}
var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var find = function(element, selector) {
    var e = element.querySelector(selector)
    if (e == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return e
    }
}

var closestClass = function(element, className) {
    var e = element
    while (e != null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closestId = function(element, idName) {
    var e = element
    while (e != null) {
        if (e.id == idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closestTag = function(element, tagName) {
    var e = element
    while (e != null) {
        if (e.tagName.toUpperCase() == tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closest = function(element, selector) {
    var c = selector[0]
    if (c == '.') {
        var className = selector.slice(1)
        return closestClass(element, className)
    } else if (c == '#') {
        var idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        var tag = selector
        return closestTag(element, tag)
    }
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.comic-slide-button'
    bindAll(selector, 'click', function(event) {
        var button = event.target
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    slide.dataset.active = nextIndex

    var className = 'comic-active'
    removeClassAll(className)

    var nextSelector = '#id-comicimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    removeClassAll('comic-white')
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('comic-white')
}

var bindEventIndicator = function() {
    log('start')
    var selector = '.comic-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        var self = event.target
        var index = Number(self.dataset.index)
        var slide = self.closest('.comic-slide')
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.comic-slide')
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 5000
    setInterval(function() {
        playNextImage()
    }, interval)
}

var nextindiIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

var bindEventindiSlide = function() {
    //点击小圆点，显示相应图片的函数，有移入移出就可以了
    var selector = '.comic-slide-indi'
    bindAll(selector, 'click', function(event) {
        var indi = event.target
        var slide = indi.parentElement
        var index = Number(indi.dataset.index)
        showImageAtIndex(slide, index)
    })
}

var bindEvents = () => {
    bindEventSlide()
    bindEventIndicator()
    //bindEventindiSlide()
}

var _main = () => {
    bindEvents()
    autoPlay()

}

_main ()
