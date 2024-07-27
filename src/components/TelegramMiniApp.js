import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';

const TelegramMiniApp = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [botMessage, setBotMessage] = useState('');

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.request({ method: 'eth_accounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet.');
    }
  };

  const sendMessageToBot = async () => {
    try {
      await axios.post(
        `https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.REACT_APP_CHAT_ID,
          text: `User with wallet address ${walletAddress} connected to the mini-app.`,
        }
      );
      setBotMessage('Message sent to the bot!');
    } catch (error) {
      console.error('Error sending message to the bot:', error);
      setBotMessage('Error sending message to the bot.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Connect with MetaMask</h1>
      {walletAddress ? (
        <div>
          <p>Connected wallet: {walletAddress}</p>
          <button onClick={sendMessageToBot} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Send Message to Bot
          </button>
          {botMessage && <p className="mt-2">{botMessage}</p>}
        </div>
      ) : (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default TelegramMiniApp;