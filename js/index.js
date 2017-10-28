


/*/// Go To testimonials Button ///*/

function scrollIt(destination, duration = 200, easing = 'linear', callback) {

    const easings = {
        linear(t) {
            return t;
        },
        easeInQuad(t) {
            return t * t;
        },
        easeOutQuad(t) {
            return t * (2 - t);
        },
        easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
            return t * t * t;
        },
        easeOutCubic(t) {
            return (--t) * t * t + 1;
        },
        easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
            return t * t * t * t;
        },
        easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        },
        easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        },
        easeInQuint(t) {
            return t * t * t * t * t;
        },
        easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
        },
        easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        }
    };

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }

    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easings[easing](time);
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }
        requestAnimationFrame(scroll);
    }
    scroll();
}

document.querySelector('#buttonToTestimonials').addEventListener('click', () => {
    scrollIt(
        document.querySelector('.testimonials-buttons'),
        2000,
        'easeOutQuad',
        () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
});

/*/// Carousel (Attempts) ///*/

/*
var index = 0;
testimonialsCarousel();

function testimonialsCarousel() {
    var i;
    var testimonials = document.getElementsByClassName("t");
    for (i = 0; i < testimonials.length; i++) {
       testimonials[i].style.display = "none";
    }
    index++;
    if (index > testimonials.length) {
        index = 1;
    }
    testimonials[index-1].style.display = "block";
    setTimeout(testimonialsCarousel, 2000);
}
*/

var Carousel = {
  width: 600,     // Images are forced into a width of this many pixels.
  numVisible: 3,  // The number of images visible at once.
  duration: 600,  // Animation duration in milliseconds.
  padding: 4      // Vertical padding around each image, in pixels.
};

function rotateForward() {
  var carousel = Carousel.carousel,
      children = carousel.children,
      firstChild = children[0],
      lastChild = children[children.length - 1];
  carousel.insertBefore(lastChild, firstChild);
}
function rotateBackward() {
  var carousel = Carousel.carousel,
      children = carousel.children,
      firstChild = children[0],
      lastChild = children[children.length - 1];
  carousel.insertBefore(firstChild, lastChild.nextSibling);
}

function animate(begin, end, finalTask) {
  var wrapper = Carousel.wrapper,
      carousel = Carousel.carousel,
      change = end - begin,
      duration = Carousel.duration,
      startTime = Date.now();
  carousel.style.top = begin + 'px';
  var animateInterval = window.setInterval(function () {
    var t = Date.now() - startTime;
    if (t >= duration) {
      window.clearInterval(animateInterval);
      finalTask();
      return;
    }
    t /= (duration / 2);
    var top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                               change / 2 * (Math.pow(t - 2, 3) + 2));
    carousel.style.top = top + 'px';
  }, 1000 / 60);
}

window.addEventListener('load', function() {
  //document.getElementById('spinner').style.display = 'none';
  var carousel = Carousel.carousel = document.getElementById('carousel'),
      images = carousel.querySelectorAll('div'),
      numImages = images.length,
      imageWidth = Carousel.width,
      aspectRatio = images[0].width / images[0].height,
      imageHeight = imageWidth / aspectRatio,
      padding = Carousel.padding,
      rowHeight = Carousel.rowHeight = imageHeight + 2 * padding;
  carousel.style.width = imageWidth + 'px';
  for (var i = 0; i < numImages; ++i) {
    var image = images[i],
        frame = document.createElement('div');
    frame.className = 'pictureFrame';
    var aspectRatio = image.offsetWidth / image.offsetHeight;
    image.style.width = frame.style.width = imageWidth + 'px';
    image.style.height = imageHeight + 'px';
    image.style.paddingTop = padding + 'px';
    image.style.paddingBottom = padding + 'px';
    frame.style.height = rowHeight + 'px';
    carousel.insertBefore(frame, image);
    frame.appendChild(image);
  }
  Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
  carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px';
  carousel.style.visibility = 'visible';
  var wrapper = Carousel.wrapper = document.createElement('div');
  wrapper.id = 'carouselWrapper';
  wrapper.style.width = carousel.offsetWidth + 'px';
  wrapper.style.height = carousel.offsetHeight + 'px';
  carousel.parentNode.insertBefore(wrapper, carousel);
  wrapper.appendChild(carousel);
  var prevButton = document.getElementById('prev'),
      nextButton = document.getElementById('next');
  prevButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true;
    rotateForward();
    animate(-Carousel.rowHeight, 0, function () {
      carousel.style.top = '0';
      prevButton.disabled = nextButton.disabled = false;
    });
  };
  nextButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true;
    animate(0, -Carousel.rowHeight, function () {
      rotateBackward();
      carousel.style.top = '0';
      prevButton.disabled = nextButton.disabled = false;
    });
  };
});

/*
var Carousel = {
  width: 600,     // Images are forced into a width of this many pixels.
  numVisible: 3,  // The number of images visible at once.
  duration: 600,  // Animation duration in milliseconds.
  padding: 2      // Vertical padding around each image, in pixels.
};

function rotateForward() {
  var carousel = Carousel.carousel,
      children = carousel.children,
      firstChild = children[0],
      lastChild = children[children.length - 1];
  carousel.insertBefore(lastChild, firstChild);
}
function rotateBackward() {
  var carousel = Carousel.carousel,
      children = carousel.children,
      firstChild = children[0],
      lastChild = children[children.length - 1];
  carousel.insertBefore(firstChild, lastChild.nextSibling);
}

function animate(begin, end, finalTask) {
  var wrapper = Carousel.wrapper,
      carousel = Carousel.carousel,
      change = end - begin,
      duration = Carousel.duration,
      startTime = Date.now();
  carousel.style.top = begin + 'px';
  var animateInterval = window.setInterval(function () {
    var t = Date.now() - startTime;
    if (t >= duration) {
      window.clearInterval(animateInterval);
      finalTask();
      return;
    }
    t /= (duration / 2);
    var top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                               change / 2 * (Math.pow(t - 2, 3) + 2));
    carousel.style.top = top + 'px';
  }, 1000 / 60);
}

window.onload = function () {
  //document.getElementById('spinner').style.display = 'none';
  var carousel = Carousel.carousel = document.getElementById('carousel'),
      images = carousel.querySelectorAll('div'),
      numImages = images.length,
      imageWidth = Carousel.width,
      aspectRatio = images[0].width / images[0].height,
      imageHeight = imageWidth / aspectRatio,
      padding = Carousel.padding,
      rowHeight = Carousel.rowHeight = imageHeight + 2 * padding;
  carousel.style.width = imageWidth + 'px';
  for (var i = 0; i < numImages; ++i) {
    var image = images[i],
        frame = document.createElement('div');
    frame.style.backgroundColor = "blue";
    frame.className = 'pictureFrame';
    var aspectRatio = image.offsetWidth / image.offsetHeight;
    image.style.width = frame.style.width = imageWidth + 'px';
    image.style.height = imageHeight + 'px';
    image.style.paddingTop = padding + 'px';
    image.style.paddingBottom = padding + 'px';
    frame.style.height = rowHeight + 'px';
    carousel.insertBefore(frame, image);
    frame.appendChild(image);
  }
  Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
  carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px';
  carousel.style.visibility = 'visible';
  var wrapper = Carousel.wrapper = document.createElement('div');
  wrapper.id = 'carouselWrapper';
  wrapper.style.width = carousel.offsetWidth + 'px';
  wrapper.style.height = carousel.offsetHeight + 'px';
  carousel.parentNode.insertBefore(wrapper, carousel);
  wrapper.appendChild(carousel);
  var prevButton = document.getElementById('prev'),
      nextButton = document.getElementById('next');
  prevButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true;
    rotateForward();
    animate(-Carousel.rowHeight, 0, function () {
      carousel.style.top = '0';
      prevButton.disabled = nextButton.disabled = false;
    });
  };
  nextButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true;
    animate(0, -Carousel.rowHeight, function () {
      rotateBackward();
      carousel.style.top = '0';
      prevButton.disabled = nextButton.disabled = false;
    });
  };
};

/* testimonials (Vertical) Carousel *
var vCarousel = {
    width: 500, numVisible: 3,
    duration: 400, padding: 2
};

function rotateForward() {
    var carousel = vCarousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(lastChild, firstChild);
}
function rotateBackward() {
    var carousel = vCarousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(firstChild, lastChild.nextSibling);
}

function vCarouselAnimate(begin, end, finalTask) {
    var wrapper = vCarousel.wrapper,
        carousel = vCarousel.carousel,
        change = end - begin,
        duration = vCarousel.duration,
        startTime = Date.now();
    carousel.style.top = begin + 'px';

    var animateInterval = window.setInterval(function() {
        var t = Date.now() - startTime;
        if (t >= duration) {
            window.clearInterval(animateInterval);
            finalTask();
            return;
        }
        t /= (duration / 2);
        var top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) : change / 2 * (Math.pow(t - 2, 3) + 2 ));

        carousel.style.top = top + 'px';
    }, 1000 / 60);
}

function queryAll(el) {
    return document.querySelectorAll(el);
}

window.onload = function() { // should become: window.addEventListener('load', function() {
    //var carousel = vCarousel.carousel = document.getElementById('carousel'); // queryAll('#tCarousel');
    //var items = carousel.querySelectorAll('div'); // carousel.getElementsByTagName('div');  // queryAll('.t'); // item = quote
    // var items = carousel.getElementsByTagName('div');  // queryAll('.t'); // item = quote

    var carousel = vCarousel.carousel = document.getElementById('carousel');
    var items = carousel.querySelectorAll('div');

    var numItems = items.length,
        itemWidth = vCarousel.width,
        aspectRatio = items[0].width / items[0].height,
        //aspectRatio = 200 / items[0].height,
        //itemHeight = 200 / aspectRatio,
        aspectRatio = items[0].width / items[0].height,
        itemHeight = itemWidth / aspectRatio,
        padding = vCarousel.padding,
        rowHeight = vCarousel.rowHeight = itemHeight + 2 * padding;

    carousel.style.width = itemWidth + 'px';
    for (var i = 0; i < numItems; i++) {
        // var item = items[i];
        // var frame = document.createElement('div');
        // var items = carousel.querySelectorAll('div');
        var item = items[i],
            frame = document.createElement('div');

        frame.className = 'pictureFrame'; // string's content wil possibly be changed
        var aspectRatio = item.offsetWidth / item.offsetHeight;
        item.style.width = frame.style.width = itemWidth + 'px';
        item.style.height = itemHeight + 'px';
        item.style.paddingBottom = padding + 'px';
        carousel.insertBefore(frame, item);
        frame.appendChild(item);
    }

    vCarousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
    carousel.style.height = vCarousel.numVisible * vCarousel.rowHeight + 'px';
    carousel.style.visibility = 'visible';
    var wrapper = vCarousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    var prevButton = document.getElementById('prev');
    var nextButton = document.getElementById('next');
    prevButton.onClick = function() {
        prevButton.disabled = nextButton.disabled = true;
        rotateForward();
        vCarouselAnimate(-vCarousel.rowHeight, 0, function() {
            carousel.style.top = '0';
            prevButton.disabled = nextButton.disabled = false;
        });
    };
    nextButton.onClick = function() {
        prevButton.disabled = nextButton.disabled = true;
        vCarouselAnimate(0, -vCarousel.rowHeight, function() {
            rotateBackward();
            carousel.style.top = '0';
            prevButton.disabled = nextButton.disabled = false;
        });
    };
};

/*
window.onload = function() { // should become: window.addEventListener('load', function() {
    var carousel = vCarousel.carousel = document.getElementById('carousel'); // queryAll('#tCarousel');
    var items = carousel.querySelectorAll('div'); // carousel.getElementsByTagName('div');  // queryAll('.t'); // item = quote
    var numItems = items.length,
        itemWidth = vCarousel.width,
        aspectRatio = items[0].width / items[0].height,
        itemHeight = itemWidth / aspectRatio,
        padding = vCarousel.padding,
        rowHeight = vCarousel.rowHeight = itemHeight + 2 * padding;

    carousel.style.width = itemWidth + 'px';
    for (var i = 0; i < numItems; i++) {
        var item = items[i];
        var frame = document.createElement('div');
        // var frame = carousel.querySelectorAll('div') ;
        frame.className = 'pictureFrame'; // string's content wil possibly be changed
        var aspectRatio = item.offsetWidth / item.offsetHeight;
        item.style.width = frame.style.width = itemWidth + 'px';
        item.style.height = itemHeight + 'px';
        item.style.paddingBottom = padding + 'px';
        carousel.insertBefore(frame, item);
        frame.appendChild(item);
    }
    vCarousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
    carousel.style.height = vCarousel.numVisible * vCarousel.rowHeight + 'px';
    carousel.style.visibility = 'visible';
    var wrapper = vCarousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    var prevButton = document.getElementById('prev');
    var nextButton = document.getElementById('next');
    prevButton.onClick = function() {
        prevButton.disabled = nextButton.disabled = true;
        rotateForward();
        vCarouselAnimate(-vCarousel.rowHeight, 0, function() {
            carousel.style.top = '0';
            prevButton.disabled = nextButton.disabled = false;
        });
    };
    nextButton.onClick = function() {
        prevButton.disabled = nextButton.disabled = true;
        vCarouselAnimate(0, -vCarousel.rowHeight, function() {
            rotateBackward();
            carousel.style.top = '0';
            prevButton.disabled = nextButton.disabled = false;
        });
    };
};
*/
