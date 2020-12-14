require("@nomiclabs/hardhat-waffle");


task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.6.0",
};

const INFURA_PROJECT_ID = "8e8cbc5340654d86a14d3561d3910a54";
const ROPSTEN_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.6.0",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
