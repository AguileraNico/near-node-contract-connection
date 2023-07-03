const nearAPI = require('near-api-js');

const keyPath = './keystore.json';

async function initNear() {
  const privateKey =
    'ed25519:yoPhfgH4hJ4V1mDUvVNn8AacHyHX4xavo69nLgY6dWMiaXQDBgMKdbXG7kkt64Jwd9RoJCmG5iPckXbPDJP3EBg';
  const keyPair = nearAPI.KeyPair.fromString(privateKey);
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  keyStore.setKey('testnet', 'nicoknaq.testnet', keyPair);
  const near = await nearAPI.connect({
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
    keyStore,
  });
  // console.log(near);
  const account = await near.account('nicoknaq.testnet');
  // console.log(account);
  const contract = new nearAPI.Contract(account, 'nicoknaq.testnet', {
    viewMethods: ['is_registered', 'ft_metadata'], // Métodos de lectura del contrato
    changeMethods: ['register_account'], // Métodos de escritura del contrato
  });
  const test = await contract.ft_metadata({});
  console.log(test);
}

initNear();
