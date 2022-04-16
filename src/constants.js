export const NETWORK_ID = 97; // Testnet
export const NETWORK_ID_ALTERNATIVE = 0x61; // Testnet

// export const NETWORK_ID = 56; // Main
// export const NETWORK_ID_ALTERNATIVE = 0x38; // Main

// ERC20
export const DAI_ADDRESS = "0x8a9424745056eb399fd19a0ec26a14316684e274"; // Testnet
// export const DAI_ADDRESS = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3"; // Main

// export const CONTRACT_URI = 'https://bscscan.com/address/0x18f7B5aB35B2f23Ccb18FA3833E73eAAfA57b400';
export const CONTRACT_URI = 'https://testnet.bscscan.com/address/0x04704444c1cfC5Eed260CD04ab20F456b0d8cF54';

// Contracts
export const COMMUNITYDAO_ADDRESS = "0x04704444c1cfC5Eed260CD04ab20F456b0d8cF54"; // Testnet
// export const COMMUNITYDAO_ADDRESS = "0x18f7B5aB35B2f23Ccb18FA3833E73eAAfA57b400"; // Main

export const CHAIN_INDEX = 0; // 0 Testnet - 1 main

export const CHAIN_LIST = [
    {
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency:
        {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
    {
        chainId: '0x38',
        chainName: 'Binance Smart Chain Main',
        nativeCurrency:
        {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
    }
]