interface StringKeyObject {
  [key: string]: string
}

export const blockExplorer: StringKeyObject = {
  // Etherium
  homestead: 'https://etherscan.io',
  goerli: 'https://goerli.etherscan.io/address/',
  //   Matic
  matic: 'https://polygonscan.com/',
  maticmum: 'https://mumbai.polygonscan.com',
  //   BNB
  bnb: 'https://bscscan.com',
  bnbt: 'https://explorer.binance.org/smart-testnet',
}
