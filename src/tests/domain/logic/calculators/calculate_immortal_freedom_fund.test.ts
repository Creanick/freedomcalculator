import calculateImmortalFreedomFund, { CalculateImmortalFreedomFund } from "../../../../domain/logic/calculators/calculate_immortal_freedom_fund";

describe('Calculate Immortal Freedom Fund Tests', () => {
    //should throw error when monthly expense is negetive
    test("should throw error when monthly expense is negetive", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: 6,
            postFreedomReturn: 52,
            monthlyExpense: -25232
        }
        expect(() => calculateImmortalFreedomFund(params)).toThrow();
    })
    //should throw error when inflation rate is negetive
    test("should throw error when inflation rate is negetive", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: -6,
            postFreedomReturn: 52,
            monthlyExpense: 25232
        }
        expect(() => calculateImmortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return is negetive
    test("should throw error when post freedom return is negetive", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: 14,
            postFreedomReturn: -52,
            monthlyExpense: 25232
        }
        expect(() => calculateImmortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return is less than inflation rate
    test("should throw error when post freedom return is less than inflation rate", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: 14,
            postFreedomReturn: 4,
            monthlyExpense: 25232
        }
        expect(() => calculateImmortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return and inflation rate is same
    test("should throw error when post freedom return and inflation rate is same", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: 24,
            postFreedomReturn: 24,
            monthlyExpense: 25232
        }
        expect(() => calculateImmortalFreedomFund(params)).toThrow();
    })
    //should throw error when post freedom return and inflaiton is both 0
    test("should throw error when post freedom return and inflatin rate is both 0", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: 24,
            postFreedomReturn: 24,
            monthlyExpense: 25232
        }
        expect(() => calculateImmortalFreedomFund(params)).toThrow();
    })
    //should return fund 0 when monthly expense is 0
    test("should return freedom fund 0 when monthly expense is 0", () => {
        const params: CalculateImmortalFreedomFund = {
            inflationRate: 16,
            postFreedomReturn: 24,
            monthlyExpense: 0
        }
        const fund = calculateImmortalFreedomFund(params);
        expect(fund).toBe(0);
    })
    //should return c0rrect fund for correct monthlyexpense,inflation rate and post freedom return
    describe("should return correct freedom fund for different params", () => {
        test("#1 Test", () => {
            const params: CalculateImmortalFreedomFund = {
                inflationRate: 0,
                postFreedomReturn: 1,
                monthlyExpense: 5000
            }
            const fund = calculateImmortalFreedomFund(params);
            const expectedFund = 6000000
            expect(fund).toBe(expectedFund);
        })
        test("#2 Test", () => {
            const params: CalculateImmortalFreedomFund = {
                inflationRate: 6,
                postFreedomReturn: 7,
                monthlyExpense: 4500
            }
            const fund = calculateImmortalFreedomFund(params);
            const expectedFund = 5400000
            expect(fund).toBe(expectedFund);
        })
        test("#3 Test", () => {
            const params: CalculateImmortalFreedomFund = {
                inflationRate: 12,
                postFreedomReturn: 18,
                monthlyExpense: 3560
            }
            const fund = calculateImmortalFreedomFund(params);
            const expectedFund = 712000
            expect(fund).toBe(expectedFund);
        })
        test("#3 Test", () => {
            const params: CalculateImmortalFreedomFund = {
                inflationRate: 5,
                postFreedomReturn: 55,
                monthlyExpense: 34000
            }
            const fund = calculateImmortalFreedomFund(params);
            const expectedFund = 816000
            expect(fund).toBe(expectedFund);
        })
        test("#4 Test", () => {
            const params: CalculateImmortalFreedomFund = {
                inflationRate: 6,
                postFreedomReturn: 10,
                monthlyExpense: 160357
            }
            const fund = calculateImmortalFreedomFund(params);
            const expectedFund = 48107100
            expect(fund).toBe(expectedFund);
        })
    })
})
