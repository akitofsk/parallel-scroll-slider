# parallel-scroll-slider
This package is provided a slider scrolled parallel direction when browser is scrolled vertically.

## Install

```
npm i parallel-scroll-slider
```

## How to use

``` typescript
import ParallelScrollSlider from "parallel-scroll-slider"

const Sample = () => {
  return (
  <ParallelScrollSlider
    fromTop={0}
    slideGap={40}
    slidePaddingY={20}
    slideWidth={"100%"}
    list {[]}
    stopPos={"start"}
   />
  )
}
```

## Instance Props

| Property                | Type              | Description                                                 |
|-------------------------|---------------    |-------------------------------------------------------------|
| `fromTop`               | `number / string` | Slider's position from top                                      |
| `slideGap`              | `number / string` | Gap each lists                                         |
| `slidePaddingY`         | `number / string / {top: number / string, bottom: number / string}` | `0`: stopped, `1`: scrolling up, `-1`: Padding of top and bottom |
| `slideWidth`            | `string`          | Each lists' width                                             |
| `list`                  | `JSX.Element[]`          | Slider's contents                                            |
| `stopPos`               | `start / center / end`          | Stopped position                                         |

## Props' Description

`fromTop`: Decided the position of component from top. `fromTop=0` equals `top: 0`, and `fromTop="10%"` equals `top: "10%"`.

`slideGap`: Decided the gap of each slide contents. `slideGap=0` equals `column-gap: 0`, and `slideGap="10%"` equals `column-gap: "10%"`.

`slidePaddingY`: Decided the padding of top and bottom. if you want one's size is different from the other, you can write like `slideWidth={{top:10, bottom:20}}`.

`list`: The contents of slide. You can use only JSX.Element.

`stopPos`: Decided the position when the slide is stopped. "start" : left edge of component. "center" : center position. "end" : right edge of component. 
