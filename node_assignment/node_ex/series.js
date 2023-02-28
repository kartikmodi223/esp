
const number = prompt('enter num');
let n1 = 0, n2 = 1, nextTerm;

console.log('Fibonacci Series:');
console.log(n1);
console.log(n2); 

nextnum = n1 + n2;

while (nextnum <= number) {

   
    console.log(nextnum);

    n1 = n2;
    n2 = nextnum;
    nextnum = n1 + n2;
}


const k1 = prompt('enter first num');
const k2 = prompt('enter second num');
for (let i = k1; i <= k2; i++) {
  let flag = 0;


  for (let j = 2; j < i; j++) {
      if (i % j == 0) {
          flag = 1;
          break;
      }
  }

  if (i > 1 && flag == 0) {
      console.log(i);
  }
}

const k3 = prompt('enter first num');
const k4 = prompt('enter second num');
for (let i = k1; i <= k2; i++) {
  let flag = 0;


  for (let j = 1; j < i; j++) {
      if (i%2 == 0) {
          flag = 1;
          console.log(i);
      break;
      }
  }
}


const k5 = prompt('enter first num');
const k6 = prompt('enter second num');
for (let i = k1; i <= k2; i++) {
  let flag = 0;


  for (let j = 0; j < i; j++) {
      if (i%2!= 0) {
          flag = 1;
          console.log(i);
      break;
      }
  }
}
