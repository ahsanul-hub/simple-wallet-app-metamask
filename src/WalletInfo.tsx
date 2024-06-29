import React, { useState } from "react";
import { ethers } from "ethers";

const WalletInfo = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        const balance = await provider.getBalance(address);
        const formatedBalance = parseFloat(balance);

        setAddress(address);
        setBalance(formatedBalance);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      console.log("MetaMask not installed");
    }
  };

  return (
    <div className="w-full p-2 flex justify-between items-center bg-gray-800 ">
      <h1 className="text-xl font-bold text-white pl-4">My Wallet</h1>
      <div className="flex items-center">
        {address ? (
          <div className=" text-white">
            <div className="mr-4">
              <strong>Address:</strong> {address || "Not connected"}
            </div>
            <div>
              <strong>Balance:</strong>
              {` ${balance} ETH`}
            </div>
          </div>
        ) : (
          <button onClick={handleConnectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
