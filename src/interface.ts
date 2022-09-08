export interface IAddress {
    country: string;
    street: string;
    city: string;
    house: string;
}

export interface IFormData  {
    email: string;
    name: string;
    address: IAddress
    test: any
}