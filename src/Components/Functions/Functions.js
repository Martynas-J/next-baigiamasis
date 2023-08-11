export function firstLetterUpperCase(str) {
    let firstLetter = str.at(0).toUpperCase()
    let restOfStr = str.slice(1)
    let output = firstLetter + restOfStr

    return output;
}
export function firstLetterLowerCase(str) {
    let firstLetter = str.at(0).toLowerCase()
    let restOfStr = str.slice(1)
    let output = firstLetter + restOfStr

    return output;
}