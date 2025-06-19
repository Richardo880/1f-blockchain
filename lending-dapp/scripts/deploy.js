const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Desplegando con la cuenta:", deployer.address);

  // 1. Deploy CollateralToken
  const CollateralToken = await hre.ethers.getContractFactory("CollateralToken");
  const collateralToken = await CollateralToken.deploy();
  await collateralToken.deployed();
  console.log("CollateralToken (cUSD) desplegado en:", collateralToken.address);

  // 2. Deploy LoanToken
  const LoanToken = await hre.ethers.getContractFactory("LoanToken");
  const loanToken = await LoanToken.deploy();
  await loanToken.deployed();
  console.log("LoanToken (dDAI) desplegado en:", loanToken.address);

  // 3. Deploy LendingProtocol
  const LendingProtocol = await hre.ethers.getContractFactory("LendingProtocol");
  const lendingProtocol = await LendingProtocol.deploy(
    collateralToken.address,
    loanToken.address
  );
  await lendingProtocol.deployed();
  console.log("LendingProtocol desplegado en:", lendingProtocol.address);

  // 4. Guardar direcciones en un archivo (útil para frontend)
  const data = {
    collateralToken: collateralToken.address,
    loanToken: loanToken.address,
    lendingProtocol: lendingProtocol.address
  };

  fs.writeFileSync("deployed-addresses.json", JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
