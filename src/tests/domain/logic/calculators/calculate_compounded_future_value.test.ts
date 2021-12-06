import calculateCompoundedFutureValue, { CompoundedFutureValueParams } from "../../../../domain/logic/calculators/calculate_compounded_future_value"

describe("Calculate Compounded future value Tests=> ", () => {
    // throw error if principle less than 0
    test("should throw error if principle less than 0", () => {
        const params: CompoundedFutureValueParams = {
            principle: -152,
            interestRate: 34,
            numberOfYears: 52
        };
        expect(() => calculateCompoundedFutureValue(params)).toThrow();
    })
    // throw error if number of years less than 0
    test("should throw error if number of years less than 0", () => {
        const params: CompoundedFutureValueParams = {
            principle: 25,
            interestRate: 34,
            numberOfYears: -143
        };
        expect(() => calculateCompoundedFutureValue(params)).toThrow();
    })
    // should return 0 for principle 0
    test("should return 0 for principle 0", () => {
        const params: CompoundedFutureValueParams = {
            principle: 0,
            interestRate: 34,
            numberOfYears: 45
        };
        const futureValue = calculateCompoundedFutureValue(params);
        expect(futureValue).toBe(0);
    })
    // should return same principle as future value for 0 number of years
    test("should return same principle as future value for 0 number of years", () => {
        const params: CompoundedFutureValueParams = {
            principle: 52,
            interestRate: 34,
            numberOfYears: 0
        };
        const futureValue = calculateCompoundedFutureValue(params);
        expect(futureValue).toBe(52);
    })
    // should return same principle as future value for 0 interest rate
    test("should return same principle as future value for 0 interest rate", () => {
        const params: CompoundedFutureValueParams = {
            principle: 63,
            interestRate: 0,
            numberOfYears: 453
        };
        const futureValue = calculateCompoundedFutureValue(params);
        expect(futureValue).toBe(63);
    })
    // should return correct future value for positive interest rate
    describe('With different interest rate and number of years', () => {
        test("#1 Test", () => {
            const params: CompoundedFutureValueParams = {
                principle: 2569,
                interestRate: 6,
                numberOfYears: 29
            };
            const expectedFutureValue = 13920
            const futureValue = calculateCompoundedFutureValue(params);
            expect(futureValue).toBe(expectedFutureValue);

        })
        test("#2 Test", () => {
            const params: CompoundedFutureValueParams = {
                principle: 4578,
                interestRate: 9,
                numberOfYears: 14
            };
            const expectedFutureValue = 15298
            const futureValue = calculateCompoundedFutureValue(params);
            expect(futureValue).toBe(expectedFutureValue);
        })
        test("#3 Test", () => {
            const params: CompoundedFutureValueParams = {
                principle: 8547,
                interestRate: -9,
                numberOfYears: 6
            };
            const expectedFutureValue = 4854
            const futureValue = calculateCompoundedFutureValue(params);
            expect(futureValue).toBe(expectedFutureValue);
        })
        test("#4 Test", () => {
            const params: CompoundedFutureValueParams = {
                principle: 35684,
                interestRate: -43,
                numberOfYears: 64
            };
            const expectedFutureValue = 0
            const futureValue = calculateCompoundedFutureValue(params);
            expect(futureValue).toBe(expectedFutureValue);
        })
        test("#5 Test", () => {
            const params: CompoundedFutureValueParams = {
                principle: 35684,
                interestRate: -14,
                numberOfYears: 32
            };
            const expectedFutureValue = 286
            const futureValue = calculateCompoundedFutureValue(params);
            expect(futureValue).toBe(expectedFutureValue);
        })
    })
})