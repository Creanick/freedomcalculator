import calculateCompoundedFutureValue from "./calculate_compounded_future_value";

export interface CompoundedFutureMonthlyExpenseParams {
    currentMonthlyExpense: number
    inflationRate: number
    currentAge: number
    futureAge: number
}
const calculateCompoundedFutureMonthlyExpense = (params: CompoundedFutureMonthlyExpenseParams) => {
    const { currentAge, currentMonthlyExpense, futureAge, inflationRate } = params;
    if (currentAge < 0) {
        throw RangeError("Current age must be positive")
    }
    const totalYear = futureAge - currentAge;
    return calculateCompoundedFutureValue({
        interestRate: inflationRate,
        numberOfYears: totalYear,
        principle: currentMonthlyExpense
    })
}

export default calculateCompoundedFutureMonthlyExpense;