import React from 'react';

type Props = {
  images: Array<string>;
};
function Render(image: string) {
  return (
    <div className="border-y">
      <img src={image} className="w-full h-96" />
    </div>
  );
}
function RenderTwo(images: Array<string>) {
  return (
    <div className="grid gap-x-4 overflow-x-hidden grid-cols-2">
      {images.map((image, index) => (
        <img key={index} src={image || ''} className="col-span-1" />
      ))}
    </div>
  );
}
function RenderThree(images: Array<string>) {
  const xxx = images;
  return (
    <div className="grid grid-rows-4 grid-cols-2 grid-flow-col gap-4 h-96">
      <img src={xxx[0]} className="row-span-4 h-full w-full" />
      {[xxx[1], xxx[2]].map((image, index) => (
        <img key={index} src={image || ''} className="row-span-2 col-span-1 w-full h-full" />
      ))}
    </div>
  );
}
function RenderOverlay() {}
export default function ImageGrid({ images }: Props) {
  return (
    <>
      {(() => {
        switch (images.length) {
          case 1:
            return Render(images[0]);
          case 2:
            return RenderTwo(images);
          case 3:
            return RenderThree(images);
          default:
            return <></>;
        }
      })()}
    </>
  );
}
