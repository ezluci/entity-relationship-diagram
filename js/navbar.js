const navbar = document.querySelector('#navbar');


const freeMoveButton = navbar.querySelector('#navbar-freemove');

freeMoveButton.addEventListener('click', event => {
   freeMove = !freeMove;
   if (freeMove) {
      freeMoveButton.innerText = 'Free move: ON';
   } else {
      freeMoveButton.innerText = 'Free move: OFF';
   }
});


const dragEntitiesButton = navbar.querySelector('#navbar-dragentities');

dragEntitiesButton.addEventListener('click', event => {
   dragEntities = !dragEntities;
   if (dragEntities) {
      dragEntitiesButton.innerText = 'Drag entities: ON';
   } else {
      dragEntitiesButton.innerText = 'Drag entities: OFF';
   }
});


const expandEntitiesButton = navbar.querySelector('#navbar-expandentities');

expandEntitiesButton.addEventListener('click', event => {
   entities.forEach(entity => {
      entity.showAttributes();
   });
   relations.forEach(relation => {
      relation.update();
   });
});


const shrinkEntitiesButton = navbar.querySelector('#navbar-shrinkentities');

shrinkEntitiesButton.addEventListener('click', event => {
   entities.forEach(entity => {
      entity.hideAttributes();
   });
   relations.forEach(relation => {
      relation.update();
   });
});


const displayJsonButton = navbar.querySelector('#navbar-displayjson');
displayJsonButton.addEventListener('click', event => {
   const json = {entities: [], relations: []};

   entities.forEach(entity => {
      const entityObj = {name: entity.name, x: entity.x, y: entity.y, h: entity.h, w: entity.w, attributes: entity.attributes};
      json.entities.push(entityObj);
   });

   relations.forEach(relation => {
      const relationObj = {name1: relation.e1.name, name2: relation.e2.name};
      json.relations.push(relationObj);
   });

   document.body.innerHTML = '';
   const pre = document.createElement('pre');
   pre.innerText = JSON.stringify(json, null, '\t');
   document.body.appendChild(pre);
})