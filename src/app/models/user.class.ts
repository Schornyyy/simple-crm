export class User {
  firstname: string;
  lastname: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
  email: string;
  id: string;

  constructor(obj?: any) {
    this.firstname = obj ? obj.firstname : '';
    this.lastname = obj ? obj.lastname : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.email = obj ? obj.email : '';
    this.id = obj ? obj.id : '';
  }

  public toJSON() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      email: this.email,
    };
  }
}
