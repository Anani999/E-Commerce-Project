export function devAction (func){
 return () => func();
};

export function devLog(log){
 console.log(`[DEV] [LOG] : ${log}`);
};

export default devLog;
