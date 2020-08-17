import { ProxyInstance } from 'types'
import { stripMetadataIfPresent } from '@celo/protocol/lib/compatibility/ast-code'
import fs = require('fs')
const VM = require('ethereumjs-vm').default
const BN = require('bn.js')

const vm = new VM()

const argv = require('minimist')(process.argv.slice(2))

const contractsDir = argv.build_directory + '/contracts'

const truffle = require('@celo/protocol/truffle-config.js')
const network = truffle.networks[argv.network]

// Returns an array of [Contract, Proxy] pairs for contracts that have a corresponding proxy
function getProxiedContracts() {
  const contractNameFromProxyFilename = (proxyFilename: string) => {
    return proxyFilename.slice(0, -'Proxy.json'.length)
  }

  let names = []
  if (argv.contract) {
    names.push(argv.contract)
  } else {
    names = fs
      .readdirSync(contractsDir)
      .filter((filename: string) => /\w+Proxy.json$/.test(filename))
      .map(contractNameFromProxyFilename)
  }

  return names.map((contractName: string) => {
    // tslint:disable-next-line:no-console
    console.log('Reading artifact for', contractName)
    return [
      artifacts.require(contractName) as Truffle.Contract<any>,
      artifacts.require(contractName + 'Proxy') as Truffle.Contract<ProxyInstance>,
    ]
  })
}

function fill(a: string) {
  return new RegExp(('__' + a).padEnd(40, '_'), 'g')
}

function linkBytecode(Contract: Truffle.Contract<any>) {
  // @ts-ignore
  const artifact = Contract._json
  const data = artifact.networks[network.network_id].links
  let code: string = artifact.bytecode.slice(2)
  for (const a of Object.keys(data)) {
    code = code.replace(fill(a), data[a].slice(2))
  }
  return code.toLowerCase()
}

/*
 * When deploying a smart contract to an Ethereum network, one sends EVM
 * bytecode that, when run, returns the bytecode that will actually live on the
 * blockchain. Build artifacts store that initial bytecode.
 * This function returns the bytecode that would be stored on the blockchain if
 * Contract were deployed.
 */
async function getCompiledBytecode(Contract: Truffle.Contract<any>): Promise<string> {
  const res = await vm.runCode({
    code: Buffer.from(linkBytecode(Contract), 'hex'),
    gasLimit: new BN('0xfffffffff'),
  })
  return res.returnValue.toString('hex')
}

async function getImplementationBytecode(proxy: ProxyInstance) {
  const implementationAddress = await proxy._getImplementation()
  const res = await web3.eth.getCode(implementationAddress)
  return res.slice(2)
}

async function needsUpgrade(Contract: Truffle.Contract<any>, proxy: ProxyInstance) {
  const implementationBytecode = stripMetadataIfPresent(await getImplementationBytecode(proxy))
  const compiledBytecode = stripMetadataIfPresent(await getCompiledBytecode(Contract))
  const res = implementationBytecode !== compiledBytecode
  if (!res) {
    console.info(`Hasn't changed ${Contract.contractName}`)
  }
  return res
}

module.exports = async (callback: (error?: any) => number) => {
  try {
    const proxiedContracts = getProxiedContracts()
    const contractNeedsUpgrade = await Promise.all(
      proxiedContracts.map(
        async ([Contract, Proxy]: [Truffle.Contract<any>, Truffle.Contract<ProxyInstance>]) => {
          if (argv['force-upgrade']) {
            return true
          }
          try {
            const proxy = await Proxy.deployed()
            const res = await needsUpgrade(Contract, proxy)
            return res
          } catch (err) {
            console.error('Not upgrading', Contract.contractName, err)
            return false
          }
        }
      )
    )
    if (contractNeedsUpgrade.some((x) => x)) {
      const contractsToUpgrade = proxiedContracts.filter(
        ([_Contract, _Proxy], i) => contractNeedsUpgrade[i]
      )
      const contractNames = contractsToUpgrade
        .map(([Contract, _Proxy]) => Contract.contractName)
        .join('\n')
      // tslint:disable-next-line:no-console
      console.log('The following contracts need upgrading:')
      // tslint:disable-next-line:no-console
      console.log(contractNames)
    } else {
      // tslint:disable-next-line:no-console
      console.log('All contracts up to date')
    }

    callback()
  } catch (error) {
    callback(error)
  }
}