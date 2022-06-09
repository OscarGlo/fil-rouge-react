import React, {useCallback, useState} from "react";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import Office from "./Office";
import jsonData from "./data";
import getFloors from "./models/getOffices";
import Person from "./Person";
import PersonData from "./models/PersonData";
import {
   AppBar,
   BottomNavigation,
   BottomNavigationAction,
   Card,
   CardContent,
   CardHeader,
   Grid,
   Stack,
   Toolbar,
   Typography
} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

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
      <React.Fragment>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6">Projet FIL rouge</Typography>
            </Toolbar>
         </AppBar>
         <Stack component="main" direction="row">
            <DragDropContext onDragEnd={onDragEnd}>
               <Card className="membres">
                  <CardHeader title="Membres" />
                  <Droppable droppableId="aside">
                     {prov => (
                        <CardContent ref={prov.innerRef} {...prov.droppableProps}>
                           {aside.map((pData, index) =>
                              <Person data={pData} index={index} key={pData.fullName} />
                           )}
                           {prov.placeholder}
                        </CardContent>
                     )}
                  </Droppable>
               </Card>
               <Grid id="floor-layout" container>
                  {floors[floorId].offices.map(d => <Office data={d} key={d.name} />)}
               </Grid>
            </DragDropContext>
         </Stack>
         <BottomNavigation showLabels>
            <BottomNavigationAction disabled={floorId < 1} onClick={prevFloor} icon={<ArrowBack/>}/>
            <BottomNavigationAction disabled={true} label={floors[floorId].name}/>
            <BottomNavigationAction disabled={floorId >= floors.length - 1} onClick={nextFloor} icon={<ArrowForward/>}/>
         </BottomNavigation>
      </React.Fragment>
   );
}

export default App;
