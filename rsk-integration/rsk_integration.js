

import Rsk3 from '@rsksmart/rsk3';
const rsk3 = new Rsk3('https://public-node.testnet.rsk.co');
const publicKey = '';
const privateKey = '';
const toAddress = '';

const accountInfo = await rsk3.accounts.privateKeyToAccount(privateKey);
const nonce = await rsk3.getTransactionCount(publicKey);
const chainId = await rsk3.net.getId();
const gasPrice = await rsk3.getGasPrice();

// 1. Construct rawTransaction object to get gas estimate; note that estimateGas's parameter object can not include chainId
const value = new BigNumber(10).exponentiatedBy(15); // 10^15 wei

const rawTransaction = {
    from: publicKey,
    to: toAddress,
    value: Rsk3.utils.toHex(value.toNumber()),
    nonce: Rsk3.utils.toHex(nonce),
    gasPrice,
    data: '',
};

const gas = await rsk3.estimateGas(rawTransaction);

// 2. Add both chainId and gas to rawTransaction object
_.extend(rawTransaction, { chainId, gas });

// 3. Sign the rawTransaction with a specific private key
const signedTransaction = await accountInfo.signTransaction(rawTransaction, privateKey);

// 4. Send the signed transaction and use event emitter to capture response
await new Promise((resolve, reject) => {
    rsk3.sendSignedTransaction(signedTransaction.rawTransaction)
    .on('transactionHash', (hash) => {
        console.log('Get Transaction Hash: unconfirmed.', hash);
        return resolve();
    })
    .on('receipt', (receipt) => {
        console.log('receipt', receipt);
        return resolve();
    })
    .on('confirmation', (confirmationNumber, receipt) => {
        console.log('Get Transaction Hash: confirmation No.: ', confirmationNumber, ', receipt', receipt);
        return resolve();
    })
    .on('error', (error) => {
        console.error('error', error);
        return reject();
    });
});