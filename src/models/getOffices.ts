import FloorData from "./FloorData";

export default function getOffices(data: object): FloorData[] {
   return Object.entries(data).map(d => FloorData.fromJson(...d))
}