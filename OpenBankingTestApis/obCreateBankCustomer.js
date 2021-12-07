//var Client = require('bitcore-wallet-client');
//var utils = require('./cli-utils');
//var FileStorage = require('./filestorage');
//const fetch = require('node-fetch');
const fetch = require('sync-fetch')
var obAuth = require('./obAuth');

function send(token,bank_id,datosCustomer) {
    var urlbase;
    var urlvariable;
    urlbase="https://obp-apisandbox.bancohipotecario.com.sv/"
    urlvariable = "obp/v4.0.0/banks/"+bank_id+"/customers";
    var ItemJSON;
    return fetch(urlbase+urlvariable, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'DirectLogin token='+token
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(datosCustomer) // body data type must match "Content-Type" header
    }).json();
  }

var bank_id = 'tlan3'
var datosCustomer = '{"legal_name":"Camilo Tripman","mobile_phone_number":"+44 05656 788 998","email":"fdddd@example.com","face_image":{"url":"www.tla.co.sv","date":"2019-09-19T00:00:00Z"},"date_of_birth":"2019-09-19T00:00:00Z","relationship_status":"single","dependants":1,"dob_of_dependants":["2017-09-19T00:00:00Z"],"credit_rating":{"rating":"1","source":"TLA"},"credit_limit":{"currency":"USD","amount":"0"},"highest_education_attained":"School","employment_status":"worker","kyc_status":true,"last_ok_date":"2019-09-19T00:00:00Z","title":"Ms.","branch_id":"DERBY6","name_suffix":"Mdme"}';
var token = obAuth.auth()
var resp = send(token['token'],bank_id,datosCustomer);
console.log(resp);

