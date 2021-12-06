To use this in React-Native
https://developers.rsk.co/libraries/rsk3js/docs/rsk3-react-native/

How to convert Btc to rBtc //https://developers.rsk.co/rsk/rbtc/conversion/networks/testnet/

1. Lo primero es saber cual es la federation address en Btc. Para eso se debe llamar la operacion getFederationAddress en el siguiente contrato de RSK:

{
   "name": "Bridge",
  "address": "0x0000000000000000000000000000000001000006",
  "abi": "[{ \"name\": \"getFederationAddress\", \"type\": \"function\", \"constant\": true, \"inputs\": [], \"outputs\": [{ \"name\": \"\", \"type\": \"string\" }] }]"
 }
https://github.com/MyCryptoHQ/MyCrypto/blob/master/src/database/data/contracts/rsk_testnet.json

2. Enviar Btc a la federation address. minimum amount of 0.01 tBTC for conversion

3. Obtener la direccion de rBTC utilizando rsk-conversion-utils (se ejecuta en el browser)

Tomado de: https://github.com/rsksmart/utils/blob/master/rsk-conversion-utils.js

4. Mirar que el balance aparezca en la direccion de rBTC.


Create community bank account:

Enviar a multisig wallet en RSK. Smart contract tomado de: https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWallet.sol

De allí utilizar qredo, tropikus o sovryn para depositar y generar yield.
