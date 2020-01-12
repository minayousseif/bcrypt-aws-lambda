// Bcrypt Handler Example
const action = require('./src/action');
const BcryptLambdaHandler = require('./index').LambdaHandler;

const baalHandler = new BcryptLambdaHandler();

//compare a password and a hash
const hashReq = {
  id: 'fe296b08f88578239562bea022781df6', 
  action: action.HASH, 
  password: 'MyPassW0rd!'
}
const hrstart = process.hrtime();
baalHandler.process(hashReq).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});

//compare a password and a hash

const compareReq = { 
  id: 'fe296b08f88578239562bea022781df6', 
  action: action.COMPARE, 
  password: 'MyPassW0rd!', 
  hash: '$2b$10$BCipMrfM9mKBjUD9zkvGNeRRXsrCtREMonPBliqAOBSB4bkcMEnYG'
};

baalHandler.process(compareReq).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});