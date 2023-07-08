const CryptoJS = require('crypto-js');

const dotenv = require('dotenv');
dotenv.config();


// Convert data into an encrypted string
function encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_KEY).toString();
}

// Turn the encrypted data back into an object.
function decrypt(data) {
    const decryptBytes = CryptoJS.AES.decrypt(data, process.env.CRYPTO_KEY);
    const decryptedString = decryptBytes.toString(CryptoJS.enc.Utf8);

    // Remove leading and trailing quotation marks
    const processedString = decryptedString.replace(/^"(.*)"$/, '$1');

    return processedString;
}


module.exports = {
    encrypt, decrypt
}