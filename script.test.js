const { convertToRomansNumbers, mergeListIntoString } = require("./script.reworked.js");
const { expect, describe } = require('@jest/globals')

describe('Roman system: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 & M = 1000. (Particular cases : [4,9]*10^n) ', () => {

    test('Convert arabic numbers to roman ones', () => {
        expect(convertToRomansNumbers(1)).toBe('I')
        expect(convertToRomansNumbers(2)).toBe('II')
        expect(convertToRomansNumbers(3)).toBe('III')
        expect(convertToRomansNumbers(4)).toBe('IV')
        expect(convertToRomansNumbers(5)).toBe('V')
        expect(convertToRomansNumbers(6)).toBe('VI')
        expect(convertToRomansNumbers(7)).toBe('VII')
        expect(convertToRomansNumbers(8)).toBe('VIII')
        expect(convertToRomansNumbers(9)).toBe('IX')
    })

    test('Convertion do not allow additive notation', () => {
        expect(convertToRomansNumbers(9)).not.toBe('X')
        expect(convertToRomansNumbers(9)).not.toBe('VIIII')
    })

    test('Merging strings from translated values list to one value string (need later)', () => {
        expect(mergeListIntoString(['X', 'V', 'II'])).toBe('XVII')
    })

    test('Convert romans numbers to arabic ones', () => {
        expect(convertToRomansNumbers(15)).toBe('XV')
        expect(convertToRomansNumbers(120)).toBe('CXX')
        expect(convertToRomansNumbers(1020)).not.toBe('CXX')
        expect(convertToRomansNumbers(1020)).toBe('MXX')
        expect(convertToRomansNumbers(1527)).not.toBe('MDXXVI')
        expect(convertToRomansNumbers(1527)).toBe('MDXXVII')
    });
    test('Convert romans numbers to arabic ones with specific/limit values', () => {
        expect(convertToRomansNumbers(9)).toBe('IX')
        expect(convertToRomansNumbers(90)).toBe('XC')
        expect(convertToRomansNumbers(994)).toBe('CMXCIV')
        expect(convertToRomansNumbers(1527)).toBe('MDXXVII')
    });
});