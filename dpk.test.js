
const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

describe("deterministicPartitionKey", () => {
  
  describe(('given no input given'), () => {
    it('should return the literal "0"', () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe('0');
    });
  });
  
  describe(('given an empty object input'), () => {
    it("should return the literal hash for empty object", () => {
      const trivialKey = deterministicPartitionKey({});
      let hash = crypto.createHash("sha3-512").update('{}').digest('hex');
      expect(trivialKey).toBe(hash);
    });
  });

  describe(('given an simple object input'), () => {
    it("should return the literal hash for the same object", () => {
      const trivialKey = deterministicPartitionKey({
        test: 123
      });
      let hash = crypto.createHash("sha3-512").update('{"test":123}').digest('hex');
      expect(trivialKey).toBe(hash);
    });
  });  

  describe(('given partition key 1 as the input'), () => {
    it("should return the 1", () => {
      const trivialKey = deterministicPartitionKey({ partitionKey: "1" });
      expect(trivialKey).toBe("1");
    });
  });
  
});
