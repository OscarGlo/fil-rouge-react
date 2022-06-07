import {Draggable} from "react-beautiful-dnd";
import PersonData from "./models/PersonData";

export default function Person({data, index}: { data: PersonData, index: number }) {
   return (
      <Draggable key={data.fullName} draggableId={data.fullName} index={index}>
         {prov => (
            <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="person">
               {data.fullName}
            </div>
         )}
      </Draggable>
   );
}