'use strict';

function getDistance(p1, p2) {
   return Math.sqrt((p1.x-p2.x) ** 2 + (p1.y-p2.y) ** 2);
}

function getSlope(p1, p2) {
   return (p1.y - p2.y) / (p1.x - p2.x);
}

function getAngle(p1, p2) {
   let angle = Math.atan(getSlope(p1, p2)) + (p1.x >= p2.x ? Math.PI : 0);
   if (angle < 0) angle += 2 * Math.PI;
   return angle;
}

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

   const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
 
   // parallel
   if (denominator === 0) {
      return false;
   }
 
   let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
   let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
 
   if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
   }
 
   let x = x1 + ua * (x2 - x1);
   let y = y1 + ua * (y2 - y1);
 
   return {x, y};
 }

const relations = new Set();

class Relation {
   update() {
      let p1 = this.e1.getCenter();
      let p2 = this.e2.getCenter();
      let length = getDistance(p1, p2);

      // separating into 2 relation lines

      const angle = getAngle(p1, p2);

      if (angle < Math.PI / 2) {
         const pct1 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x + this.e1.w/2, p1.y - this.e1.h/2, p1.x + this.e1.w/2, p1.y + this.e1.h/2);
         const pct2 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x - this.e1.w/2, p1.y + this.e1.h/2, p1.x + this.e1.w/2, p1.y + this.e1.h/2);
         if (pct1.y <= p1.y + this.e1.h/2) {
            p1 = pct1;
         } else {
            p1 = pct2;
         }

         const pct3 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x - this.e2.w/2, p2.y - this.e2.h/2, p2.x + this.e2.w/2, p2.y - this.e2.h/2);
         const pct4 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x - this.e2.w/2, p2.y - this.e2.h/2, p2.x - this.e2.w/2, p2.y + this.e2.h/2);
         if (pct3.x >= p2.x - this.e2.w/2) {
            p2 = pct3;
         } else {
            p2 = pct4;
         }
      } else if (angle < Math.PI) {
         const pct1 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x - this.e1.w/2, p1.y - this.e1.h/2, p1.x - this.e1.w/2, p1.y + this.e1.h/2);
         const pct2 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x - this.e1.w/2, p1.y + this.e1.h/2, p1.x + this.e1.w/2, p1.y + this.e1.h/2);
         if (pct1.y <= p1.y + this.e1.h/2) {
            p1 = pct1;
         } else {
            p1 = pct2;
         }

         const pct3 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x + this.e2.w/2, p2.y - this.e2.h/2, p2.x + this.e2.w/2, p2.y + this.e2.h/2);
         const pct4 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x - this.e2.w/2, p2.y - this.e2.h/2, p2.x + this.e2.w/2, p2.y - this.e2.h/2);
         if (pct3.y >= p2.y - this.e2.h/2) {
            p2 = pct3;
         } else {
            p2 = pct4;
         }
      } else if (angle < 3 * Math.PI / 2) {
         const pct1 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x - this.e1.w/2, p1.y - this.e1.h/2, p1.x + this.e1.w/2, p1.y - this.e1.h/2);
         const pct2 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x - this.e1.w/2, p1.y - this.e1.h/2, p1.x - this.e1.w/2, p1.y + this.e1.h/2);
         if (pct1.x >= p1.x - this.e1.w/2) {
            p1 = pct1;
         } else {
            p1 = pct2;
         }

         const pct3 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x + this.e2.w/2, p2.y - this.e2.h/2, p2.x + this.e2.w/2, p2.y + this.e2.h/2);
         const pct4 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x - this.e2.w/2, p2.y + this.e2.h/2, p2.x + this.e2.w/2, p2.y + this.e2.h/2);
         if (pct3.y <= p2.y + this.e2.h/2) {
            p2 = pct3;
         } else {
            p2 = pct4;
         }
      } else {
         const pct1 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x - this.e1.w/2, p1.y - this.e1.h/2, p1.x + this.e1.w/2, p1.y - this.e1.h/2);
         const pct2 = intersect(p1.x, p1.y, p2.x, p2.y, p1.x + this.e1.w/2, p1.y - this.e1.h/2, p1.x + this.e1.w/2, p1.y + this.e1.h/2);
         if (pct1.x <= p1.x + this.e1.w/2) {
            p1 = pct1;
         } else {
            p1 = pct2;
         }

         const pct3 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x - this.e2.w/2, p2.y - this.e2.h/2, p2.x - this.e2.w/2, p2.y + this.e2.h/2);
         const pct4 = intersect(p1.x, p1.y, p2.x, p2.y, p2.x - this.e2.w/2, p2.y + this.e2.h/2, p2.x + this.e2.w/2, p2.y + this.e2.h/2);
         if (pct3.y <= p2.y + this.e2.h/2) {
            p2 = pct3;
         } else {
            p2 = pct4;
         }
      }
      
      length = getDistance(p1, p2);

      this.elem.part1.style.width = `${length / 2}px`;
      this.elem.part1.style.left = `${p1.x}px`;
      this.elem.part1.style.top = `${p1.y}px`;
      this.elem.part1.style.transform = `rotate(${getAngle(p1, p2)}rad)`;

      this.elem.part2.style.width = `${length / 2}px`;
      this.elem.part2.style.left = `${p2.x}px`;
      this.elem.part2.style.top = `${p2.y}px`;
      this.elem.part2.style.transform = `rotate(${getAngle(p1, p2) + Math.PI}rad)`;

      const many_offset = 52;
      const many_size = '90px';
      const a = many_offset * (p2.y - p1.y) / length;
      const b = many_offset * (p2.x - p1.x) / length;
      
      if (this.options1.cardinality == 'many') {
         for (let i = 0; i < 2; ++i) {
            this.elem.many1[i].style.width = many_size;
            this.elem.many1[i].style.left = `${p1.x + b}px`;
            this.elem.many1[i].style.top = `${p1.y + a}px`;
         }
         this.elem.many1[0].style.transform = `rotate(${getAngle(p1, p2) + Math.PI - 0.3}rad)`;
         this.elem.many1[1].style.transform = `rotate(${getAngle(p1, p2) + Math.PI + 0.3}rad)`;
      }

      if (this.options2.cardinality == 'many') {
         for (let i = 0; i < 2; ++i) {
            this.elem.many2[i].style.width = many_size;
            this.elem.many2[i].style.left = `${p2.x - b}px`;
            this.elem.many2[i].style.top = `${p2.y - a}px`;
         }
         this.elem.many2[0].style.transform = `rotate(${getAngle(p1, p2) - 0.3}rad)`;
         this.elem.many2[1].style.transform = `rotate(${getAngle(p1, p2) + 0.3}rad)`;
      }
   }

   getCenter() {
      const p1 = this.e1.getCenter();
      const p2 = this.e2.getCenter();
      return {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
   }

   constructor(name1, options1, name2, options2) {
      this.e1 = entities.get(name1);
      this.options1 = options1;
      this.e2 = entities.get(name2);
      this.options2 = options2;

      if (!this.e1 || !this.e2) {
         console.error(`Relation ${name1} - ${name2} cannot exist.`);
      }

      relations.add(this);
      this.elem = document.createElement('div');
      this.elem.classList.add('relation');

      this.elem.part1 = document.createElement('div');
      this.elem.part1.classList.add('relation-line');
      this.elem.part1.style.transformOrigin = 'left';
      this.elem.part1.style.borderStyle = `${options1?.optional ? 'dotted' : 'solid'} none none none`;
      this.elem.appendChild(this.elem.part1);

      this.elem.part2 = document.createElement('div');
      this.elem.part2.classList.add('relation-line');
      this.elem.part2.style.transformOrigin = 'left';
      this.elem.part2.style.borderStyle = `${options2?.optional ? 'dotted' : 'solid'} none none none`;
      this.elem.appendChild(this.elem.part2);

      if (options1.cardinality == 'many') {
         this.elem.many1 = [null, null];
         for (let i = 0; i < 2; ++i) {
            this.elem.many1[i] = document.createElement('div');
            this.elem.many1[i].classList.add('relation-line');
            this.elem.many1[i].style.transformOrigin = 'left';
            this.elem.many1[i].style.borderStyle = 'solid none none none';
            this.elem.appendChild(this.elem.many1[i]);
         }
      }

      if (options2.cardinality == 'many') {
         this.elem.many2 = [null, null];
         for (let i = 0; i < 2; ++i) {
            this.elem.many2[i] = document.createElement('div');
            this.elem.many2[i].classList.add('relation-line');
            this.elem.many2[i].style.transformOrigin = 'left';
            this.elem.many2[i].style.borderStyle = 'solid none none none';
            this.elem.appendChild(this.elem.many2[i]);
         }
      }


      this.update();
      document.body.appendChild(this.elem);
   }
};