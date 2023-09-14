import React from 'react';
import { useRef, useEffect, CSSProperties } from 'react';

interface SlideProps {
  fromTop: number | string;
  slideGap: number;
  slidePaddingY:
    | number
    | string
    | {
        top: number | string;
        bottom: number | string;
      };
  slideWidth: string;
  list: JSX.Element[];
  stopPos: 'start' | 'center' | 'end';
}

interface Slide {
  (props: SlideProps): JSX.Element;
}

const ParallelScrollSlider: Slide = function (props) {
  const slideRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const slideStyle:CSSProperties = {
    height: '100%',
    position: 'absolute',
    display: 'flex',
    columnGap: `${props.slideGap}px`,
    paddingTop: `${
      typeof props.slidePaddingY === 'object'
        ? defineNumber(props.slidePaddingY.top) + 'px'
        : defineNumber(props.slidePaddingY) + 'px'
    }`,
    paddingBottom: `${
      typeof props.slidePaddingY === 'object'
        ? defineNumber(props.slidePaddingY.bottom) + 'px'
        : defineNumber(props.slidePaddingY) + 'px'
    }`,
  };

  function defineNumber(n: number | string) {
    return typeof n === 'number' ? n : Number(n.replace(/[\D^\.]/g, '')) / 100;
  }

  useEffect(() => {
    const scrollSection = parentRef.current;
    const slide = slideRef.current;
    const slideWrap = scrollSection?.querySelector('div');
    const slideItem = slide?.querySelectorAll('li');

    function slidePosition(
      fromTop: number | string,
      slideGap: number,
      slideWidth: string,
      stopPos: 'start' | 'center' | 'end'
    ) {
      if (slide && scrollSection && slideWrap && slideItem) {
        const top =
          typeof fromTop === 'number'
            ? fromTop
            : window.innerHeight * defineNumber(fromTop);

        slideWrap.style.height = window.innerHeight - top + 'px';

        slideItem.forEach(
          (element) =>
            (element.style.width =
              scrollSection.clientWidth * defineNumber(slideWidth) + 'px')
        );

        const slideStop = () => {
          const listAmount = slideItem.length;
          const defaultPos =
            ((slide.clientWidth - slideGap * (listAmount - 1)) *
              (listAmount - 1)) /
              listAmount +
            slideGap * (listAmount - 1);
            console.log([listAmount, defaultPos])
          switch (stopPos) {
            case 'start':
              return defaultPos;
            case 'center':
              return (
                defaultPos -
                (1 - defineNumber(slideWidth)) * scrollSection.clientWidth / 2
              );
            case 'end':
              return (
                defaultPos -
                (1 - defineNumber(slideWidth)) * scrollSection.clientWidth
              );
          }
        };
        console.log([slide.clientHeight, slideStop()])
        scrollSection.style.height = slide.clientHeight + slideStop() + 'px';

        const position =
          scrollSection.getBoundingClientRect().top + window.scrollY - top;

        if (scrollSection.getBoundingClientRect().top <= top) {
          if (
            window.innerHeight < scrollSection.getBoundingClientRect().bottom
          ) {
            slide.style.transform = `translateX(-${
              window.scrollY - position
            }px)`;
          } else {
            slide.style.transform = `translateX(-${slideStop()}px)`;
          }
        } else {
          slide.style.transform = 'translateX(0px)';
        }
      }
    }

    const callFunc = () =>
      slidePosition(
        props.fromTop,
        props.slideGap,
        props.slideWidth,
        props.stopPos
      );

    callFunc();

    window.addEventListener('scroll', () => {
      callFunc();
    });

    window.addEventListener('resize', () => {
      callFunc();
    });
  });

  return (
    <div ref={parentRef} style={{ position: 'relative',  }}>
      <div
        style={{
          width: '100%',
          position: 'sticky',
          top: `${defineNumber(props.fromTop)}px`,
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <ul
            ref={slideRef}
            style={slideStyle}
          >
            {props.list}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParallelScrollSlider;
