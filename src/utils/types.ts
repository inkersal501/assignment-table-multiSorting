export type ClientStatus = "Active" | "Inactive" | "Pending";
export type ClientType = "Company" | "Individual";

export interface Client {
  clientId: string;
  clientName: string;
  clientType: ClientType;
  email: string;
  phone: string;
  location: string;
  status: ClientStatus;
  createdBy: string;
  updatedBy: string;
  createdAt: string;  
  updatedAt: string;  
}

export interface ClientTableProps {
  clients: Client[];
  activeClientType: string;
}
export interface theadType {
    key: string; 
    label:string;
}

export type SortConfigType = {
  key: keyof Client;
  direction: "asc" | "desc";
} | null;