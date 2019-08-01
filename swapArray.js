// this doesnt take input
var a = [1, 2, 3, 0, 8, 9];
var b = [5, 6, 7, 8];
var bLength = b.length;
var aLength = a.length
var newA = [];
var newB = [];

function extractPrime(arr,newArr) { //this part extracts the prime numbers----
    for (i = 0; i < arr.length; i++) {
        isPrime(arr[i],newArr)   }
}

function isPrime(N, newArr) {
    var test = 0;
    for (j = 2; j < N; j++) {
        if (N % j == 0) {
            test = 1;
            break;
        }
        else {
            test = 0;
        }
    }
    if((test == 0)&&(N != 1)&&(N!=0)){
        newArr.push(N);
    }
}

function swapArr(a, b) { //this part is for swapping arrays
    if (b.length > a.length) {
        for (i = 0; i < b.length; i++) {
            a[i] = a[i] ^ b[i];
            b[i] = a[i] ^ b[i];
            a[i] = a[i] ^ b[i];
        }
    } else {
        for (i = 0; i < a.length; i++) {
            a[i] = a[i] ^ b[i];
            b[i] = a[i] ^ b[i];
            a[i] = a[i] ^ b[i];
        }
    }
    return [a, b];
}

extractPrime(a,newA); extractPrime(b,newB); //first extract the primes
var filterThis = swapArr(newA, newB); //then swapArr's
a = filterThis[0].splice(0,bLength); //remove 0's if any
b = filterThis[1].splice(0,aLength); //remove 0's if any
console.log(a); console.log(b); //output















