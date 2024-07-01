// 2. The Double Trouble:
//    You are tasked with writing a function that doubles each element in an array. However, there's a catch: if the array contains consecutive duplicate elements, only double one of them.

let arr=[1,2,34,8,6,2,4,1,7,7,8,7,7];


for(let i=0;i<arr.length-1;i++){
    if(arr[i] != arr[i+1]){
        arr[i]*=arr[i];
    }
}

if(arr[arr.length-1]==arr[arr.length-2]){
    arr[arr.length-1]*=arr[arr.length-1];
}

console.log(arr);
