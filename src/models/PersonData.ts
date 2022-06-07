export default class PersonData {
   public surname: string;
   public name: string;
   
   constructor(surname: string, name: string) {
      this.surname = surname;
      this.name = name;
   }
   
   get fullName(): string {
      return this.surname + " " + this.name;
   }
   
   static fromJson(data: string): PersonData {
      const [surname, name] = data.split(" ", 2);
      return new PersonData(surname, name);
   }
}