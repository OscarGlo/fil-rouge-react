import {Droppable} from "react-beautiful-dnd";
import React from "react";
import Person from "./Person";
import OfficeData from "./models/OfficeData";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";

export default function Office({data}: { data: OfficeData }) {
   return (
      <Grid item sx={{gridArea: (data.position[0] + 1) + "/" + (data.position[1] + 1)}}>
         <Card className="office">
            <CardHeader classes={{ subheader: "subheader" }} title={data.name}/>
            <Droppable droppableId={data.name}>
               {prov => (
                  <CardContent ref={prov.innerRef} {...prov.droppableProps}>
                     {data.people.map((pData, index) =>
                        <Person data={pData} index={index} key={pData.fullName} />
                     )}
                     {prov.placeholder}
                  </CardContent>
               )}
            </Droppable>
         </Card>
      </Grid>
   );
}