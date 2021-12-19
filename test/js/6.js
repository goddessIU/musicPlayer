function test1() {
    return new Promise((resolve, reject) => {
        console.log(1)
        resolve(2)
    })
}

function test2() {
    return new Promise((resolve, reject))
}