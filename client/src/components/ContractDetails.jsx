
  const ContractDetails = ({ contract }) => {
    return (
      <li className="p-4 border rounded-lg bg-gray-800 text-white">
        <h3 className="text-lg font-bold">{contract.clientName}</h3>
        <p>Status: {contract.status}</p>
        <p>Created: {new Date(contract.createdAt).toLocaleDateString()}</p>
      </li>
    );
  };
  
  export default ContractDetails;
  