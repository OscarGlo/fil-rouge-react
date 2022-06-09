import {Draggable} from "react-beautiful-dnd";
import PersonData from "./models/PersonData";
import {Avatar, Chip} from "@mui/material";

export default function Person({data, index}: { data: PersonData, index: number }) {
   return (
      <Draggable key={data.fullName} draggableId={data.fullName} index={index}>
         {prov => (
            <Chip ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}
                  label={data.fullName}
                  avatar={<Avatar>{data.surname[0]}{data.name[0]}</Avatar>}
            />
         )}
      </Draggable>
   );
}