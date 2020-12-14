const { expect } = require("chai");

describe("Governance Tests", function () {
  let trustToken,timelock,governorAlpha;
  const MaxSupply = '145000000000000000';

  beforeEach(async function () {
    [owner, a1, a2, ...addrs] = await ethers.getSigners();

    trustToken = await (await ethers.getContractFactory("TrustToken")).deploy(owner.address);
    // timelock = await (await ethers.getContractFactory("Timelock")).deploy(owner.address,10*24*60*60);
    // governorAlpha = await (await ethers.getContractFactory("GovernorAlpha")).deploy(timelock.address,comp.address,owner.address);
  });

  describe("Meta data", function() {
    it("has given name", async function() {
      expect(await trustToken.name()).to.equal('TrustToken');
    })
    it("balanceOf", async function() {
      expect(await trustToken.totalSupply()).to.equal(MaxSupply);
    });
  });
  describe('balanceOf', () => {
    it('grants to initial account', async () => {
      expect(await trustToken.balanceOf(owner.address)).to.equal(MaxSupply);
    });
  });
  describe('delegateBySig', () => {
    it('reverts if the signatory is invalid', async () => {
      const delegatee = owner.address, nonce = 0, expiry = 0;
      // expect(await trustToken.delegateBySig(delegatee,nonce,expiry,0,
      //   '0x47dc31f9b4ddd9535b8ae5dd6b7609c7c4b46928cbb3cacce6b9e503d6139b13',
      //   '0x47dc31f9b4ddd9535b8ae5dd6b7609c7c4b46928cbb3cacce6b9e503d6139b13')).to.throw("revert Comp::delegateBySig: invalid signature");


        await expectRevert(
          await trustToken.delegateBySig(delegatee,nonce,expiry,0,
            '0x47dc31f9b4ddd9535b8ae5dd6b7609c7c4b46928cbb3cacce6b9e503d6139b13',
            '0x47dc31f9b4ddd9535b8ae5dd6b7609c7c4b46928cbb3cacce6b9e503d6139b13'),
          'revert Comp::delegateBySig: invalid signature',
        );

    });
    // it('delegates on behalf of the signatory', async () => {
    //   const delegatee = root, nonce = 0, expiry = 10e9;
    //   const { v, r, s } = EIP712.sign(Domain(trustToken), 'Delegation', { delegatee, nonce, expiry }, Types, unlockedAccount(a1).secretKey);
    //   expect(await trustToken.delegates(a1)).toEqual(address(0));
    //   const tx = await trustToken.delegateBySig(delegatee, nonce, expiry, v, r, s);
    //   expect(tx.gasUsed < 80000);
    //   expect(await call(comp, 'delegates', [a1])).toEqual(root);
    // });

  });

});

