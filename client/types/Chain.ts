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
}
