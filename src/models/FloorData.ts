import OfficeData from "./OfficeData";

export default class FloorData {
   public name: string;
   public offices: OfficeData[];
   
   constructor(name: string) {
      this.name = name;
      this.offices = [];
   }
   
   static fromJson(name: string, data: object): FloorData {
      let floor = new FloorData(name);
      floor.offices = Object.entries(data).map(e => OfficeData.fromJson(...e));
      return floor;
   }
}