import React from 'react';
import { useRef, useEffect, CSSProperties } from 'react';

interface SlideProps {
  fromTop?: number | string;
  slideGap: number;
  slidePaddingY?:
    | number
    | string
    | {
        top: number | string;
        bottom: number | string;
      };
  slideWidth: string;
  list: JSX.Element[];
  stopPos?: 'start' | 'center' | 'end';
  fullWidth?: boolean;
}

interface Slide {
  (props: SlideProps): JSX.Element;
}

const ParallelScrollSlider: Slide = function ({
  fromTop = 0,
  slideGap,
  slidePaddingY = 0,
  slideWidth,
  list,
  stopPos = 'start',
  fullWidth = true,
}) {
  const slideRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const slideStyle: CSSProperties = {
    height: '100%',
    listStyle: 'none',
    position: 'absolute',
    top: '0',
    bottom: '0',
    margin: '0',
    display: 'flex',
    columnGap: `${slideGap}px`,
    paddingLeft: '0',
    boxSizing: 'border-box',
    paddingTop: `${
      typeof slidePaddingY === 'object'
        ? defineNumber(slidePaddingY.top) + 'px'
        : defineNumber(slidePaddingY) + 'px'
    }`,
    paddingBottom: `${
      typeof slidePaddingY === 'object'
        ? defineNumber(slidePaddingY.bottom) + 'px'
        : defineNumber(slidePaddingY) + 'px'
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
        fullWidth && (document.body.style.overflowX = 'clip');
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
          switch (stopPos) {
            case 'start':
              return defaultPos;
            case 'center':
              return (
                defaultPos -
                ((1 - defineNumber(slideWidth)) * scrollSection.clientWidth) / 2
              );
            case 'end':
              return (
                defaultPos -
                (1 - defineNumber(slideWidth)) * scrollSection.clientWidth
              );
          }
        };
        scrollSection.style.height = slide.clientHeight + slideStop() + top + 'px';
        const position =
          scrollSection.getBoundingClientRect().top + window.scrollY ;

        if (scrollSection.getBoundingClientRect().top <= 0) {
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
      slidePosition(fromTop, slideGap, slideWidth, stopPos);

    callFunc();

    window.addEventListener('scroll', () => {
      callFunc();
    });

    window.addEventListener('resize', () => {
      callFunc();
    });
  });

  return (
    <div
      ref={parentRef}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        paddingTop: `${defineNumber(fromTop)}px`,
        overflowX: `${!fullWidth ? 'clip' : 'unset'}`,
      }}
    >
      <div
        style={{
          width: '100%',
          position: 'sticky',
          top: `${defineNumber(fromTop)}px`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <ul ref={slideRef} style={slideStyle}>
            {list}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParallelScrollSlider;
