export interface Customer {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  adress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  createdAt?: Date;
  lastCommand?: Date;
  fidelityPoint?: number;
}

export function mapApiDataToCustomer(apiData: any): Customer {
  return {
    id: apiData.id,
    firstname: apiData.firstname,
    lastname: apiData.lastname,
    email: apiData.email,
    phone: apiData.phone,
    adress: apiData.adress,
    city: apiData.city,
    postalCode: apiData.postalCode,
    country: apiData.country,
    createdAt: apiData.createdAt,
    lastCommand: apiData.lastCommand ? new Date(apiData.lastCommand) : undefined,
    fidelityPoint: apiData.fidelityPoint ? Number(apiData.fidelityPoint) : undefined,
  };
}

export function mapCustomerToApiData(customer: Customer): any {
  return {
    id: customer.id,
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    adress: customer.adress,
    city: customer.city,
    postalCode: customer.postalCode,
    country: customer.country,
    createdAt: customer.createdAt,
    lastCommand: customer.lastCommand ? new Date(customer.lastCommand) : undefined,
    fidelityPoint: customer.fidelityPoint ? Number(customer.fidelityPoint) : undefined,
  };
}
