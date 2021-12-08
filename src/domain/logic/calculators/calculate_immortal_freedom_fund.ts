import calculateFreedomFund, { CalculateFreedomFund } from "./calculate_freedom_fund";
const calculateImmortalFreedomFund = (params: CalculateFreedomFund) => {
    return calculateFreedomFund({ ...params, totalYears: Infinity });
}
export default calculateImmortalFreedomFund;