export class Appointment {
  public dcDetails?: DcDetails;
  public test: any[] = [];
  public PreferredDate?: Date;
  public PreferredTime?: string;
  public typeOfVisit: string;
}
export class DcDetails {
  public name: string = '';
  public address: string = '';
  public city: string = '';
  public state: string = '';
  public pinCode: string = '';
  public phoneNumber?: number;
  public email?: string = '';
  public selected?: boolean = false;
}

export class Appointments {
  partial: boolean = false;
  status?: string = '';
  comment?: string = '';
  appointments: Appointment[] = [];
}
