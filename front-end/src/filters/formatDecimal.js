export default (v) => {
  if (!v) {
    return v;
  }

  let arry = v.split('');

  let newArry = [];

  let flag = false;

  arry.reverse();

  arry.forEach((x, i) => {
    if (x != 0 && x != '.' || i > arry.indexOf('.')) {
      flag = true;
    }
    if (flag) {
      newArry.push(x);
    }
  });

  return newArry.reverse().join('');
}