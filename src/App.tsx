import React, {useCallback, useState} from "react";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import Office from "./Office";
import jsonData from "./data";
import getFloors from "./models/getOffices";
import Person from "./Person";
import PersonData from "./models/PersonData";

function App() {
   const [floors, setFloors] = useState(getFloors(jsonData));
   const [floorId, setFloorId] = useState(0);
   
   const [aside, setAside] = useState<PersonData[]>([]);
   
   const onDragEnd = useCallback((res: DropResult) => {
      let src = res.source!!,
         dest = res.destination!!;
   
      console.log(src, dest);
      
      if (src == null || dest == null)
         return;
      
      const oldList = src.droppableId === "aside" ? aside :
         // @ts-ignore
         floors[floorId]
            .offices.find(o => o.name === src.droppableId)
            .people;
      
      const [removed] = oldList.splice(src.index, 1);
      
      const newList = dest.droppableId === "aside" ? aside :
         // @ts-ignore
         floors[floorId]
            .offices.find(o => o.name === dest.droppableId)
            .people;
      
      newList.splice(dest.index, 0, removed);
      
      setFloors(floors);
      setAside(aside);
   }, [aside, floors, floorId]);
   
   function prevFloor() {
      setFloorId(floorId - 1);
   }
   
   function nextFloor() {
      setFloorId(floorId + 1);
   }
   
   return (
      <div>
         <h1>Projet <a
            href="https://www.imt-atlantique.fr/fr/formation/ingenieur-par-apprentissage/ingenierie-logicielle">FIL</a> rouge
         </h1>
         <DragDropContext onDragEnd={onDragEnd}>
            <aside>
               <h2>Membres</h2>
               <Droppable droppableId="aside">
                  {prov => (
                     <div ref={prov.innerRef} {...prov.droppableProps}>
                        {aside.map((pData, index) =>
                           <Person data={pData} index={index} key={pData.fullName} />
                        )}
                        {prov.placeholder}
                     </div>
                  )}
               </Droppable>
            </aside>
            <main>
               {floors[floorId].offices.map(d => <Office data={d} key={d.name} />)}
            </main>
         </DragDropContext>
         <nav>
            <button disabled={floorId < 1} onClick={prevFloor}>←</button>
            <span>{floors[floorId].name}</span>
            <button disabled={floorId >= floors.length - 1} onClick={nextFloor}>→</button>
         </nav>
      </div>
   );
}

export default App;
