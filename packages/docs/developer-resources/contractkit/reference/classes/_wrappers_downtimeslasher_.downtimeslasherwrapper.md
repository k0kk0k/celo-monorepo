# Class: DowntimeSlasherWrapper

Contract handling slashing for Validator downtime using intervals.

## Hierarchy

* [BaseWrapper](_wrappers_basewrapper_.basewrapper.md)‹DowntimeSlasher›

  ↳ **DowntimeSlasherWrapper**

## Index

### Constructors

* [constructor](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#constructor)

### Properties

* [eventTypes](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#eventtypes)
* [events](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#events)
* [getBitmapForInterval](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#getbitmapforinterval)
* [isBitmapSetForInterval](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#isbitmapsetforinterval)
* [methodIds](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#methodids)
* [setBitmapForInterval](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#setbitmapforinterval)
* [slashableDowntime](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#slashabledowntime)
* [slashingIncentives](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#slashingincentives)
* [wasDownForInterval](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#wasdownforinterval)
* [wasDownForIntervals](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#wasdownforintervals)

### Accessors

* [address](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#address)

### Methods

* [getConfig](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#getconfig)
* [getHumanReadableConfig](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#gethumanreadableconfig)
* [getPastEvents](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#getpastevents)
* [getValidatorSignerIndex](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#getvalidatorsignerindex)
* [slashStartSignerIndex](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#slashstartsignerindex)
* [slashValidator](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#slashvalidator)
* [wasValidatorDown](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#wasvalidatordown)
* [wasValidatorDownForInterval](_wrappers_downtimeslasher_.downtimeslasherwrapper.md#wasvalidatordownforinterval)

## Constructors

###  constructor

\+ **new DowntimeSlasherWrapper**(`kit`: [ContractKit](_kit_.contractkit.md), `contract`: DowntimeSlasher): *[DowntimeSlasherWrapper](_wrappers_downtimeslasher_.downtimeslasherwrapper.md)*

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[constructor](_wrappers_basewrapper_.basewrapper.md#constructor)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:26](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`kit` | [ContractKit](_kit_.contractkit.md) |
`contract` | DowntimeSlasher |

**Returns:** *[DowntimeSlasherWrapper](_wrappers_downtimeslasher_.downtimeslasherwrapper.md)*

## Properties

###  eventTypes

• **eventTypes**: *object* = Object.keys(this.events).reduce<EventsEnum<T>>(
    (acc, key) => ({ ...acc, [key]: key }),
    {} as any
  )

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[eventTypes](_wrappers_basewrapper_.basewrapper.md#eventtypes)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:42](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L42)*

#### Type declaration:

___

###  events

• **events**: *DowntimeSlasher["events"]* = this.contract.events

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[events](_wrappers_basewrapper_.basewrapper.md#events)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:40](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L40)*

___

###  getBitmapForInterval

• **getBitmapForInterval**: *function* = proxyCall(
    this.contract.methods.getBitmapForInterval,
    undefined,
    solidityBytesToString
  )

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:100](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L100)*

Calculates and returns the signature bitmap for the specified interval.
Similar to the parentSealBitmap of every block (where you have which validators were
able to sign the previous block), this bitmap shows for that specific interval which
validators signed at least one block

**`param`** First block of the interval.

**`param`** Last block of the interval.

**`returns`** (string) The signature uptime bitmap for the specified interval.

**`dev`** startBlock and endBlock must be in the same epoch.

**`dev`** The getParentSealBitmap precompile requires that startBlock must be within 4 epochs of
the current block.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  isBitmapSetForInterval

• **isBitmapSetForInterval**: *function* = proxyCall(this.contract.methods.isBitmapSetForInterval)

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:123](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L123)*

Shows if the user already called the `setBitmapForInterval` for
the specific interval.

**`param`** First block of a calculated downtime interval.

**`param`** Last block of the calculated downtime interval.

**`returns`** True if the user already called the `setBitmapForInterval` for
the specific interval.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  methodIds

• **methodIds**: *object* = Object.keys(this.contract.methods).reduce<Record<Methods<T>, string>>(
    (acc, method: Methods<T>) => {
      const methodABI = this.contract.options.jsonInterface.find((item) => item.name === method)

      acc[method] =
        methodABI === undefined ? '0x' : this.kit.web3.eth.abi.encodeFunctionSignature(methodABI)

      return acc
    },
    {} as any
  )

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[methodIds](_wrappers_basewrapper_.basewrapper.md#methodids)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:47](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L47)*

#### Type declaration:

___

###  setBitmapForInterval

• **setBitmapForInterval**: *function* = proxySend(this.kit, this.contract.methods.setBitmapForInterval)

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:113](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L113)*

Calculates and sets the signature bitmap for the specified interval.

**`param`** First block of the interval.

**`param`** Last block of the interval.

**`returns`** The signature bitmap for the specified interval.

**`dev`** startBlock and endBlock must be in the same epoch.

#### Type declaration:

▸ (...`args`: InputArgs): *[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  slashableDowntime

• **slashableDowntime**: *function* = proxyCall(this.contract.methods.slashableDowntime, undefined, valueToInt)

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:53](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L53)*

Returns slashable downtime in blocks.

**`returns`** The number of consecutive blocks before a Validator missing from IBFT consensus
can be slashed.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  slashingIncentives

• **slashingIncentives**: *function* = proxyCall(this.contract.methods.slashingIncentives, undefined, (res): {
    reward: BigNumber
    penalty: BigNumber
  } => ({
    reward: valueToBigNumber(res.reward),
    penalty: valueToBigNumber(res.penalty),
  }))

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:40](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L40)*

Returns slashing incentives.

**`returns`** Rewards and penalties for slashing.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  wasDownForInterval

• **wasDownForInterval**: *function* = proxyCall(this.contract.methods.wasDownForInterval)

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:86](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L86)*

Check if a validator appears down in the bitmap for the interval of blocks.
Both startBlock and endBlock should be part of the same epoch.

**`param`** First block of the interval.

**`param`** Last block of the interval.

**`param`** Index of the signer within the validator set.

**`returns`** True if the validator does not appear in the bitmap of the interval.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  wasDownForIntervals

• **wasDownForIntervals**: *function* = proxyCall(this.contract.methods.wasDownForIntervals)

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:153](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L153)*

Returns true if the validator did not sign any blocks for the specified overlapping or adjacent
intervals.

**`param`** A list of interval start blocks for which signature bitmaps have already
been set.

**`param`** A list of interval end blocks for which signature bitmaps have already
been set.

**`param`** Indices of the signer within the validator set for every epoch change.

**`returns`** True if the validator signature does not appear in any block within the window.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

## Accessors

###  address

• **get address**(): *string*

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[address](_wrappers_basewrapper_.basewrapper.md#address)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:30](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L30)*

Contract address

**Returns:** *string*

## Methods

###  getConfig

▸ **getConfig**(): *Promise‹[DowntimeSlasherConfig](../interfaces/_wrappers_downtimeslasher_.downtimeslasherconfig.md)›*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:58](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L58)*

Returns current configuration parameters.

**Returns:** *Promise‹[DowntimeSlasherConfig](../interfaces/_wrappers_downtimeslasher_.downtimeslasherconfig.md)›*

___

###  getHumanReadableConfig

▸ **getHumanReadableConfig**(): *Promise‹object›*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:70](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L70)*

**`dev`** Returns human readable configuration of the downtime slasher contract

**Returns:** *Promise‹object›*

DowntimeSlasherConfig object

___

###  getPastEvents

▸ **getPastEvents**(`event`: Events‹DowntimeSlasher›, `options`: PastEventOptions): *Promise‹EventLog[]›*

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[getPastEvents](_wrappers_basewrapper_.basewrapper.md#getpastevents)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:36](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L36)*

Contract getPastEvents

**Parameters:**

Name | Type |
------ | ------ |
`event` | Events‹DowntimeSlasher› |
`options` | PastEventOptions |

**Returns:** *Promise‹EventLog[]›*

___

###  getValidatorSignerIndex

▸ **getValidatorSignerIndex**(`validatorOrSignerAddress`: [Address](../modules/_base_.md#address), `blockNumber`: number): *Promise‹number›*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:192](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L192)*

Determines the validator signer given an account or signer address and block number.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validatorOrSignerAddress` | [Address](../modules/_base_.md#address) | Address of the validator account or signer. |
`blockNumber` | number | Block at which to determine the signer index.  |

**Returns:** *Promise‹number›*

___

###  slashStartSignerIndex

▸ **slashStartSignerIndex**(`startSignerIndex`: number, `startBlocks`: number[], `endBlocks`: number[]): *Promise‹[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹void››*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:245](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L245)*

Returns true if the validator did not sign any blocks for the specified overlapping or adjacent
intervals.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`startSignerIndex` | number | Validator index at the first block. |
`startBlocks` | number[] | A list of interval start blocks for which signature bitmaps have already been set. |
`endBlocks` | number[] | A list of interval end blocks for which signature bitmaps have already been set.  |

**Returns:** *Promise‹[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹void››*

___

###  slashValidator

▸ **slashValidator**(`validatorOrSignerAddress`: [Address](../modules/_base_.md#address), `startBlocks`: number[], `endBlocks`: number[]): *Promise‹[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹void››*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:219](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L219)*

Returns true if the validator did not sign any blocks for the specified overlapping or adjacent
intervals.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validatorOrSignerAddress` | [Address](../modules/_base_.md#address) | Address of the validator account or signer. |
`startBlocks` | number[] | A list of interval start blocks for which signature bitmaps have already been set. |
`endBlocks` | number[] | A list of interval end blocks for which signature bitmaps have already been set.  |

**Returns:** *Promise‹[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹void››*

___

###  wasValidatorDown

▸ **wasValidatorDown**(`validatorOrSignerAddress`: [Address](../modules/_base_.md#address), `startBlocks`: number[], `endBlocks`: number[]): *Promise‹boolean›*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:165](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L165)*

Returns true if the validator did not sign any blocks for the specified overlapping or adjacent
intervals.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validatorOrSignerAddress` | [Address](../modules/_base_.md#address) | Address of the validator account or signer. |
`startBlocks` | number[] | A list of interval start blocks for which signature bitmaps have already been set. |
`endBlocks` | number[] | A list of interval end blocks for which signature bitmaps have already been set. |

**Returns:** *Promise‹boolean›*

True if the validator signature does not appear in any block within the window.

___

###  wasValidatorDownForInterval

▸ **wasValidatorDownForInterval**(`validatorOrSignerAddress`: [Address](../modules/_base_.md#address), `startBlock`: number, `endBlock`: number): *Promise‹boolean›*

*Defined in [packages/contractkit/src/wrappers/DowntimeSlasher.ts:131](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/DowntimeSlasher.ts#L131)*

Tests if the given validator or signer did not sign any blocks in the interval.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`validatorOrSignerAddress` | [Address](../modules/_base_.md#address) | Address of the validator account or signer. |
`startBlock` | number | First block of the interval. |
`endBlock` | number | Last block of the interval.  |

**Returns:** *Promise‹boolean›*
