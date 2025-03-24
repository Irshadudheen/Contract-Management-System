import ContractList from "../components/ContractList";
import ContractForm from "../components/ContractForm";

const ContractsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Contract Management</h1>
      <ContractForm />
      <ContractList />
    </div>
  );
};

export default ContractsPage;
