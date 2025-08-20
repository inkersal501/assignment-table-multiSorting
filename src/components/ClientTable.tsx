import type { Client, ClientTableProps, ClientStatus } from "../utils/types";

const statusColors: Record<ClientStatus, string> = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

function ClientTable({clients} : ClientTableProps) {
  return (
    <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-white text-black text-center">
          <tr>
            <th className="px-4 py-2">Client ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created By</th>
            <th className="px-4 py-2">Updated By</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {clients.map((client : Client) => (
            <tr key={client.clientId} className="hover:bg-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">{client.clientId}</td>
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