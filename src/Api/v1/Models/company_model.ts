import { Office } from "./office_model";

export class Company {
  private name: string;
  private offices: Office[];

  constructor(name: string,offices: Office[]) {
    this.name = name;
    this.offices = offices;
  }
  public get getOffices() {
    return this.offices;
  }
  public get getName() {
    return this.name;
  }

  public setOffices  (offices: Office[] ) {
    this.offices = offices;

  }
   
  public setName (name: string ) {
    this.name = name;

  }
   
  


}