/// <reference types="react" />
interface SlideProps {
    fromTop: number | string;
    slideGap: number;
    slidePaddingY: number | string | {
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
declare const ParallelScrollSlider: Slide;
export default ParallelScrollSlider;
