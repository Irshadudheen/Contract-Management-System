import { useEffect, useState } from "react";
import socket from "../socket/socket";
import { getContracts } from "../services/contractService";
import ContractDetails from "./ContractDetails";



const ContractList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();

    // Listen for real-time updates
    socket.on("contractUpdated", (updatedContract) => {
      setContracts((prevContracts) =>
        prevContracts.map((c) =>
          c.id === updatedContract.id ? updatedContract : c
        )
      );
    });

    return () => {
      socket.off("contractUpdated");
    };
  }, []);

  const fetchContracts = async () => {
    const data = await getContracts();
    setContracts(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Contracts</h2>
      <ul className="space-y-2">
        {contracts.map((contract) => (
          <ContractDetails key={contract.id} contract={contract} />
        ))}
      </ul>
    </div>
  );
};

export default ContractList;
