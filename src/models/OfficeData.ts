import PersonData from "./PersonData";

export default class OfficeData {
   public name: string;
   public position: [number, number];
   public people: PersonData[];
   
   constructor(name: string, x: number, y: number) {
      this.name = name;
      this.position = [x, y];
      this.people = [];
   }
   
   static fromJson(name: string, data: { pos: [number, number], people?: string[] }): OfficeData {
      let office = new OfficeData(name, ...data.pos);
      office.people = data.people?.map(PersonData.fromJson) ?? [];
      return office;
   }
}