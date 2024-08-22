export function RandomCalc() {
  var a = Math.floor(Math.random() * 10) + 1;
  var b = Math.floor(Math.random() * 10) + 1;
  var op = ["*", "+", "-"][Math.floor(Math.random() * 3)];

  let obj = { num1: a, num2: b, op: op };
  return obj;
}
