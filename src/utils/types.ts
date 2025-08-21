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
  key: keyof Client; 
  label: string;
}

export type SortDirection = "asc" | "desc";

export type SortConfigType = {
  key: keyof Client;
  direction: SortDirection;
} | null;

export type MultiSortConfig = {
  key: keyof Client;
  direction: SortDirection;
}[];
