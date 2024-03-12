

/*
*   Precedent execution was to substract from arabic and identify roman values (1000,100,50, ...)
*   Precising particular cases at each step
*   This one need to be different
*   Weak way : split decimal and treat them part by part (ex: 1253 = [1,2,5,3])
*   Here we will attempts to use firstly : Lists (or Arrays)
*   Secondly : Object
*
*   This is the first case : using Arrays and patterns 
*/

const revertedArabicNumberInList = (arabicNumberList) => {
    var numberString = arabicNumberList.toString()
    var numberStringList = numberString.split('')
    var revertedNumberStringList = numberStringList.reverse()
    return revertedNumberStringList;
}

/**
 * 
 * @param {Number} arabicNumber 
 */
const convertToRomansNumbers = (arabicNumber) => {
    const arabicNumberList = revertedArabicNumberInList(arabicNumber) //TODO reverse func
    // console.log("list " + arabicNumberList)
    var romanNumberList = []

    arabicNumberList.forEach((value, powerOfTen) => {
        romanNumberList.push(getRomanTranslationFromPowerOfTen(parseInt(value), powerOfTen))
    })

    // We reversed numbers for better treatment, so lets get back in correct reading 
    romanNumberList = romanNumberList.reverse()
    const romanNumberString = mergeListIntoString(romanNumberList)
    // console.log(res)
    return romanNumberString;

}
// We can identify patterns in tens 
const getRomanTranslationFromPowerOfTen = (value, powerOfTen) => {
    const patterns = {
        0: {
            base: 'I',
            middle: 'V',
            last: 'X'
        },
        1: {
            base: 'X',
            middle: 'L',
            last: 'C'
        },
        2: {
            base: 'C',
            middle: 'D',
            last: 'M'
        },
        3: {
            base: 'M',
            middle: 'MM',
            last: 'MMM'
        }
    }
    // We can identify in substractive roman numbers two unique cases differing from patterns 
    const uniqueCases = {
        4: { exeption: patterns[powerOfTen].base + patterns[powerOfTen].middle },
        9: { exeption: patterns[powerOfTen].base + patterns[powerOfTen].last }
    }

    var romanString = ''

    //Construct this bit of value with patterns
    for (let i = 1; i <= value; i++) {
        romanString += patterns[powerOfTen].base
        if (Object.keys(uniqueCases).includes(i.toString())) {
            romanString = uniqueCases[i].exeption;
        }
        if (i == 5) romanString = patterns[powerOfTen].middle
    }

    return romanString;
}

const mergeListIntoString = (stringList) => {
    var composedString = ''
    stringList.forEach(num => {
        composedString += num
    })
    return composedString
}



module.exports = {
    convertToRomansNumbers, mergeListIntoString
}