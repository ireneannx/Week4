//example1
const abc = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;
            if (!error) {
                resolve({ data: "Server Response" })
            } else {
                reject({ err: "Error" })
            }
        }, 1000)
    })
}
//but noone is catching it still so use .then and .catch

abc()
    .then((res) => { console.log(res.data); })
    .catch((err) => console.log(err.err));

console.log("this comes first");