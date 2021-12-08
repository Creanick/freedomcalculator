import calculateMortalFreedomFund, { CalculateMortalFreedomFund } from "../../../../domain/logic/calculators/calculate_mortal_freedom_fund";
describe('Calculate Mortal Freedom Fund function tests => ', () => {
    //should throw error when monthly expense is negetive
    test("should throw error when monthly expense is negetive", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: -7662,
            totalYears: 52,
            inflationRate: 8,
            postFreedomReturn: 12
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should throw error when total years is negetive
    test("should throw error when total years is negetive", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 22662,
            totalYears: -52,
            inflationRate: 8,
            postFreedomReturn: 12
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should throw error when inflation rate is negetive
    test("should throw error when inflation rate is negetive", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 22662,
            totalYears: 52,
            inflationRate: -8,
            postFreedomReturn: 12
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return is negetive
    test("should throw error when post freedom return is negetive", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 22662,
            totalYears: 52,
            inflationRate: 8,
            postFreedomReturn: -12
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return is less than inflation rate
    test("should throw error when post freedom return is lest than inflation rate", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 22662,
            totalYears: 52,
            inflationRate: 8,
            postFreedomReturn: 2
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return and inflation rate is same
    test("should throw error when post freedom return is lest than inflation rate", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 22662,
            totalYears: 52,
            inflationRate: 8,
            postFreedomReturn: 8
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return and inflaiton is both 0
    test("should throw error when post freedom return is and inflation is both 0", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 22662,
            totalYears: 52,
            inflationRate: 0,
            postFreedomReturn: 0
        }
        expect(() => calculateMortalFreedomFund(params)).toThrow();
    })
    //should return fund 0 when monthly expense is 0
    test("should return fund 0 when monthly expense is 0", () => {
        const params: CalculateMortalFreedomFund = {
            monthlyExpense: 0,
            totalYears: 52,
            inflationRate: 8,
            postFreedomReturn: 21
        }
        const totalFund = calculateMortalFreedomFund(params);
        expect(totalFund).toBe(0);
    })
    describe('should return correct fund for different params', () => {
        test("#1 Test when total years is 0", () => {
            const params: CalculateMortalFreedomFund = {
                monthlyExpense: 5486,
                totalYears: 0,
                inflationRate: 8,
                postFreedomReturn: 21
            }
            const totalFund = calculateMortalFreedomFund(params);
            const expectedTotalFund = 0;
            expect(totalFund).toBe(expectedTotalFund);
        })
        test("#2 Test when total years is 1", () => {
            const params: CalculateMortalFreedomFund = {
                monthlyExpense: 5000,
                totalYears: 1,
                inflationRate: 6,
                postFreedomReturn: 10
            }
            const totalFund = calculateMortalFreedomFund(params);
            const expectedTotalFund = 54545;
            expect(totalFund).toBe(expectedTotalFund);
        })
        test("#3 Test when total years is 2", () => {
            const params: CalculateMortalFreedomFund = {
                monthlyExpense: 3000,
                totalYears: 2,
                inflationRate: 8,
                postFreedomReturn: 14
            }
            const totalFund = calculateMortalFreedomFund(params);
            const expectedTotalFund = 61496;
            expect(totalFund).toBe(expectedTotalFund);
        })
        test("#4 Test when total years is 3", () => {
            const params: CalculateMortalFreedomFund = {
                monthlyExpense: 35641,
                totalYears: 3,
                inflationRate: 2,
                postFreedomReturn: 9
            }
            const totalFund = calculateMortalFreedomFund(params);
            const expectedTotalFund = 1103156;
            expect(totalFund).toBe(expectedTotalFund);
        })
        test("#5 Test when total years is 40", () => {
            const params: CalculateMortalFreedomFund = {
                monthlyExpense: 12000,
                totalYears: 40,
                inflationRate: 8,
                postFreedomReturn: 15
            }
            const totalFund = calculateMortalFreedomFund(params);
            const expectedTotalFund = 1890303;
            expect(totalFund).toBe(expectedTotalFund);
        })
        test("#5 Test when total years is 22", () => {
            const params: CalculateMortalFreedomFund = {
                monthlyExpense: 25600,
                totalYears: 22,
                inflationRate: 25,
                postFreedomReturn: 30
            }
            const totalFund = calculateMortalFreedomFund(params);
            const expectedTotalFund = 3551506;
            expect(totalFund).toBe(expectedTotalFund);
        })
    })
})
