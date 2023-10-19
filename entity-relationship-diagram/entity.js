'use strict';

const entities = new Map();

class Entity {
   update(x = this.x, y = this.y, h = this.h, w = this.w) {
      this.x = x;
      this.y = y;
      this.h = h;
      this.w = w;

      this.elem.style.left = `${this.x}px`;
      this.elem.style.top = `${this.y}px`;
      this.elem.style.height = `${this.h}px`;
      this.elem.style.width = `${this.w}px`;
   }

   hideAttributes() {
      this.hideAttr = true;
      this.h = 28;
      this.attributesElem.forEach(attElem => {
         attElem.hidden = true;
      });
      this.update();
   }

   showAttributes() {
      this.hideAttr = false;
      this.h = this.initialH;
      this.attributesElem.forEach(attElem => {
         attElem.hidden = false;
      });
      this.update();
   }

   getCenter() {
      return {x: this.x + this.w / 2, y: this.y + (this.hideAttr ? 28 : this.h) / 2};
   }

   constructor(x, y, h, w, name, attributes) {
      if (entities.has(name)) {
         console.error(`Entity ${name} appears more than two times!`);
         return;
      }
      entities.set(name, this);

      this.x = x;
      this.y = y;
      this.initialH = h;
      this.h = h;
      this.w = w;
      this.name = name;
      this.elem = document.createElement('div');
      this.elem.classList.add('entity');
      this.elem.draggable = true;
      this.elem.style.height = `${h}px`;
      this.elem.style.width = `${w}px`;
      this.elem.style.padding = '0';

      // when clicked
      this.hideAttr = true;
      this.elem.addEventListener('click', event => {
         this.hideAttr = !this.hideAttr;
         if (this.hideAttr) {
            this.hideAttributes();
         } else {
            this.showAttributes();
         }
         relations.forEach(relation => {
            relation.update();
         });
      });

      // when dragged
      this.elem.addEventListener('dragend', event => {
         if (dragEntities) {
            this.update(this.x + event.offsetX, this.y + event.offsetY);
         }
         relations.forEach(relation => {
            relation.update();
         });
      });

      // name div
      this.nameElem = document.createElement('div');
      this.nameElem.innerText = name;
      this.nameElem.classList.add('entity-name');
      this.elem.appendChild(this.nameElem);

      // attributes div
      this.attributes = attributes;
      this.attributesElem = [];
      attributes.forEach(attribute => {
         const attElem = document.createElement('div');
         attElem.classList.add('entity-attribute');
         attElem.innerText = attribute;
         attElem.hidden = true;
         this.attributesElem.push(attElem);
         this.elem.appendChild(attElem);
      });

      this.update(x, y);
      this.showAttributes();
      document.body.appendChild(this.elem);
   }
};