import {Droppable} from "react-beautiful-dnd";
import React from "react";
import Person from "./Person";
import OfficeData from "./models/OfficeData";

export default function Office({data}: { data: OfficeData }) {
   return (
      <div className="drop-list" style={{gridArea: (data.position[0] + 1) + "/" + (data.position[1] + 1)}}>
         <h2>{data.name}</h2>
         <Droppable droppableId={data.name}>
            {prov => (
               <div ref={prov.innerRef} {...prov.droppableProps}>
                  {data.people.map((pData, index) =>
                     <Person data={pData} index={index} key={pData.fullName} />
                  )}
                  {prov.placeholder}
               </div>
            )}
         </Droppable>
      </div>
   );
}