const bcrypt = require('bcrypt');
const Ajv    = require('ajv');
const Action = require('./actionEnum');
const schema = require('../json-schema/request.json');

class BcryptLambdaHandler {
  
  constructor(options = {}) {
    this.rounds   = options.rounds || 10;
    this.ajv      = new Ajv();
    this.validate = this.ajv.compile(schema);
  }

  async process (request) {
    const result = { success: false };
    if (!request || typeof request !== 'object') {
      return {
        ...result, 
        error: 'The request must be an object'
      }
    }
    try {
      const valid = this.validate(request);
      if (valid) {
        result.uuid = request.id;
        if (request.action === Action.HASH) {
          const saltRounds = request.rounds || this.rounds;
          result.hash    = bcrypt.hashSync(request.password, saltRounds);
          result.success = true;
        } else if (request.action === Action.COMPARE){
          result.success = bcrypt.compareSync(request.password, request.hash);
        }
      } else {
        result.error = this.ajv.errorsText(
          this.validate.errors, 
          {dataVar: 'request'}
        ) 
      }
    } catch (err) {
      result.error = err;
    }
    return result;
  }
}

module.exports = BcryptLambdaHandler;