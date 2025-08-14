"use client";

import { useDoubleSlider } from "@/app/products/useDoubleSlider";
import * as Slider from "@radix-ui/react-slider";

const THUMB_COLOR = "bg-accent";
const RANGE_COLOR = "bg-accent";
const TRACK_COLOR = "bg-gray-200";

export default function DoubleSlider() {
  const { rangeTheme, handleSliderChange, handleInputChange } =
    useDoubleSlider();

  return (
    <div className="mx-auto">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        min={0}
        max={16000}
        step={1}
        value={rangeTheme}
        onValueChange={handleSliderChange}
      >
        <Slider.Track
          className={`bg-gray-200 relative grow rounded-full h-2 ${TRACK_COLOR}`}
        >
          <Slider.Range
            className={`absolute ${RANGE_COLOR} rounded-full h-full`}
          />
        </Slider.Track>

        <Slider.Thumb
          className={`block w-5 h-5 ${THUMB_COLOR} rounded-full shadow transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          aria-label="Minimum value"
        />
        <Slider.Thumb
          className={`block w-5 h-5 ${THUMB_COLOR} rounded-full shadow transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          aria-label="Maximum value"
        />
      </Slider.Root>

      <div className="flex justify-between mt-3 text-sm text-gray-700">
        <input
          type="number"
          value={rangeTheme[0]}
          className="w-25 py-2 px-4 rounded-md bg-gray-200 outline-none border-1 border-transparent hover:border-burgundy focus:border-burgundy"
          min={0}
          max={rangeTheme[1]}
          onChange={handleInputChange(false)}
        />

        <input
          type="number"
          value={rangeTheme[1]}
          className="w-25 py-2 px-4 rounded-md bg-gray-200 outline-none border-1 border-transparent hover:border-burgundy focus:border-burgundy"
          min={rangeTheme[0]}
          max={16000}
          onChange={handleInputChange(true)}
        />
      </div>
    </div>
  );
}
