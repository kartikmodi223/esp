
// var fs = require('fs');


// fs.writeFile('kartik.txt', 'Hello nodejs kartik here!', function (err) {
//   if (err) throw err;
//   // console.log('Saved!');
// });


// fs.appendFile('kartik.txt', 'Hello kartik !', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });


// fs.readFile('kartik.txt', 'utf-8', function (err, kartik) {
//   if (err) throw err;
//   console.log(kartik) ;
// });


// fs.unlink('kartik.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });



// fs.rename('kartikmodi.txt', 'kartik.txt', function (err) {
//   if (err) throw err;
//   console.log('File Renamed!');
// });



// var k = fs.readFileSync('kartik.txt');
// var k1 = k.indexOf("nodejs");
// console.log(k1);
// var k2 = k.slice(2, 15);
// console.log(k2.toString());

    //  console.log(k2.substring(3, 7));
// function addDays (days, date = new Date()) {  
//   date.setDate(date.getDate() + days)

//   return date
// }
//   consol.log(addDays(10,getDate()));



// var k = fs.readFileSync('kartik.txt');
// const arr = k.split(" ");

// for (var i = 0; i < arr.length; i++) {
//     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

// const str2 = arr.join(" ");
// console.log(str2);
// }






const prompt = require('prompt-sync')();

 function add_days(user_date)
{
    var date =  new Date(user_date);
    date.setDate(date.getDate()+10);
    return date.toString();
}
 const u_input = prompt('enter date(yyyy-mm-dd)');
 var result = add_days(u_input);
 console.log(result);









// let day=["sunday","monday","tuesday","wendsday","thursday","frieday","saterday"];
// let k1 = new Date('2023-02-13');
// let k2 = day[k1.getDay()];
// console.log(k2);


// const year = prompt('enter year');
// var calendar = require('node-calendar');

// var a =calendar.isleap(year);
// if ((a==true)) {
//   console.log(year + ' is a leap year');
// } else {
//   console.log(year + ' is not a leap year');
// }

// const number = prompt('enter num');
// let n1 = 0, n2 = 1, nextTerm;

// console.log('Fibonacci Series:');
// console.log(n1);
// console.log(n2); 

// nextnum = n1 + n2;

// while (nextnum <= number) {

   
//     console.log(nextnum);

//     n1 = n2;
//     n2 = nextnum;
//     nextnum = n1 + n2;
// }

// const k1 = prompt('enter first num');
// const k2 = prompt('enter second num');
// for (let i = k1; i <= k2; i++) {
//   let flag = 0;


//   for (let j = 2; j < i; j++) {
//       if (i % j == 0) {
//           flag = 1;
//           break;
//       }
//   }

//   if (i > 1 && flag == 0) {
//       console.log(i);
//   }
// }


// const k1 = prompt('enter first num');
// const k2 = prompt('enter second num');
// for (let i = k1; i <= k2; i++) {
//   let flag = 0;


//   for (let j = 1; j < i; j++) {
//       if (i%2 == 0) {
//           flag = 1;
//           console.log(i);
//       break;
//       }
//   }
// }

// const k1 = prompt('enter first num');
// const k2 = prompt('enter second num');
// for (let i = k1; i <= k2; i++) {
//   let flag = 0;


//   for (let j = 0; j < i; j++) {
//       if (i%2!= 0) {
//           flag = 1;
//           console.log(i);
//       break;
//       }
//   }
// }


