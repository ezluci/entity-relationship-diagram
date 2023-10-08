'use strict';

function getDistance(p1, p2) {
   return Math.sqrt((p1.x-p2.x) ** 2 + (p1.y-p2.y) ** 2);
}

function getSlope(p1, p2) {
   return (p1.y - p2.y) / (p1.x - p2.x);
}

function getAngle(p1, p2) {
   return Math.atan(getSlope(p1, p2)) + (p1.x >= p2.x ? Math.PI : 0);
}

const relations = new Set();

class Relation {
   update() {
      const p1 = this.e1.getCenter();
      const p2 = this.e2.getCenter();
      this.elem.style.width = `${getDistance(p1, p2)}px`;
      this.elem.style.left = `${p1.x}px`;
      this.elem.style.top = `${p1.y}px`;
      this.elem.style.transform = `rotate(${getAngle(p1, p2)}rad)`;
   }

   constructor(name1, name2) {
      this.e1 = entities.get(name1);
      this.e2 = entities.get(name2);

      if (!this.e1 || !this.e2) {
         console.error(`Relation ${name1} - ${name2} cannot exist.`);
      }


      relations.add(this);
      this.elem = document.createElement('div');
      this.elem.classList.add('relation');

      this.update();
      document.body.appendChild(this.elem);
   }
};