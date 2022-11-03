function vowelCount(str) {
    const vowelMap = new Map();
    for(let char of str) {
        let lowerCaseChar = char.toLowerCase(char);
        if("aeiou".includes(lowerCaseChar)) {
            if(vowelMap.has(lowerCaseChar)) {
                vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1)
            } else {
                vowelMap.set(lowerCaseChar, 1);
            }
        }
    }
    let sum = 0;
    for (const value of vowelMap.values()) {
        sum+=value;
    }
    return sum;
}

console.log(vowelCount('Originator'));