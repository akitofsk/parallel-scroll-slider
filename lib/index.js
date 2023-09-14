import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
var ParallelScrollSlider = function (props) {
    var slideRef = useRef(null);
    var parentRef = useRef(null);
    var slideStyle = {
        height: '100%',
        listStyle: 'none',
        position: 'absolute',
        display: 'flex',
        columnGap: "".concat(props.slideGap, "px"),
        paddingLeft: "0",
        boxSizing: "border-box",
        paddingTop: "".concat(typeof props.slidePaddingY === 'object'
            ? defineNumber(props.slidePaddingY.top) + 'px'
            : defineNumber(props.slidePaddingY) + 'px'),
        paddingBottom: "".concat(typeof props.slidePaddingY === 'object'
            ? defineNumber(props.slidePaddingY.bottom) + 'px'
            : defineNumber(props.slidePaddingY) + 'px'),
    };
    function defineNumber(n) {
        return typeof n === 'number' ? n : Number(n.replace(/[\D^\.]/g, '')) / 100;
    }
    useEffect(function () {
        var scrollSection = parentRef.current;
        var slide = slideRef.current;
        var slideWrap = scrollSection === null || scrollSection === void 0 ? void 0 : scrollSection.querySelector('div');
        var slideItem = slide === null || slide === void 0 ? void 0 : slide.querySelectorAll('li');
        function slidePosition(fromTop, slideGap, slideWidth, stopPos) {
            if (slide && scrollSection && slideWrap && slideItem) {
                var top_1 = typeof fromTop === 'number'
                    ? fromTop
                    : window.innerHeight * defineNumber(fromTop);
                slideWrap.style.height = window.innerHeight - top_1 + 'px';
                slideItem.forEach(function (element) {
                    return (element.style.width =
                        scrollSection.clientWidth * defineNumber(slideWidth) + 'px');
                });
                var slideStop = function () {
                    var listAmount = slideItem.length;
                    var defaultPos = ((slide.clientWidth - slideGap * (listAmount - 1)) *
                        (listAmount - 1)) /
                        listAmount +
                        slideGap * (listAmount - 1);
                    console.log([listAmount, defaultPos]);
                    switch (stopPos) {
                        case 'start':
                            return defaultPos;
                        case 'center':
                            return (defaultPos -
                                (1 - defineNumber(slideWidth)) * scrollSection.clientWidth / 2);
                        case 'end':
                            return (defaultPos -
                                (1 - defineNumber(slideWidth)) * scrollSection.clientWidth);
                    }
                };
                console.log([slide.clientHeight, slideStop()]);
                scrollSection.style.height = slide.clientHeight + slideStop() + 'px';
                var position = scrollSection.getBoundingClientRect().top + window.scrollY - top_1;
                if (scrollSection.getBoundingClientRect().top <= top_1) {
                    if (window.innerHeight < scrollSection.getBoundingClientRect().bottom) {
                        slide.style.transform = "translateX(-".concat(window.scrollY - position, "px)");
                    }
                    else {
                        slide.style.transform = "translateX(-".concat(slideStop(), "px)");
                    }
                }
                else {
                    slide.style.transform = 'translateX(0px)';
                }
            }
        }
        var callFunc = function () {
            return slidePosition(props.fromTop, props.slideGap, props.slideWidth, props.stopPos);
        };
        callFunc();
        window.addEventListener('scroll', function () {
            callFunc();
        });
        window.addEventListener('resize', function () {
            callFunc();
        });
    });
    return (_jsx("div", { ref: parentRef, style: { position: 'relative' }, children: _jsx("div", { style: {
                width: '100%',
                position: 'sticky',
                top: "".concat(defineNumber(props.fromTop), "px"),
            }, children: _jsx("div", { style: { width: '100%', height: '100%', position: 'relative' }, children: _jsx("ul", { ref: slideRef, style: slideStyle, children: props.list }) }) }) }));
};
export default ParallelScrollSlider;
