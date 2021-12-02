interface CalcuateTotalFundParams {
    monthlyExpense: number
    currentAge: number
    freedomAge: number
    lifeExpectancy: number
    inflationRate: number
    postFreedomReturn: number
}
class FreedomCalculatorEntity {

    static calculateTotalFund(params: CalcuateTotalFundParams) {
        const { monthlyExpense, currentAge, freedomAge, lifeExpectancy, inflationRate, postFreedomReturn } = params;
        //user validation
        if (monthlyExpense < 0 || currentAge < 0 || freedomAge < 0 || lifeExpectancy < 0 || inflationRate < 0 || postFreedomReturn < 0) {
            throw RangeError("Data Value Should greater than 0");
        }
        if (freedomAge < currentAge) {
            throw RangeError("Freedom Age greater than or equal to current Age");
        }
        if (lifeExpectancy < freedomAge) {
            throw RangeError("Life Expentancy greater than or equal to Freedom Age");
        }
        //calculate monthly expense at freedom age
        //calculate after freedom age until life expentancy how much money needed
        //mock return value
        return Math.floor(Math.random() * 99999999) + 1;
    }
}

export default FreedomCalculatorEntity;