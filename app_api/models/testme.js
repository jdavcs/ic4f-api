
console.log('\n ==this executes as part of testme== \n');



const foo = 42;


//don't do this: this makes it a global, rihgt?
const sayHello = function() {
  console.log('hello!');
}



function sayIt() {
  console.log('saying it!!!');
}


//console.log(module);
//module.exports = {sayIt};
