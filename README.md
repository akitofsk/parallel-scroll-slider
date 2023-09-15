# parallel-scroll-slider
This package provides a slider scrolled parallel direction when browser is scrolled vertically.

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

| Property                | Type              | Required| Description                                                 |
|-------------------------|---------------    |- |-------------------------------------------------------------|
| `fromTop`               | `number / string` | option | Slider's position from top                                      |
| `slideGap`              | `number / string` | required | Gap each lists                                         |
| `slidePaddingY`         | `number / string / {top: number / string, bottom: number / string}` | option | Padding of top and bottom |
| `slideWidth`            | `string`          | required | Each lists' width                                             |
| `list`                  | `JSX.Element[]`          | required | Slider's contents                                            |
| `stopPos`               | `start / center / end`          | required | Stopped position                                         |
| `fullWidth`               | `boolean`          | option | Choose the display range of slider.                                         |

## Props' Description

`fromTop`: Decided the position of component from top. `fromTop = 0` equals `top: 0`, and `fromTop = "10%"` equals `top: "10%"`. default value: `fromTop = 0`.

`slideGap`: Decided the gap of each slide contents. `slideGap = 0` equals `column-gap: 0`, and `slideGap = "10%"` equals `column-gap: "10%"`.

`slidePaddingY`: Decided the padding of top and bottom. if you want one's size is different from the other, you can write like `slidePaddingY={{top:10, bottom:20}}`. default value: `slidePaddingY = 0`.

`slideWidth`: Decided the size of each lists. the size is relatively decided component's width. you can define the percentage like `slideWidth={"50%"}`.

`list`: The contents of slide. You don't need to define `<li>` tags width and height. They are automatically decided by other argument you input.

`stopPos`: Decided the position when the slide is stopped.
"start" : left edge of component.
"center" : center position.
"end" : right edge of component. 
default value: `stopPos: "start"`.

`fullWidth`: Choose the display range of slider. `fullWidth: true` means the slider displays from left edge to right edge. `fullWidth: false` means the slider display in just component width.
default value: `fullWidth: true`.
