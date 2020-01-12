const request = require('request');
const Ajv     = require('ajv');
const action  = require('./actionEnum');
const schema  = require('../json-schema/request.json');

class BcryptLambdaClient {
  constructor(options={}) {
    this.ajv         = new Ajv();
    this.validate    = this.ajv.compile(schema);
    this.baseRequest = request.defaults({
      method: 'POST',
      baseUrl: options.url,
      strictSSL: true,
      json: true,
      gzip: options.gzip || false
    });
  }

  async hash(options) {
    const response = {};
    const params = {
      id: options.id,
      password: options.password,
      action: action.HASH
    };
    
    try {
      const valid = this.validate(params);
      if (!valid) { 

      }

      if (options.rounds) {
        params.rounds = options.rounds;
      }
  
      this.baseRequest({ body: params }, (err, resp, body) => {
        
      });

    } catch (err) {
      response.error = err;
    }

    return response;
  }

  async compare(options) {
    const response = {};
    const params = {
      id: options.id,
      password: options.password,
      hash: options.hash,
      action: action.COMPARE
    };

    try {
      const valid = this.validate(params);
      if (!valid) { 
        
      }

      this.baseRequest({ body: params }, (err, resp, body) => {

      });

    } catch (err) {
      response.error = err;
    }

    return response;
  }
}

module.exports = BcryptLambdaClient;
