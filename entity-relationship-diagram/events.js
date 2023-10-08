'use strict';

let freeMove = true;
let dragEntities = false;


document.addEventListener('contextmenu', event => {
   if (!freeMove) {
      return;
   }
   event.preventDefault();
});


// zoom - im not doing that
/*document.addEventListener('wheel', event => {
   entities.forEach(entity => {
      let imp = event.deltaY / 60;
      if (imp > 0)    imp = 1 / imp;
      else imp *= -1;
      entity.update(entity.x * imp, entity.y * imp, entity.h * imp, entity.w * imp);
   });
});*/


// when right click is pressed
document.addEventListener('mousemove', event => {
   if ((event.buttons & 0b01) && (event.buttons & 0b10)) {
      return; // don't allow both mouse clicks
   }
   
   if ( !(event.buttons & 0b10) ) {
      return; // no left click
   }

   entities.forEach((entity) => {
      entity.update(entity.x + event.movementX, entity.y + event.movementY);
   });

   relations.forEach(relation => {
      relation.update();
   });
})