# sCrypt Project Boilerplate
[![Build Status](https://travis-ci.com/sCrypt-Inc/boilerplate.svg?branch=master)](https://travis-ci.com/sCrypt-Inc/boilerplate)
## Prerequisites
Make sure you have the [sCrypt IDE](https://scrypt-ide.readthedocs.io/en/latest/index.html) installed. **sCrypt IDE** is a tool for developers to write, test, deploy, call, and debug sCrypt smart contracts.

## Guide

[**sCrypt**](https://scryptdoc.readthedocs.io) is a high-level programming language for writing smart contracts on Bitcoin SV. This project provides examples to help developers learn and integrate sCrypt smart contracts to their Javascript-based projects. Our recommended procedure of developing smart contract based applications is as follows:

1. Contract Development and Test

1. Contract Integration and Application Launch

After developing and unit testing the smart contracts, the next step is to integrate them into your application which is written in other languages such as Javascript or Python. Integration tests should be run on Bitcoin SV [Testnet](https://test.whatsonchain.com/) or [Scaling Test Network(STN)](https://bitcoinscaling.io/) before launching the application to the public on mainnet.

## Quickstart
```
npm install
npm test
```

## Directory layout
For each contract `x`, a source file is at `contracts/x.scrypt`, a test file is at `tests/js/x.scrypttest.js`, and a deployment file is at `testnet/x.js`.
<pre>
.
├── contracts                       # sCrypt contract files
│   ├── accumulatorMultiSig.scrypt      # <a href="https://xiaohuiliu.medium.com/accumulator-multisig-d5a5a1b5fc42">Accumulator MultiSig</a>
│   ├── ackermann.scrypt                # <a href="https://scryptdoc.readthedocs.io/en/latest/ackermann.html">Ackermann function</a>
│   ├── acs.scrypt                      # A contract which can be spent by anyone but only to a specific address
│   ├── advancedCounter.scrypt          # Use external UTXOs to pay <a href="https://medium.com/@xiaohuiliu/advanced-op-push-tx-78ce84f69a66">counter</a> contract tx fees using sighash <i>ANYONECANPAY</i>
│   ├── advancedTokenSale.scrypt        # Sambe as above, but for token sale contract
│   ├── asm.scrypt                      # Embed Script directly into sCrypt <a href="https://medium.com/@xiaohuiliu/inline-script-inside-scrypt-27d5aa279fd3">using inline assembly</a>
│   ├── auction.scrypt                  # <a href="https://xiaohuiliu.medium.com/auction-on-bitcoin-4ba2b6c18ba7">Auction on Bitcoin</a>
│   ├── binaryOption.scrypt             # <a href="https://powping.com/posts/425fe57d0d7cc11317d0e7b7d412770a11ef18c6f159d5deade78b79725833ab">A binary option contract</a>
│   ├── cltv.scrypt                     # <a href="https://xiaohuiliu.medium.com/op-push-tx-3d3d279174c1">CheckLockTimeVerify without OP_CLTV</a>
│   ├── cointoss.scrypt                 # <a href="https://xiaohuiliu.medium.com/another-fair-bitcoin-toss-742894b086cd">Fair BitCoin Toss using Blum's Protocol</a>
│   ├── cointossxor.scrypt              # <a href="https://xiaohuiliu.medium.com/fair-bitcoin-toss-7310256e60c3">Fair BitCoin Toss using XOR</a>
│   ├── conwaygol.scrypt                # <a href="https://xiaohuiliu.medium.com/play-conways-game-of-life-on-bitcoin-forever-47c6fb7ed682">Conway’s Game of Life</a>
│   ├── counter.scrypt                  # Count the number of times a function has been called to showcase <a href="https://medium.com/coinmonks/stateful-smart-contracts-on-bitcoin-sv-c24f83a0f783">stateful contract</a>
│   ├── ec.scrypt                       # <a href="https://xiaohuiliu.medium.com/efficient-elliptic-curve-point-addition-and-multiplication-in-scrypt-script-f7e143a752e2">Elliptic curve point add/multipliy</a>
│   ├── ecdsa.scrypt                    # <a href="https://xiaohuiliu.medium.com/ecdsa-signature-verification-in-script-d1e8dda5f893">ECDSA Signature Verification</a>
│   ├── demo.scrypt                     # "hello world" contract
│   ├── faucet.scrypt                   # <a href="https://blog.csdn.net/Edward_sv/article/details/109119838">rate-limited onchain faucet</a>
│   ├── forward.scrypt                  # <a href="https://xiaohuiliu.medium.com/p2p-bitcoin-settled-derivatives-forward-contracts-94d48b909b94">P2P Bitcoin-Settled Derivatives: Forward Contracts</a>
│   ├── hashpuzzlep2pkh.scrypt          # combining <a href="https://scryptdoc.readthedocs.io/en/latest/multipartyhashpuzzles.html">hash puzzle</a> and p2pkh contracts
│   ├── kaggle.scrypt                   # <a href="https://xiaohuiliu.medium.com/machine-learning-marketplace-on-bitcoin-d8eb577be812">Kaggle Competitions on Bitcoin</a>
│   ├── lottery.scrypt                  # <a href="https://xiaohuiliu.medium.com/secure-multiparty-computations-on-bitcoin-953a64843b94">lottery</a>
│   ├── mast.scrypt                     # <a href="https://xiaohuiliu.medium.com/merkelized-abstract-syntax-tree-6a49b2008435">Merklized Abstract Syntax Tree</a>
│   ├── merkleToken.scrypt              # Token based on Merkle Tree
│   ├── merkleTree.scrypt               # <a href="https://medium.com/@xiaohuiliu/scalable-state-storage-in-bsv-smart-contracts-60f9aeb3b1f">Merkle Tree</a> validation and updating
│   ├── nonFungibleToken.scrypt         # <a href="https://medium.com/@xiaohuiliu/non-fungible-tokens-on-bitcoin-sv-4575368f46a">non-fungible token</a>
│   ├── oracle.scrypt                    # <a href="https://xiaohuiliu.medium.com/ecdsa-based-oracles-on-bitcoin-e69d15afe6c5">ECDSA-based Oracles</a>
│   ├── p2pkh.scrypt                    # <a href="https://scryptdoc.readthedocs.io/en/latest/p2pkh.html">p2pkh</a> contract written in sCrypt
│   ├── p2sh.scrypt                     # <a href="https://medium.com/@xiaohuiliu/sun-rising-p2sh-7ebfca9283aa">p2sh after Genesis</a>
│   ├── perceptron.scrypt               # <a href="https://xiaohuiliu.medium.com/ai-on-bitcoin-96bbc97a62b9">AI/perceptron</a>
│   ├── perceptron2.scrypt              # <a href="https://xiaohuiliu.medium.com/how-to-train-ai-using-bitcoin-3a20ef620143">Outsource perceptron training</a>
│   ├── rabin.scrypt                    # <a href="https://medium.com/coinmonks/access-external-data-from-bitcoin-smart-contracts-2ecdc7448c43">Rabin signature</a> to import off-chain data into a contract via oracle
│   ├── recurring.scrypt                # <a href="https://xiaohuiliu.medium.com/patreon-on-bitcoin-4c3626d4ce5">Recurring Payments</a>
│   ├── rpuzzle.scrypt                  # <a href="https://wiki.bitcoinsv.io/index.php/R-Puzzles">R-Puzzle</a>
│   ├── schnorr.scrypt                  # <a href="https://xiaohuiliu.medium.com/schnorr-signatures-on-bitcoin-397ca51d8bda">Schnorr signatures</a>
│   ├── rps.scrypt                      # Rock Paper Scissors
│   ├── simpleBVM.scrypt                # <a href="https://github.com/sCrypt-Inc/boilerplate/pull/57">A simple Bitcoin Script interpreter: a Bitcoin VM inside a BVM </a>
│   ├── spvToken.scrypt                 # <a href="https://medium.com/@xiaohuiliu/peer-to-peer-tokens-6508986d9593">Peer-to-peer Tokens</a>
│   ├── statecounter.scrypt             # <a href="https://medium.com/coinmonks/introducing-stateful-properties-f0f6bce45a06">Stateful Contract</a>
│   ├── stateStruct.scrypt              # Recommended way to implement a stateful contract using struct
│   ├── sudoku.scrypt                   # <a href="https://xiaohuiliu.medium.com/sudoku-on-bitcoin-bd78551956fb">Sudoku</a>
│   ├── svd.scrypt                      # <a href="https://xiaohuiliu.medium.com/machine-learning-on-bitcoin-40f830ad1b43">Machine Learning using Singular Value Decomposition as an example</a>
│   ├── tictactoe.scrypt                # <a href="https://medium.com/@xiaohuiliu/tic-tac-toe-on-bitcoin-sv-5acdf5bd676d">TicTacToe</a> onchain p2p gaming
│   ├── timedcommit.scrypt              # <a href="https://xiaohuiliu.medium.com/bitcoin-smart-contract-2-0-d1e044abed5a">Bitcoin Smart Contract 2.0</a>: Trustless contracting by combining on-chain and off-chain transactions
│   ├── token.scrypt                    # <a href="https://medium.com/coinmonks/layer-1-tokens-on-bitcoin-sv-e78c8abf270d">Layer-1 tokens</a> by storing token map as contract state in a single UTXO
│   ├── tokenSale.scrypt                # Selling tokens for bitcoins using <a href="https://medium.com/@xiaohuiliu/atomic-swap-on-bitcoin-sv-abc28e836cd5">atomic swap</a>
│   ├── tokenSwap.scrypt                # Merkle tree-based token and bitcoin swap <a href="https://powping.com/posts/2ce8261d34d7b7745343678039e1578b86507acad30bc768b8edaf4629560d01">Token swap</a>
│   ├── tokenUtxo.scrypt                # <a href="https://medium.com/@xiaohuiliu/utxo-based-layer-1-tokens-on-bitcoin-sv-f5e86a74c1e1">fungible token</a>
│   ├── treeSig.scrypt                  # <a href="https://xiaohuiliu.medium.com/tree-signatures-8d03a8dd3077">Tree signatures</a>
│   └── util.scrypt                     # utility functions and constants
├── testnet                         # examples to deploy contract and call its function on testnet
    └── fixture
        └── autoGen                     # contract description json files
└── tests                           # contract test files
    ├── js                              # Javascript unit tests
    └── ts                              # Typescript unit tests
</pre>

## How to write test for an sCrypt contract

The major steps to write a sCrypt test are exemplified by `tests/demo.scrypttest.js`.

1. Install and import / require [`scryptlib` libary](https://github.com/sCrypt-Inc/scryptlib), which is a javascript SDK for integrating sCrypt smart contract.

```
npm install scryptlib
```


```javascript
import { buildContractClass } from 'scryptlib';
```


2. Use the imported function `buildContractClass` to get a reflected contract, which has same properties and methods as defined in the specified sCrypt contract.

```javascript
// build a contract class
// either by compiling the contract from scratch
const Demo = buildContractClass(compileContract('demo.scrypt'))
// or from contract desc file if it's already generated from compilation
const Demo = buildContractClass(loadDesc('demo_desc.json'))
```

Note that `demo_desc.json` is the description file name of the compiled contract, which will be generated automatically if you run `npm run watch` and its name follows the rule `$contractName_desc.json`.

1. Initialize the contract.

```javascript
demo = new Demo(4, 7);
```

2. Write tests for the instantiated contract as you would do in Javascript.

```javascript
const result = demo.add(7 + 4).verify()
expect(result.success, result.error).to.be.true
```

## How to run tests locally

### Run using **sCrypt IDE**
Run unit tests file within the editor/explorer context menu.

![Screenshot](https://scrypt-ide.readthedocs.io/en/latest/_images/run_testting.gif)

**Note:** The test files must be suffixed by `.scrypttest.js` or `.scrypttest.ts`, otherwise the "Run sCrypt Test" option would not appear in the menu.

### Run from console
Tests could also be run from the console by executing `npm test`, just like regular Javascript/TypeScript tests.

## How to deploy a contract and interacte with it

### Deploy by writing javascript/typescript code

1. Provide a private key with funds in `privateKey.js`
```javascript
const key = '$YOUR_PRIVATE_KEY_HERE'
```
2. Deploy a contract and call its function by issuing
```bash
node testnet/demo.js
```
Output like the following will appear in the console. And you have successfully deployed a contract and called its function on Bitcoin. Sweet!

```
locking txid:      8d58ff9067f5fa893b5c695179559e108ebf850d0ce4fd1e42bc872417ffd424
unlocking txid:    c60b57e93551a6c52282801130649c6a97edcca5d2b28b8b4ae2afe0ee59bf79
Succeeded on testnet
```
It is **strongly recommended** to test your contract on testnet first, before deploying it on mainnet. By default, deployment is on testnet. To switch to mainnet, simply modify `API_PREFIX` in `helper.js`.
```javascript
const API_PREFIX = 'https://api.whatsonchain.com/v1/bsv/main'
// const API_PREFIX = 'https://api.whatsonchain.com/v1/bsv/test' for Testnet
// const API_PREFIX = 'https://api.whatsonchain.com/v1/bsv/stn' for Scaling Test Net
```
Before deploying a contract, make sure the latest contract has been compiled to a [description json file](https://github.com/scrypt-sv/scryptlib#contract-description-file), which is what will get deployed. This could be done automatically by running a daemon process with command `npm run watch`. It will monitor a contract file's change and recompile it when necessary. All generated description files are located at `testnet/fixture/autoGen`. Make sure it's up to date with the contract before deployment.

### Deploy by using **sCrypt IDE** [deploy feature](https://scrypt-ide.readthedocs.io/en/latest/deploy.html)

IDE provides a universal UI interface. You can deploy the contract with one click by simply filling in the relevant parameters. You can call the public function of the contract with the click of a button without writing a line of code.


![Screenshot](https://scrypt-ide.readthedocs.io/en/latest/_images/deploy_demo.gif)
