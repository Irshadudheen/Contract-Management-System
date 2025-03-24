import { useState } from "react";
import socket from "../socket/socket";
import { updateContractStatus } from "../services/contractService";

const ContractUpdate = ({ contractId }) => {
  const [newStatus, setNewStatus] = useState("");

  const handleUpdate = async () => {
    await updateContractStatus(contractId, newStatus);
    socket.emit("contractUpdated", { contractId, status: newStatus });
  };

  return (
    <div className="p-4">
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="p-2 border rounded">
        <option value="">Select Status</option>
        <option value="Draft">Draft</option>
        <option value="Finalized">Finalized</option>
      </select>
      <button onClick={handleUpdate} className="ml-2 px-4 py-2 bg-green-500 rounded">Update</button>
    </div>
  );
};

export default ContractUpdate;