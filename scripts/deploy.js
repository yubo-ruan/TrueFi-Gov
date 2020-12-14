async function main() {

    const [deployer] = await ethers.getSigners();
    const ownerAddress = deployer.address;
  
    console.log("Deploying contracts with the account:",deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Comp = await ethers.getContractFactory("Comp");
    const comp = await Comp.deploy(ownerAddress);
    console.log("Comp address:", comp.address);

    const Timelock = await ethers.getContractFactory("Timelock");
    const timelock = await Timelock.deploy(ownerAddress,10*24*60*60);
    console.log("Timelock address:", timelock.address);

    const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
    const governorAlpha = await GovernorAlpha.deploy(timelock.address,comp.address,ownerAddress);
    console.log("GovernorAlpha address:", governorAlpha.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });