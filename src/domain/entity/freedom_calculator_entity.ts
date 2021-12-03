export interface CalcuateTotalFundParams {
    monthlyExpense: number
    currentAge: number
    freedomAge: number
    lifeExpectancy: number
    inflationRate: number
    postFreedomReturn: number
}
export interface MontlhlyExpenseAtFreedom {
    currentMonthlyExpense: number,
    currentAge: number,
    freedomAge: number,
    inflationRate: number
}
export interface CompoundedPrincipleParams {
    principle: number
    interestRate: number
    numberOfYears: number
}
export interface CalculateTotalImmortalFund {
    monthlyExpense: number
    currentAge: number
    freedomAge: number
    inflationRate: number
    postFreedomReturn: number
}
class FreedomCalculatorEntity {
    static compoundedPrinciple(params: CompoundedPrincipleParams) {
        const { principle, interestRate, numberOfYears } = params;
        return principle * Math.pow(1 + (interestRate / 100), numberOfYears);
    }
    static monthlyExpenseAtFreedom(params: MontlhlyExpenseAtFreedom) {
        const { currentAge, currentMonthlyExpense, freedomAge, inflationRate } = params;
        const yearsToFreedom = freedomAge - currentAge;
        return this.compoundedPrinciple({ principle: currentMonthlyExpense, numberOfYears: yearsToFreedom, interestRate: inflationRate });
    }
    static calculateTotalImmortalFund(params: CalculateTotalImmortalFund) {
        const { monthlyExpense, currentAge, freedomAge, inflationRate, postFreedomReturn } = params;
        const monthlyExpenseAtFreedom = this.monthlyExpenseAtFreedom({ inflationRate, freedomAge, currentAge, currentMonthlyExpense: monthlyExpense });
        //totalfundNeeded => y*100/(g-i)
        const y = monthlyExpenseAtFreedom * 12;
        const totalFundNeeded = y * 100 / (postFreedomReturn - inflationRate);
        return totalFundNeeded;
    }
    static calculateTotalFund(params: CalcuateTotalFundParams) {
        const { monthlyExpense, currentAge, freedomAge, lifeExpectancy, inflationRate, postFreedomReturn } = params;
        //user validation
        if (monthlyExpense < 0 || currentAge < 0 || freedomAge < 0 || lifeExpectancy < 0 || inflationRate < 0 || postFreedomReturn < 0) {
            throw RangeError("Data Value Should greater than 0");
        }
        if (freedomAge < currentAge) {
            throw RangeError("Freedom Age must be greater than or equal to current Age");
        }
        if (lifeExpectancy < freedomAge) {
            throw RangeError("Life Expentancy must be greater than or equal to Freedom Age");
        }
        const monthlyExpenseAtFreedom = this.monthlyExpenseAtFreedom({ inflationRate, freedomAge, currentAge, currentMonthlyExpense: monthlyExpense });
        //totalFundNeeded => y(a^n-b^n)/(a-b)*a^n
        const y = monthlyExpenseAtFreedom * 12;
        const a = 1 + (postFreedomReturn / 100);
        const b = 1 + (inflationRate / 100);
        const n = lifeExpectancy - freedomAge;
        const totalFundNeeded = y * (Math.pow(a, n) - Math.pow(b, n)) / ((a - b) * Math.pow(a, n));
        return totalFundNeeded;
    }
}

export default FreedomCalculatorEntity;