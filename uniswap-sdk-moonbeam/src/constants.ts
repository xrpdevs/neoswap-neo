import JSBI from 'jsbi'
import { factory_cos, factory_flr, factory_sgb } from './sgbflr_addresses.json'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 1,
  FLARE = 14,
  COSTON = 16,
  SONGBIRD = 19,
  STANDALONE = 1281,
  MOONROCK = 1286,
  MOONBASE = 1287,
  MOONSHADOW = 1288,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS: { [key: string]: string } = {
  [ChainId.STANDALONE]: '0x5c4242beB94dE30b922f57241f1D02f36e906915',
  [ChainId.MOONROCK]: factory_cos,
  [ChainId.MOONBASE]: factory_cos,
  [ChainId.MOONSHADOW]: factory_cos,
  [ChainId.FLARE]: factory_flr,
  [ChainId.COSTON]: factory_cos,
  [ChainId.SONGBIRD]: factory_sgb
}

export const INIT_CODE_HASH = '0x176916090bebdcbdebbd614f17424e6bacfd8335ca2cece1fe3561c53276f460'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
