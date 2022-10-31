function hasDuplicate(numArray) {
    const numSet = new Set();
    for (let element of numArray) {
        if(!numSet.has(element)) {
            numSet.add(element);
        }
    }

    return numSet.size != numArray.length;
}

console.log(hasDuplicate([1,2,3,4,5,6,6,9,9])); //true
console.log(hasDuplicate([1,5,-1,4])); //false