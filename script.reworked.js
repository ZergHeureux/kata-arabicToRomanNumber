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

class ArabicNumber{
    patterns = {
        0: {
            unit: 'I',
            limit: 'X',
            fifth: 'V',
        },
        1: {
            unit: 'X',
            limit: 'C',
            fifth: 'L',
        },
        2: {
            unit: 'C',
            limit: 'M',
            fifth: 'D',
        },
        3: {
            unit: 'M',
            limit: 'MMM',
            fifth: 'MM',
        }
    }
    exeptionCases = null;

    arabicNumber = 0;
    powerOfTen = 0;
    romanString = "";

    /**
     * 
     * @param {Number} arabicValue 
     * @param {Number} powerOfTen 
     */
    constructor(arabicValue, powerOfTen){
        this.arabicNumber = arabicValue;
        this.powerOfTen = powerOfTen;
        this.setExceptionCases()
    }

    /**
     * Construct exeption Cases in patterns
     */
    setExceptionCases(){
        this.exeptionCases = {
            4: { exeption: this.patterns[this.powerOfTen].unit + this.patterns[this.powerOfTen].fifth },
            9: { exeption: this.patterns[this.powerOfTen].unit + this.patterns[this.powerOfTen].limit }
        }
    }
    /**
     * 
     * @returns {String} Roman translation of Arabic Number
     */
    getRomanTranslation(){
        this.romanString = this.#translateString(this.arabicNumber);
        return this.romanString
    }

    /**
     * 
     * @returns {String} Translated string
     */
    #translateString(){
        return this.#getCorrespondingRomanValue()
    }
   
    /**
     * 
     * @returns {String} Translated string into roman numeric alphabet
     */
    #getCorrespondingRomanValue(){
        return this.#identifyRomanTranslation(this.arabicNumber);
    }

    /**
     * 
     * @param {Number} value Arabic value
     * @returns {String} Roman value corresponding to arabic value
     */
    #identifyRomanTranslation(){
        var correctRomanValue = "";
        for (let potentialArabicValue = 1; potentialArabicValue <= this.arabicNumber; potentialArabicValue++) {
            if (potentialArabicValue == 4) {correctRomanValue = this.exeptionCases[4].exeption}
            else if (potentialArabicValue == 5) {correctRomanValue = this.patterns[this.powerOfTen].fifth}
            else if (potentialArabicValue == 9) {correctRomanValue = this.exeptionCases[9].exeption}
            else{ correctRomanValue +=  this.patterns[this.powerOfTen].unit;}
            console.log(this.arabicNumber,correctRomanValue)
        }
        return correctRomanValue
    }

}
/**
 * 
 * @param {Number[]} arabicNumberList 
 * @returns {String[]}
 */
const createArabicNumberArray = (arabicNumber) => {
    var numberString = arabicNumber.toString()
    var numberStringArray = numberString.split('')
    var revertedNumberStringArray = numberStringArray.reverse()
    
    revertedNumberStringArray.forEach((numberAsString,powerOfTen) =>{
        numberStringArray[powerOfTen] = new ArabicNumber(parseInt(numberAsString),powerOfTen)
    })
    
    return revertedNumberStringArray;
}

const mergeListIntoString = (stringList) => {
    var composedString = ''
    stringList.forEach(num => {
        composedString += num
    })
    return composedString
}

/**
 * 
 * @param {Number} arabicNumber 
 * @returns {String}
 */
const convertToRomansNumbers = (arabicNumber) => {
    const arabicNumberArray = createArabicNumberArray(arabicNumber)
    // console.log("list " + arabicNumberArray)
    var romanNumbers = []

    arabicNumberArray.forEach(arabicNumberObject => {
        romanNumbers.push(arabicNumberObject.getRomanTranslation());
    });

    // We reversed numbers for better treatment, so lets get back in correct reading 
    romanNumbers = romanNumbers.reverse()
    const romanNumberString = mergeListIntoString(romanNumbers)
    
    return romanNumberString;

}





module.exports = {
    convertToRomansNumbers, mergeListIntoString
}