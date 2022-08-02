import React, { useEffect, useRef, useState } from "react";
import logoBlue from "./logoBlue.jpg";
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const loadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;
const NUM_ROWS = 200;
const NUM_COLS = 200;
const NUM_CELLS = NUM_ROWS * NUM_COLS;
let FRAME = 0;

export default function LogoCanvas() {
  const [makeMeLoop, setMakeMeLoop] = useState(1);

  const canvasRef = useRef(null);
  const typeCanvasRef = useRef(null);

  const logic = () => {
    const canvas = canvasRef.current;
    const typeCanvas = typeCanvasRef.current;
    // @ts-ignore: Object is possibly 'null'.
    const context = canvas.getContext("2d");
    // @ts-ignore: Object is possibly 'null'.
    const typeContext = typeCanvas.getContext("2d");
    //Our first draw
    loadImage(logoBlue).then((img: any) => {
      console.log(img);
      typeContext.drawImage(
        img,
        0,
        0,
        (CANVAS_WIDTH / img.width) * img.width,
        (CANVAS_HEIGHT / img.height) * img.height
      );
      context.drawImage(
        img,
        0,
        0,
        (CANVAS_WIDTH / img.width) * img.width,
        (CANVAS_HEIGHT / img.height) * img.height
      );

      typeContext.drawImage(img, 0, 0, NUM_ROWS, NUM_COLS);

      const gWidth = CANVAS_WIDTH;
      const gHeight = CANVAS_HEIGHT;
      const cellWidth = gWidth / NUM_COLS;
      const cellHeight = gHeight / NUM_ROWS;
      const marginX = (CANVAS_WIDTH - gWidth) * 0.5;
      const marginY = (CANVAS_HEIGHT - gHeight) * 0.5;

      const typeData = typeContext.getImageData(0, 0, NUM_COLS, NUM_ROWS).data;

      let len = NUM_CELLS;
      while (len--) {
        const row = len % NUM_COLS;
        const col = Math.floor(len / NUM_COLS);

        let r = typeData[len * 4];
        let g = typeData[len * 4 + 1];
        let b = typeData[len * 4 + 2];
        let a = typeData[len * 4 + 3];

        const x = cellWidth * row;
        const y = cellHeight * col;
        const w = cellWidth;
        const h = cellHeight;

        // const f = params.animate ? frame : params.frame;

        const n = random.noise3D(
          x,
          y,
          FRAME,
          100,
          0.12 //math.mapRange(0, -1, 1, valuesAverage / 5000, valuesAverage / 500)
        );

        const angle = n * Math.PI;
        const scale = math.mapRange(n, -1, 1, 50, 70);

        //   const scale = valuesAverage / 5;

        context.save();
        context.translate(x, y);
        context.translate(marginX, marginY);
        context.translate(cellWidth * 0.5, cellHeight * 0.5);
        context.rotate(angle);
        context.beginPath();
        context.lineWidth = scale;
        context.lineCap = "butt"; //"butt | round | square";

        context.strokeStyle = `rgb(${r},${g},${b})`;

        context.moveTo(w * -0.5, 0);
        context.lineTo(w * 0.5, 0);

        context.stroke();
        context.restore();
        FRAME++;
        setMakeMeLoop(Math.random());
      }
    });
  };

  useEffect(() => {
    logic();
  }, [makeMeLoop]);

  return (
    <div>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <canvas
        hidden={true}
        ref={typeCanvasRef}
        width={NUM_ROWS}
        height={NUM_COLS}
      />
    </div>
  );
}
