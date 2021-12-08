import { CalculateImmortalFreedomFund } from "./calculate_immortal_freedom_fund";
export interface CalculateMortalFreedomFund extends CalculateImmortalFreedomFund {
    totalYears: number
}
const calculateMortalFreedomFund = (params: CalculateMortalFreedomFund) => {
    const { monthlyExpense, totalYears, inflationRate, postFreedomReturn } = params;
    if (totalYears < 0) {
        throw RangeError("Total Years must be positive")
    }
    if (monthlyExpense < 0) {
        throw RangeError("Monthly Expense must be positive");
    }
    if (inflationRate < 0) {
        throw RangeError("Monthly Expense must be positive number");
    }
    if (postFreedomReturn < 0) {
        throw RangeError("Post freedom return must be positive number")
    }
    if ((postFreedomReturn - inflationRate) <= 0) {
        throw RangeError("Post freedom return must be greater than inflation rate");
    }
    const y = monthlyExpense * 12;
    const a = 1 + (postFreedomReturn / 100);
    const b = 1 + (inflationRate / 100);
    const n = totalYears;
    //totalFundNeeded => y(a^n-b^n)/(a-b)*a^n
    const totalFundNeeded = Math.round(y * (Math.pow(a, n) - Math.pow(b, n)) / ((a - b) * Math.pow(a, n)));
    return totalFundNeeded;
}

export default calculateMortalFreedomFund;