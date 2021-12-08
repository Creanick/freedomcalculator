export interface CalculateFreedomFund {
    monthlyExpense: number
    inflationRate: number
    postFreedomReturn: number
    totalYears?: number
}

const calculateFreedomFund = (params: CalculateFreedomFund) => {
    const { inflationRate, monthlyExpense, postFreedomReturn, totalYears = Infinity } = params;
    if (totalYears < 0) {
        throw RangeError("Total Years must be positive")
    }
    if (monthlyExpense < 0) {
        throw RangeError("Monthly Expense must be posivity");
    }
    if (inflationRate < 0) {
        throw RangeError("Monthly Expense must be positive number");
    }
    if (postFreedomReturn < 0) {
        throw RangeError("Post freedom return must be positive number")
    }
    const totalReturn = postFreedomReturn - inflationRate;
    if (totalReturn <= 0) {
        throw RangeError("Post freedom return must be greater than inflation rate");
    }
    const y = monthlyExpense * 12;
    let totalFund: number;
    if (totalYears === Infinity) {
        totalFund = y * 100 / totalReturn;
    } else {
        const a = 1 + (postFreedomReturn / 100);
        const b = 1 + (inflationRate / 100);
        const n = totalYears;
        totalFund = y * (Math.pow(a, n) - Math.pow(b, n)) / ((a - b) * Math.pow(a, n))
    }
    return Math.round(totalFund);
}

export default calculateFreedomFund;