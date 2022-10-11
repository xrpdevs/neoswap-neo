/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');

// Change private keys accordingly - ONLY FOR DEMOSTRATION PURPOSES - PLEASE STORE PRIVATE KEYS IN A SAFE PLACE
// Export your private key as
//       export PRIVKEY=0x.....
const privateKey = process.env.PRIVOORT;
const privateKeyDev =
    '0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342';

const sgb_pk = privateKey;
const test_pk = privateKey;
const flr_pk = privateKey;

module.exports = {
    defaultNetwork: 'hardhat',

    networks: {
        hardhat: {},
        sgb: {
            url: 'https://rpc.sgbftso.com/http',
            accounts: [sgb_pk],
            chainId: 19,
        },
        test: {
            url: 'https://rpc.sgbftso.com/testhttp',
            accounts: [test_pk],
            chainId: 16,
        },
        flr: {
            url: 'https://flare-api.flare.network/ext/bc/C/rpc',
            accounts: [flr_pk],
            chainId: 14,
        },
    },
        solidity: {
            compilers: [
                {
                    version: '0.5.16',
                    settings: {
                        optimizer: {
                            enabled: true,
                            runs: 200,
                        },
                    },
                },
                {
                    version: '0.6.6',
                    settings: {
                        optimizer: {
                            enabled: true,
                            runs: 200,
                        },
                    },
                },
            ],
        },
        paths: {
            sources: './contracts',
            cache: './cache',
            artifacts: './artifacts',
        },
        mocha: {
            timeout: 20000,
        },
    }

