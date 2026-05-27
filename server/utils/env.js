
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const reset = '\x1b[0m';

const time = new Date();

function devLog (message, env) {
 console.log('given env : ',env)
 if(env == 'DEV'){
  console.log(`${yellow}[DEV] [LOG] ${time} ${reset} ${message}`)
 };
}

export default devLog;
