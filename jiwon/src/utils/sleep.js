/**
 * 애니메이션을 위한 시간텀을 주게하는 sleep함수
 */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default sleep;