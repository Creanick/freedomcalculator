export interface CalculateImmortalFreedomFund {
    monthlyExpense: number,
    inflationRate: number
    postFreedomReturn: number
}
const calculateImmortalFreedomFund = (params: CalculateImmortalFreedomFund) => {
    const { monthlyExpense, inflationRate, postFreedomReturn } = params;
    if (monthlyExpense < 0) {
        throw RangeError("Monthly Expense must be posivity");
    }
    if (inflationRate < 0) {
        throw RangeError("Monthly Expense must be positive number");
    }
    if (postFreedomReturn < 0) {
        throw RangeError("Post freedom return must be positive number")
    }
    //fund => y*100/(g-i)
    const totalReturn = postFreedomReturn - inflationRate;
    if (totalReturn <= 0) {
        throw RangeError("Post freedom return must be greater than inflation rate");
    }
    const y = monthlyExpense * 12;
    const immortalFreedomFund = y * 100 / totalReturn;
    return immortalFreedomFund;
}
export default calculateImmortalFreedomFund;