export interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
}

export const ETHERIUM_CHAIN_ID = '0x1'
export const GOERLI_CHAIN_ID = '0x5'
export const MATIC_CHAIN_ID = '0x89'
export const MATIC_TEST_CHAIN_ID = '0x13881'
export const BNB_CHAIN_ID = '0x38'
export const BNB_TEST_CHAIN_ID = '0x61'

const BnbMain = {
  chainId: BNB_CHAIN_ID,
  chainName: 'Binance Smart Chain Mainnet',
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-dataseed4.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.ninicoin.io',
    'https://bsc-dataseed3.ninicoin.io',
    'https://bsc-dataseed4.ninicoin.io',
    'wss://bsc-ws-node.nariox.org',
    'https://bsc-dataseed.binance.org',
    'https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3',
    'https://rpc.ankr.com/bsc',
    'https://bscrpc.com',
    'https://bsc.mytokenpocket.vip',
    'https://binance.nodereal.io',
    'https://rpc-bsc.bnb48.club',
    'https://bscapi.terminet.io/rpc',
    'https://1rpc.io/bnb',
    'https://bsc-mainnet.rpcfast.com',
    'https://bsc-mainnet.rpcfast.com?api_key=S3X5aFCCW9MobqVatVZX93fMtWCzff0MfRj9pvjGKSiX5Nas7hz33HwwlrT5tXRM',
  ],
  blockExplorerUrls: ['https://bscscan.com'],
}

const BnbTest = {
  chainId: BNB_TEST_CHAIN_ID,
  chainName: 'Binance Smart Chain Testnet',
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: [
    'https://rpc.ankr.com/bsc_testnet_chapel',
    'https://data-seed-prebsc-1-s1.binance.org:8545',
  ],
  blockExplorerUrls: [
    'https://testnet.bscscan.com',
    'https://explorer.binance.org/smart-testnet',
  ],
}

const GoerliTest = {
  chainId: GOERLI_CHAIN_ID,
  chainName: 'Ethereum Testnet Görli',
  nativeCurrency: {
    name: 'Görli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [
    'https://goerli.infura.io/v3/${INFURA_API_KEY}',
    'wss://goerli.infura.io/v3/${INFURA_API_KEY}',
    'https://rpc.goerli.mudit.blog/',
  ],
  blockExplorerUrls: ['https://goerli.etherscan.io'],
}

const PolygonTest = {
  chainId: MATIC_TEST_CHAIN_ID,
  chainName: 'Polygon Testnet Mumbai',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: [
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com',
  ],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
}
const PolygonMain = {
  chainId: MATIC_CHAIN_ID, // A 0x-prefixed hexadecimal string
  chainName: 'Matic(Poygon) Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC', // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
}

const EtheriumMain = {
  chainId: ETHERIUM_CHAIN_ID,
  chainName: 'Ethereum Mainnet',
  rpcUrls: ['https://api.mycryptoapi.com/eth', 'https://cloudflare-eth.com'],
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
}

export const CHAIN_LIST = {
  [MATIC_CHAIN_ID]: PolygonMain,
  [ETHERIUM_CHAIN_ID]: EtheriumMain,
  [GOERLI_CHAIN_ID]: GoerliTest,
  [MATIC_TEST_CHAIN_ID]: PolygonTest,
  [BNB_CHAIN_ID]: BnbMain,
  [BNB_TEST_CHAIN_ID]: BnbTest,
}
