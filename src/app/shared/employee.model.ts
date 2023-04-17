export interface Employee {
  name: string;
  email: string;
  contactNo: string;
  department: string;
  emergencyContacts: [
    {
      name: string;
      contactNo: string;
    }
  ];
}
