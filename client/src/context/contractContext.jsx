import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';


const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const [contracts, setContracts] = useState({});
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        
        const newSocket = io('http://localhost:3000');

        newSocket.on('contractUpdated', (updatedContract) => {
            setContracts(prevContracts => ({
                ...prevContracts,
                [updatedContract.id]: {
                    ...(prevContracts[updatedContract.id] || {}),
                    ...updatedContract
                }
            }));
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    const updateContractStatus = (contractId, newStatus) => {
        if (socket) {
            socket.emit('contractUpdated', {
                id: contractId,
                status: newStatus
            });
        }
    };

    return (
        <ContractContext.Provider value={{ 
            contracts, 
            updateContractStatus 
        }}>
            {children}
        </ContractContext.Provider>
    );
};

export const useContractContext = () => {
    return useContext(ContractContext);
};