// NOTE: Is intended to be used inside a lambda function for for testing purposes.
const action = require('./src/actionEnum');
const BcryptLambdaHandler = require('./src/index').LambdaHandler;

/**
 * Demonstrates a simple lambda handler using the Bcrypt Lambda handler.
*/

const baalHandler = new BcryptLambdaHandler();

exports.handler = async (event, context) => {
  const hashReq = {
    id: 'fe296b08f88578239562bea022781df6', 
    action: action.HASH, 
    password: 'MyPassW0rd!'
  }
  return baalHandler.process(hashReq).then(res => {
    return res;
  }).catch(err => {
    return err;
  });
};
