const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const DIGEST_STRING = 'hex';

function generateDigestCryptoHash(hash, data) {
  return hash.update(data).digest(DIGEST_STRING);
}

module.exports.deterministicPartitionKey = (input) => {
  
  if(!input) return TRIVIAL_PARTITION_KEY;

  const hash = crypto.createHash('sha3-512');

  let candidate;
  if (input.partitionKey) {
    candidate = input.partitionKey;
  } else {
    const data = JSON.stringify(input);
    candidate = generateDigestCryptoHash(hash, data);
  }
  
  if(!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }
  
  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateDigestCryptoHash(hash, candidate);
  }
  
  return candidate;
};

