const { ethers } = require('ethers');
require('dotenv-safe').config({
    allowEmptyValues: false,
    example: '.env.example',
  });

const fs = require('fs');



async function main () {
    const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_ID);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    const contractJson = fs.readFileSync("out/ERC20.sol/ERC20.json", "utf-8");
    const contractArtifact = JSON.parse(contractJson); 

    const abi = contractArtifact.abi;
    const bytecode = contractArtifact.bytecode;

    const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

    console.log("Deploying contract...");

    const contract = await contractFactory.deploy("ERC20 Contract", "ERC20C", 2000);
    await contract.deployed();

    console.log("Contract was deployed to: ", contract.address);

}

main().then(() => process.exit(0)).catch(error => { // process.exit(0) means ыuccessful completion of the script
    console.error(error);
    process.exit(1); // immediate stop of the process 
})

// 0x12dEa528c2E785139a29Bd2217bb575A1439633a

// НАПИСАТЬ ПОДСКАЗКИ в nb 
// сделать тоже самое на web3.js но заюзать alchemy вместо infura






