import { FormikErrors, useFormik } from "formik"
import { useState } from "react";
import calculateCompoundedFutureMonthlyExpense from "../domain/logic/calculators/calculate_compounded_future_monthly_expense";
import calculateImmortalFreedomFund from "../domain/logic/calculators/calculate_immortal_freedom_fund";
import calculateMortalFreedomFund from "../domain/logic/calculators/calculate_mortal_freedom_fund";

export interface FreedomFormValues {
    monthlyExpense: number
    currentAge: number
    freedomAge: number
    lifeExpectancy: number
    inflationRate: number
    postFreedomReturn: number
}
interface FreedomFundFormConfig {
    onSubmit?(values: FreedomFormValues): void
}
const useFreedomFundForm = ({ onSubmit }: FreedomFundFormConfig) => {
    const formik = useFormik<FreedomFormValues>({
        initialValues: {
            monthlyExpense: 50000,
            currentAge: 20,
            freedomAge: 40,
            lifeExpectancy: 80,
            inflationRate: 6,
            postFreedomReturn: 10
        },
        validate: (values) => {
            const errors: FormikErrors<FreedomFormValues> = {};
            if (values.monthlyExpense < 0 || values.monthlyExpense > 999999999) {
                errors.monthlyExpense = "Monthly Expense is out of normal range";
            }
            if (values.currentAge < 1 || values.currentAge > 200) {
                errors.currentAge = "Current Age must be between 1 and 200";
            }
            if (values.freedomAge < 1 || values.freedomAge > 200) {
                errors.freedomAge = "Freedom Age must be between 1 and 200";
            }
            if (values.lifeExpectancy < 1 || values.lifeExpectancy > 200) {
                errors.lifeExpectancy = "Life Expentancy must be between 1 and 200";
            }
            if (values.inflationRate < 0) {
                errors.inflationRate = "Inflation rate must be positive";
            }
            if (values.postFreedomReturn < 0) {
                errors.postFreedomReturn = "Post Freedom Return must be positive";
            }
            if ((values.freedomAge - values.currentAge) < 0) {
                errors.freedomAge = "Freedom Age must be greater or equal to current age";
                errors.currentAge = "Current Age must be less than or equal to freedom age";
            }
            if ((values.lifeExpectancy - values.freedomAge) < 0) {
                errors.freedomAge = "Freedom Age must be less than or equals to life expectancy";
                errors.lifeExpectancy = "Life Expectancy must be greater or equal to freedom age"
            }
            if (values.postFreedomReturn <= values.inflationRate) {
                errors.inflationRate = "Inflation rate must be less than post freedom return";
                errors.postFreedomReturn = "Post Freedom Return Rate must be greater than inflation rate";
            }
            return errors;
        },
        onSubmit: (values) => {
            try {
                setMonthlyExpenseAtFreedom(getMonthlyExpenseAtFreedom(values));
                setTotalImmortalFund(getTotalImmortalFund(values));
                setTotalMortalFund(getMortalFund(values));
                setsubmittedFormValues(values);
                if (onSubmit) {
                    onSubmit(values);
                }
            } catch (error) {
                console.error("Freedom Fund Calculation failed");
            }
        }
    });
    const getMonthlyExpenseAtFreedom = (values: FreedomFormValues) => {
        return calculateCompoundedFutureMonthlyExpense({
            currentAge: values.currentAge,
            futureAge: values.freedomAge,
            currentMonthlyExpense: values.monthlyExpense,
            inflationRate: values.inflationRate
        });
    }
    const getTotalImmortalFund = (values: FreedomFormValues) => {
        return calculateImmortalFreedomFund({
            ...values,
            monthlyExpense: getMonthlyExpenseAtFreedom(values)
        });
    }
    const getMortalFund = (values: FreedomFormValues) => {
        return calculateMortalFreedomFund({
            inflationRate: values.inflationRate,
            monthlyExpense: getMonthlyExpenseAtFreedom(values),
            postFreedomReturn: values.postFreedomReturn,
            totalYears: values.lifeExpectancy - values.freedomAge
        });
    }
    const [submittedFormValues, setsubmittedFormValues] = useState<FreedomFormValues>(formik.initialValues)
    const [totalMortalFund, setTotalMortalFund] = useState(getMortalFund(formik.initialValues));
    const [monthlyExpenseAtFreedom, setMonthlyExpenseAtFreedom] = useState(getMonthlyExpenseAtFreedom(formik.initialValues));
    const [totalImmortalFund, setTotalImmortalFund] = useState(getTotalImmortalFund(formik.initialValues));
    const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const id = event.target.id;
        formik.setFieldTouched(id);
    }
    return {
        currentValues: formik.values,
        submittedValues: submittedFormValues,
        monthlyExpenseAtFreedom,
        mortalFund: totalMortalFund,
        immortalFund: totalImmortalFund,
        handleFocus,
        handleBlur: formik.handleBlur,
        handleChange: formik.handleChange,
        handleSubmit: formik.handleSubmit,
        touched: formik.touched,
        errors: formik.errors,
        isValid: formik.isValid,
    }
}

export default useFreedomFundForm