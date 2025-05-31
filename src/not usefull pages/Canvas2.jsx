import classes from "./Canvas2.module.css";
import React from "react";
import { useRef, useEffect } from "react";
export default function Canvass() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particleArray = [];
    let adjustX = 0;
    let adjustY = 6;
    //handle mouse
    const mouse2 = {
      x: null,
      y: null,
      radius: 250,
    };
    window.addEventListener("mousemove", function (event) {
      mouse2.x = event.x;
      mouse2.y = event.y;
    });
    ctx.fillStyle = "white";
    ctx.font = "30px Verdana";
    ctx.fillText("Aa", 0, 30); //fill text, we can fill any text we want
    const textCoordinates = ctx.getImageData(0, 0, 100, 100);
    //canvas rectangle from 0,0 to 100 width and height we taking
    class Particle2 {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 40 + 5;
      }
      draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse2.x - this.x;
        let dy = mouse2.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse2.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse2.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }
    function init2() {
      particleArray = [];
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] >
            128
          ) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle2(positionX * 25, positionY * 25));
          }
        }
      }
    }
    init2();
    console.log(particleArray);
    function animate2() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      connect();
      requestAnimationFrame(animate2);
    }
    animate2();
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let dx = particleArray[a].x - particleArray[b].x;
          let dy = particleArray[a].y - particleArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 50) {
            opacityValue = 1 - distance / 50;
            ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")";
            ctx.lineWidth = 2;
            ctx.lineWidth = 2;
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
  }, []);
  return (
    <>
      <canvas ref={canvasRef} className={classes.canvass}></canvas>
    </>
  );
}
