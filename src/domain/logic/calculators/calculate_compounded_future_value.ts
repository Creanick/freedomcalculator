export interface CompoundedFutureValueParams {
    principle: number,
    interestRate: number,
    numberOfYears: number
}
const calculateCompoundedFutureValue = (params: CompoundedFutureValueParams) => {
    const { principle, interestRate, numberOfYears } = params;
    if (principle < 0) {
        throw Error("Principle must be greater than or equal to 0");
    }
    if (numberOfYears < 0) {
        throw Error("Number of years must be greater than or equal to 0")
    }
    return Math.round(principle * Math.pow(1 + (interestRate / 100), numberOfYears));
}
export default calculateCompoundedFutureValue;