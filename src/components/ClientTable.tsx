import { useAppSelector } from "../store/hooks"; 
import { applyMultiSort } from "../utils/applyMultiSort";

import type { Client, ClientTableProps, ClientStatus, theadType } from "../utils/types";

const statusColors: Record<ClientStatus, string> = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

const thead: theadType[] = [
  { key: "clientId", label: "Client ID" },
  { key: "clientName", label: "Name" },
  { key: "clientType", label: "Type" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "status", label: "Status" },
  { key: "createdBy", label: "Created By" },
  { key: "updatedBy", label: "Updated By" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
];

function ClientTable({ clients, activeClientType }: ClientTableProps) { 
  
  const multiSort = useAppSelector((state) => state.sort.sorts); 
  const sortedClients = applyMultiSort(clients, activeClientType, multiSort);

  return (
    <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
      
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="text-left text-gray-400">
          <tr>
            {thead.map((col) => (
              <th key={col.key} className="px-4 py-2">
                <div className="flex items-center gap-1">
                  {col.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {sortedClients.map((client: Client) => (
            <tr key={client.clientId} className="hover:bg-blue-50">
              <td className="px-4 py-2 font-medium text-blue-600">{client.clientId}</td>
              <td className="px-4 py-2">{client.clientName}</td>
              <td className="px-4 py-2">{client.clientType}</td>
              <td className="px-4 py-2 text-blue-600">{client.email}</td>
              <td className="px-4 py-2">{client.phone}</td>
              <td className="px-4 py-2">{client.location}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[client.status]}`}
                >
                  {client.status}
                </span>
              </td>
              <td className="px-4 py-2">{client.createdBy}</td>
              <td className="px-4 py-2">{client.updatedBy}</td>
              <td className="px-4 py-2">{client.createdAt}</td>
              <td className="px-4 py-2">{client.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
 
    </div>
  );
}

export default ClientTable;
