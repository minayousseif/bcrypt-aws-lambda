// Bcrypt Handler Example
const action = require('../src/actionEnum');
const BcryptLambdaHandler = require('../src/index').LambdaHandler;

const baalHandler = new BcryptLambdaHandler();

//compare a password and a hash
const benchmarkHashReq = () => {
  const hashReq = {
    id: 'fe296b08f88578239562bea022781df6', 
    action: action.HASH, 
    password: 'MyPassW0rd!'
  }
  console.time("Hash Execution time");
  baalHandler.process(hashReq).then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    console.timeEnd("Hash Execution time");
  });
}

//compare a password and a hash
const benchmarkCompareReq = () => {
  const compareReq = { 
    id: 'fe296b08f88578239562bea022781df6', 
    action: action.COMPARE, 
    password: 'MyPassW0rd!', 
    hash: '$2b$10$BCipMrfM9mKBjUD9zkvGNeRRXsrCtREMonPBliqAOBSB4bkcMEnYG'
  };
  console.time("Compare Execution time");
  baalHandler.process(compareReq).then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    console.timeEnd("Compare Execution time");
  });
};

benchmarkHashReq();
benchmarkCompareReq();