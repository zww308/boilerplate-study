const { expect } = require('chai');
const {
  bsv,
  buildContractClass,
  PubKey,
  getPreimage,
  Ripemd160,
  Sig,
  signTx,
  toHex,
  Sha256, 
  Bytes,
  SigHashPreimage,
} = require('scryptlib');

const {
  compileContract,
  inputIndex,
  inputSatoshis,
  newTx,
} = require('../../helper');

// A: Alice, B: Bob, E: Escrow
// scenario 1: PA + PB
// scenario 2: PA + PE + Hash 1
// scenario 3: PB + PE + Hash 2

const scenario = 1;

const privateKeyA = new bsv.PrivateKey.fromRandom('testnet');
const publicKeyA = privateKeyA.publicKey;
const publicKeyHashA = bsv.crypto.Hash.sha256ripemd160(publicKeyA.toBuffer());

const privateKeyB = new bsv.PrivateKey.fromRandom('testnet');
const publicKeyB = privateKeyB.publicKey;
const publicKeyHashB = bsv.crypto.Hash.sha256ripemd160(publicKeyB.toBuffer());

const privateKeyE = new bsv.PrivateKey.fromRandom('testnet');
const publicKeyE = privateKeyE.publicKey;
const publicKeyHashE = bsv.crypto.Hash.sha256ripemd160(publicKeyE.toBuffer());

const secretBuf1 = Buffer.from("abc");
const hashSecret1 = bsv.crypto.Hash.sha256(secretBuf1);

const secretBuf2 = Buffer.from("def");
const hashSecret2 = bsv.crypto.Hash.sha256(secretBuf2);

const privateKeyChange = new bsv.PrivateKey.fromRandom('testnet');
const publicKeyChange = privateKeyChange.publicKey;
const publicKeyHashChange = bsv.crypto.Hash.sha256ripemd160(publicKeyChange.toBuffer());

const fee = 1000;

const tx = newTx();

const amount = inputSatoshis;

describe('Test sCrypt contract Escrow in Javascript', () => {
  let escrow, preimage, result;

  before(() => {
    const Escrow = buildContractClass(compileContract('escrow.scrypt'));
    escrow = new Escrow(new Ripemd160(toHex(publicKeyHashA)), new Ripemd160(toHex(publicKeyHashB)), new Ripemd160(toHex(publicKeyHashE)), new Sha256(toHex(hashSecret1)), new Sha256(toHex(hashSecret2)));
    const Signature = bsv.crypto.Signature
    const sighashType = Signature.SIGHASH_ANYONECANPAY | Signature.SIGHASH_ALL | Signature.SIGHASH_FORKID
    switch(scenario) {
      case 1:
        tx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(privateKeyA.toAddress()),
          satoshis: amount / 2,
        }))

        tx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(privateKeyB.toAddress()),
          satoshis: amount / 2,
        }))

        tx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(privateKeyChange.toAddress()),
          satoshis: 1000,
        }))

        sigA = signTx(tx, privateKeyA, escrow.lockingScript, amount);
        sigB = signTx(tx, privateKeyB, escrow.lockingScript, amount);

        break;
      case 2:
        tx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(privateKeyA.toAddress()),
          satoshis: amount,
        }))

        sigA = signTx(tx, privateKeyA, escrow.lockingScript, amount);
        sigE = signTx(tx, privateKeyE, escrow.lockingScript, amount);

        break;
      case 3:
        tx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(privateKeyB.toAddress()),
          satoshis: amount ,
        }))

        sigB = signTx(tx, privateKeyB, escrow.lockingScript, amount);
        sigE = signTx(tx, privateKeyE, escrow.lockingScript, amount);

        break;
    }
    
    preimage = getPreimage(
      tx,
      escrow.lockingScript,
      inputSatoshis,
      0,
      sighashType
    );

    // set txContext for verification
    escrow.txContext = {
      tx,
      inputIndex,
      inputSatoshis
    };
  });

  switch(scenario) {
    case 1:
      it('should succeed when pushing right data for scenario 1: PA + PB', () => {
        result = escrow.unlock(
          new SigHashPreimage(toHex(preimage)),
          new PubKey(toHex(publicKeyA)),
          new Sig(toHex(sigA)),
          new PubKey(toHex(publicKeyB)),
          new Sig(toHex(sigB)),
          new Bytes(toHex('')),
          new Ripemd160(toHex(publicKeyHashChange)),
          1000
        )
        .verify();
        expect(result.success, result.error).to.be.true;
      });

      it('should fail when pushing wrong preimage', () => {
        result = escrow.unlock(
          new SigHashPreimage(toHex(preimage) + '01'),
          new PubKey(toHex(publicKeyA)),
          new Sig(toHex(sigA)),
          new PubKey(toHex(publicKeyB)),
          new Sig(toHex(sigB)),
          new Bytes(toHex('')),
          new Ripemd160(toHex(publicKeyHashChange)),
          amount / 2 - fee
        )
        .verify();
        expect(result.success, result.error).to.be.false;
      });

      break;
    case 2:
      it('should succeed when pushing right data for scenario 2: PA + PE + Hash 1', () => {
        result = escrow.unlock(
          new SigHashPreimage(toHex(preimage)),
          new PubKey(toHex(publicKeyA)),
          new Sig(toHex(sigA)),
          new PubKey(toHex(publicKeyE)),
          new Sig(toHex(sigE)),
          new Bytes(toHex(secretBuf1)),
          new Ripemd160(toHex(publicKeyHashChange)),
          amount - fee
        )
        .verify();
        expect(result.success, result.error).to.be.true;
      });

      it('should fail when pushing wrong preimage', () => {
        result = escrow.unlock(
          new SigHashPreimage(toHex(preimage) + '01'),
          new PubKey(toHex(publicKeyA)),
          new Sig(toHex(sigA)),
          new PubKey(toHex(publicKeyE)),
          new Sig(toHex(sigE)),
          new Bytes(toHex(secretBuf1)),
          new Ripemd160(toHex(publicKeyHashChange)),
          amount - fee
        )
        .verify();
        expect(result.success, result.error).to.be.false;
      });
      break;
    case 3:
      it('should succeed when pushing right data for scenario 3: PB + PE + Hash 2', () => {
        result = escrow.unlock(
          new SigHashPreimage(toHex(preimage)),
          new PubKey(toHex(publicKeyB)),
          new Sig(toHex(sigB)),
          new PubKey(toHex(publicKeyE)),
          new Sig(toHex(sigE)),
          new Bytes(toHex(secretBuf2)),
          new Ripemd160(toHex(publicKeyHashChange)),
          amount - fee
        )
        .verify();
        expect(result.success, result.error).to.be.true;
      });

      it('should fail when pushing wrong preimage', () => {
        result = escrow.unlock(
          new SigHashPreimage(toHex(preimage) + '01'),
          new PubKey(toHex(publicKeyB)),
          new Sig(toHex(sigB)),
          new PubKey(toHex(publicKeyE)),
          new Sig(toHex(sigE)),
          new Bytes(toHex(secretBuf2)),
          new Ripemd160(toHex(publicKeyHashChange)),
          amount - fee
        )
        .verify();
        expect(result.success, result.error).to.be.false;
      });
      break;
  }
});
