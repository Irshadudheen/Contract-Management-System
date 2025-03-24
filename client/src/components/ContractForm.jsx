import { useState } from "react";
import { createContract } from "../services/contractService";

const ContractForm = () => {
  const [clientName, setClientName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createContract(clientName);
    setClientName(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-gray-900 text-white">
      <h2 className="text-lg font-semibold">New Contract</h2>
      <input
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="p-2 border rounded w-full bg-gray-700"
        required
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 rounded">Create</button>
    </form>
  );
};

export default ContractForm;
