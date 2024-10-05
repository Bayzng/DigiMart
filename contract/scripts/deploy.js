const hre = require('hardhat');

async function main() {
  await hre.run('compile');

  const BuyGadget = await hre.ethers.getContractFactory('BuyGadget');
  
  const buyGadget = await BuyGadget.deploy();

  console.log('Deploying BuyGadget...');
  
  await buyGadget.deployed();

  console.log(`BuyGadget deployed to: ${buyGadget.address}`);
}


main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

