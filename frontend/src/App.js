import React, { useState } from 'react';
import { ethers } from 'ethers';
 

import './styles.css'; 

const tokenAbi = [

	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_totalSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currentAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "i_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nameOfTheContract",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbolOfTheContract",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

]

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = "0x45eC77f301213ea88bA577EF281Ae83CA5a487d0";

  const connectWallet = async() => {
    if(typeof window.ethereum != 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, tokenAbi, signer);
      setProvider(provider);
      setSigner(signer);
      setContract(contract);

      await provider.send("eth_requestAccounts", []);

    } else {
      console.log("Please install Metamask");
    }
  }


  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [addressForBalance, setAddressForBalance] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [owner, setOwner] = useState('');
  const [decimals, setDecimals] = useState('');

  const [mintAccount, setMintAccount] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [burnAccount, setBurnAccount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [approveTo, setApproveTo] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [allowanceOwner, setAllowanceOwner] = useState('');
  const [allowanceSpender, setAllowanceSpender] = useState('');
  const [allowance, setAllowance] = useState(0);
  const [increaseAllowanceSpender, setIncreaseAllowanceSpender] = useState('');
  const [increaseAllowanceAmount, setIncreaseAllowanceAmount] = useState('');
  const [decreaseAllowanceSpender, setDecreaseAllowanceSpender] = useState('');
  const [decreaseAllowanceAmount, setDecreaseAllowanceAmount] = useState('');
  const [fromTransferFrom, setFromTransferFrom] = useState('');
  const [toTransferFrom, setToTransferFrom] = useState('');
  const [amountTransferFrom, setAmountTransferFrom] = useState('');

  const nameFunction = async () => {
    try {
      const _name = await contract.name();
      setName(_name);
    } catch (error) {
      console.log('Error while getting name: '+ error.message);
    }
  }

  const symbolFunction = async () => {
    try {
      const _symbol = await contract.symbol();
      setSymbol(_symbol);
    } catch (error) {
      console.log('Error while getting symbol: '+ error.message);
    }
  }

  const decimalsFunction = async () => {
    try {
      const _decimals = await contract.decimals();
      setDecimals(_decimals.toString());
    } catch (error) {
      console.log('Error while getting decimals: '+ error.message);
    }
  }

  const mintFunction = async () => {
    try {
      const address = ethers.utils.getAddress(mintAccount);
      const amountInWei = ethers.utils.parseUnits(mintAmount, 'ether');
      const transactionResponse = await contract.mint(address, amountInWei);
	  console.log('Minting ...');
      await transactionResponse.wait();
      console.log('Mint was successful');
    } catch (error) {
      console.log("Error while minting:" + error.message);
    }
  }

  const burnFunction = async () => {
    try {
      const address = ethers.utils.getAddress(burnAccount);
      const amountInWei = ethers.utils.parseUnits(burnAmount, "ether");
      const transaction = await contract.burn(address, amountInWei);
	  console.log('Burning ...');
      await transaction.wait();
      console.log('Burn was successful');
    } catch (error) {
      console.log('Error while burning tokens: '+ error.message);
    }
  }
 
  const getTotalSupply = async() => {
    try {
      const totalSupply = await contract.totalSupply();
      setTotalSupply(ethers.utils.formatUnits(totalSupply, 'ether'));
    } catch (error) {
      console.error("Error getting total supply:", error.message);
    }
  }

  const getOwner = async() => {
    try {
      const _owner = await contract.i_owner();
      setOwner(ethers.utils.getAddress(_owner));
    } catch (error) {
      console.error("Error getting owner:", error.message);
    }
}

  const balanceOfFunction = async() => {
    try {
      const balance = await contract.balanceOf(addressForBalance);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error.message);
    }
}

// добавить дикрисинг, трансферинг и проч 

const transferFunction = async() => {
  try {
    const amountInWei = ethers.utils.parseUnits(transferAmount, 'ether');
    const transactionResponse = await contract.transfer(transferTo, amountInWei);
	console.log("Transfering");
    await transactionResponse.wait();
    console.log("Transaction successful");
  }
  catch (error){
    console.log("Error during execution:", error.message);
  }
}

const approveFunction = async () => {
  try {
    const _approveTo = ethers.utils.getAddress(approveTo);
    const amountInWei = ethers.utils.parseUnits(approveAmount, 'ether');
    const transaction = await contract.approve(_approveTo, amountInWei);
    await transaction.wait();
    console.log('Approve was successful');
  } catch (error) {
    console.log('Error occured while approving: '+ error.message);
  }
}

const getAllowanceFunction = async () => {
  try {
    const _owner = ethers.utils.getAddress(allowanceOwner);
    const _spender = ethers.utils.getAddress(allowanceSpender);
    const callFunction = await contract.allowance(_owner, _spender);
    const allowance = ethers.utils.formatEther(callFunction);
    setAllowance(allowance);
  } catch (error) {
    console.log('Error while getting allowance: '+ error.message);
  }
}

const increaseAllowanceFunction = async () => {
  try {
    const _spender = ethers.utils.getAddress(increaseAllowanceSpender);
    const _amountInWei = ethers.utils.parseUnits(increaseAllowanceAmount, 'ether');
    const transaction = await contract.increaseAllowance(_spender, _amountInWei);
    await transaction.wait();
    console.log('Increased successfully');
  } catch (error) {
    console.log('Error while increasing allowance: '+ error.message);
  }
}

const decreaseAllowanceFunction = async () => {
  try {
    const address = ethers.utils.getAddress(decreaseAllowanceSpender);
    const amountInWei = ethers.utils.parseUnits(decreaseAllowanceAmount, 'ether');
    const transaction = await contract.decreaseAllowance(address, amountInWei);
    await transaction.wait();
    console.log('Decreased Successfully');
  } catch (error) {
    console.log('Error while decreasing allowance: '+ error.message);
  }
}


const transferFromFunction = async () => {
  try {
    const from = ethers.utils.getAddress(fromTransferFrom);
    const to = ethers.utils.getAddress(toTransferFrom);
    const amountInWei = ethers.utils.parseUnits(amountTransferFrom);
    const transaction = await contract.transferFrom(from, to, amountInWei);
    await transaction.wait();
    console.log("Transfered from successfully");
  } catch (error) {
    console.log("Error while trasferingFrom: "+ error.message);
  }
}

return (
  <div className="appStyle">
    <button className="buttonStyle" onClick={connectWallet}>Connect Wallet</button>

    <div>
      <button className='buttonStyle' onClick={getTotalSupply}> Get Total Supply</button>
      <p>Total supply: {totalSupply}</p>
    </div>

    <div>
      <button className='buttonStyle' onClick={nameFunction}> Get Name of The Contract</button>
      <p>Name: {name}</p>
    </div>

    <div>
      <button className='buttonStyle' onClick={symbolFunction}> Get Symbol of The Contract</button>
      <p>Symbol: {symbol}</p>
    </div>

    <div>
      <button className='buttonStyle' onClick={decimalsFunction}> Get Decimals</button>
      <p>Decimals: {decimals}</p>
    </div>

    <div>
      <button className='buttonStyle' onClick={getOwner}> Get Owner</button>
      <p>Owner: {owner}</p>
    </div>

    <div>
      <input className="inputStyle" placeholder="Address" value={addressForBalance} onChange={(e) => setAddressForBalance(e.target.value)} />
      <button className='buttonStyle' onClick={balanceOfFunction}> Get Balance </button>
      <p>Balance: {balance}</p>
    </div>

    <div>
      <input className='inputStyle' placeholder='Account to mint' value = {mintAccount} onChange={e => setMintAccount(e.target.value)} />
      <input className='inputStyle' placeholder='Amount to mint'onChange={e => setMintAmount(e.target.value)} />
      <button className='buttonStyle' onClick={mintFunction}> Mint Tokens </button>
    </div>

    <div>
      <input className='inputStyle' placeholder='Account to burn' value={burnAccount} onChange={e => setBurnAccount(e.target.value)}/>
      <input className='inputStyle' placeholder='Amount to burn' onChange={e => setBurnAmount(e.target.value)}/>
      <button className='buttonStyle' onClick={burnFunction}> Burn Tokens </button>
    </div>


    <div>
      <input className='inputStyle' placeholder='Recipient' onChange={e => setTransferTo(e.target.value)}/>
      <input className='inputStyle' placeholder='Amount' onChange={e => setTransferAmount(e.target.value)}/>
      <button className='buttonStyle' onClick={transferFunction} > Transfer Tokens</button>
    </div>

    <div>
      <input className='inputStyle' placeholder='Spender' onChange={e => setApproveTo(e.target.value)}></input>
      <input className='inputStyle' placeholder='Amount to approve' onChange={e => setApproveAmount(e.target.value)}></input>
      <button className='buttonStyle' onClick={approveFunction}> Approve Tokens </button>
    </div>

    <div>
      <input className='inputStyle' placeholder='Owner' value={allowanceOwner} onChange={(e) => setAllowanceOwner(e.target.value)}></input>
      <input className='inputStyle' placeholder='Spender' value={allowanceSpender} onChange={(e) => setAllowanceSpender(e.target.value)}></input>
      <button className='buttonStyle' onClick={getAllowanceFunction}> Get allowance </button>
      <p>Allowance: {allowance}</p>
    </div>

    <div>
      <input className='inputStyle' placeholder='Spender' value={increaseAllowanceSpender} onChange={e => setIncreaseAllowanceSpender(e.target.value)}></input>
      <input className='inputStyle' placeholder='Amount to increase' value={increaseAllowanceAmount} onChange={e => setIncreaseAllowanceAmount(e.target.value)}></input>
      <button className='buttonStyle' onClick={increaseAllowanceFunction}>Increase Allowance</button>
    </div>

    <div>
      <input className='inputStyle' placeholder='Spender' value={decreaseAllowanceSpender} onChange={e => setDecreaseAllowanceSpender(e.target.value)}/>
      <input className='inputStyle' placeholder='Amount to decrease' value={decreaseAllowanceAmount} onChange={e => setDecreaseAllowanceAmount(e.target.value)}/>
      <button className='buttonStyle' onClick={decreaseAllowanceFunction}>Decrease Allowance</button>
    </div>

    <div>
      <input className='inputStyle' placeholder='Transfer from' value={fromTransferFrom} onChange={e => setFromTransferFrom(e.target.value)}></input>
      <input className='inputStyle' placeholder='Transfer to' value={toTransferFrom} onChange={e => setToTransferFrom(e.target.value)}></input>
      <input className='inputStyle' placeholder='Amount' value={amountTransferFrom} onChange={e => setAmountTransferFrom(e.target.value)}></input>
      <button className='buttonStyle' onClick={transferFromFunction}>Transfer from</button>
    </div>

  </div>
);

}

export default App;


