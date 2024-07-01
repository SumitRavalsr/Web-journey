// The Mirror Mirror: Imagine you have a string, and you need to create a new string that is a mirror image of the original. Write a function that appends the reversed version of the original string to itself.


function strMirror(str){
    let k = str.split('').reverse().join('');
    console.log(k);
    
    
    return str + k;
}

let str = "Krishna";
let r = strMirror(str);
console.log(r);
