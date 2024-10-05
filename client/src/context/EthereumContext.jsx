import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from '../utils/constants';

const EthereumContext = createContext();

export const EthereumProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);


  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setUserAddress(accounts[0]);
      setIsConnected(true);
    } else {
      setUserAddress('');
      setIsConnected(false);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setProvider(provider);
        setUserAddress(accounts[0]);
        setIsConnected(true);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        setContract(contract);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        alert('Failed to connect wallet.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const buyGadget = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.buyGadget({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        alert('Gadget purchased successfully!');
      } catch (error) {
        console.error(error);
        alert('Transaction failed, insufficient funds.');
      }
    }
  };

  return (
    <EthereumContext.Provider value={{ connectWallet, buyGadget, userAddress, isConnected }}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => useContext(EthereumContext);
