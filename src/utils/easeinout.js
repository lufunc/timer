const easeIn = (curtime,begin,end,duration) => {
  let x = curtime/duration;
  let y = x*x;
  return begin+(end-begin)*y;
}

const easeOut = (curtime,begin,end,duration) => {
  let x = curtime/duration;
  let y = -x*x + 2*x;
  return begin+(end-begin)*y;
}

const easeInout = (curtime,begin,end,duration) => {
  if(curtime<duration/2){
    return easeIn(curtime,begin,(begin+end)/2,duration/2);
  }else{
    let curtime1 = curtime-duration/2;
    let begin1 = (begin+end)/2;
    return easeOut(curtime1,begin1,end,duration/2);
  }
}

export default easeInout