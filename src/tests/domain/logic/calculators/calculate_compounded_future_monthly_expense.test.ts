import calculateCompoundedFutureMonthlyExpense, { CompoundedFutureMonthlyExpenseParams } from "../../../../domain/logic/calculators/calculate_compounded_future_monthly_expense";

describe('Calcaulate Compounded Future Monthly Expense Function Tests=>', () => {
    //should throw error if current monthly expense is negetive
    test('should throw error when current monthly expense is negetive', () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 34,
            futureAge: 52,
            currentMonthlyExpense: -23,
            inflationRate: 52
        }
        expect(() => calculateCompoundedFutureMonthlyExpense(params)).toThrow();
    })
    //should throw error if current age is negetive
    test('should throw error when current age is negetive', () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: -34,
            futureAge: 52,
            currentMonthlyExpense: 45200,
            inflationRate: 52
        }
        expect(() => calculateCompoundedFutureMonthlyExpense(params)).toThrow();
    })
    //should throw error if future age is negetive
    test('should throw error when future age is negetive', () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 89,
            futureAge: -52,
            currentMonthlyExpense: 45200,
            inflationRate: 52
        }
        expect(() => calculateCompoundedFutureMonthlyExpense(params)).toThrow();
    })
    //should throw error if future age is less than current age
    test('should throw error future age is less than current age', () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 50,
            futureAge: 40,
            currentMonthlyExpense: 45200,
            inflationRate: 52
        }
        expect(() => calculateCompoundedFutureMonthlyExpense(params)).toThrow();
    })
    //should return 0 when current monthly expense 0
    test('should return 0 when current monthly expense 0', () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 20,
            futureAge: 40,
            currentMonthlyExpense: 0,
            inflationRate: 52
        }
        const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
        expect(futureMonthlyExpense).toBe(0);
    })
    //should return current monthly expense when current age and future age is both 0
    test("should return current monthly expense as future expense when current age and future aeg is both 0", () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 0,
            futureAge: 0,
            currentMonthlyExpense: 67892,
            inflationRate: 52
        }
        const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
        const expectedFutureMonthlyExpense = 67892;
        expect(futureMonthlyExpense).toBe(expectedFutureMonthlyExpense);

    })
    //should return current monthly exepense when current age and future age is same
    test("should return current monthly expense as future expense when current age and future aeg is both 0", () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 48,
            futureAge: 48,
            currentMonthlyExpense: 67892,
            inflationRate: 52
        }
        const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
        const expectedFutureMonthlyExpense = 67892;
        expect(futureMonthlyExpense).toBe(expectedFutureMonthlyExpense);

    })
    //should return current monthly expense when inflation rate is 0
    test("should return current monthly expense when inflation rate is 0", () => {
        const params: CompoundedFutureMonthlyExpenseParams = {
            currentAge: 25,
            futureAge: 48,
            currentMonthlyExpense: 67892,
            inflationRate: 0
        }
        const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
        const expectedFutureMonthlyExpense = 67892;
        expect(futureMonthlyExpense).toBe(expectedFutureMonthlyExpense);
    })
    //should return correct future monthly expense when inflation rate and currentage and future age is correct
    describe('Should return correct future expense for correct inflation,current age and future age', () => {
        test("#1 Test", () => {
            const params: CompoundedFutureMonthlyExpenseParams = {
                currentAge: 25,
                futureAge: 48,
                currentMonthlyExpense: 67892,
                inflationRate: 6
            }
            const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
            const expectedFutureMonthlyExpense = 259330;
            expect(futureMonthlyExpense).toBe(expectedFutureMonthlyExpense);
        })
        test("#2 Test", () => {
            const params: CompoundedFutureMonthlyExpenseParams = {
                currentAge: 25,
                futureAge: 48,
                currentMonthlyExpense: 67892,
                inflationRate: -12
            }
            const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
            const expectedFutureMonthlyExpense = 3589;
            expect(futureMonthlyExpense).toBe(expectedFutureMonthlyExpense);
        })
        test("#3 Test", () => {
            const params: CompoundedFutureMonthlyExpenseParams = {
                currentAge: 12,
                futureAge: 33,
                currentMonthlyExpense: 59874,
                inflationRate: 24
            }
            const futureMonthlyExpense = calculateCompoundedFutureMonthlyExpense(params);
            const expectedFutureMonthlyExpense = 5483952;
            expect(futureMonthlyExpense).toBe(expectedFutureMonthlyExpense);
        })
    })

})
