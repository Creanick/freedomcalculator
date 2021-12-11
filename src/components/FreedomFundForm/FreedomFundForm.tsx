import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { FreedomFormValues } from "../../hooks/use_freedom_fund_form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import LabeledInput from "../LabeledInput/LabeledInput";

const wrapperWidth = "300px";
const Wrapper = styled.form`
    box-sizing: border-box;
    width: ${wrapperWidth};
    max-width: ${wrapperWidth};
    padding: 20px;
    display: grid;
    gap:18px;
    @media screen and (max-width:${wrapperWidth}){
        width:100%;
    }
`;
interface Props {
    className?: string
    onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
    isValid?: boolean
    touched: { [index in keyof FreedomFormValues]?: boolean }
    errors: { [index in keyof FreedomFormValues]?: string }
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    values: FreedomFormValues
}
const FreedomFundForm: FunctionComponent<Props> = ({ onSubmit, isValid = false, touched, errors, onBlur, onChange, onFocus, values, className }) => {
    const freedomFundFormInputProperties: {
        id: keyof FreedomFormValues,
        inputType: string,
        placeholder: string,
        label: string
    }[] = [
            {
                id: "monthlyExpense",
                placeholder: "0",
                inputType: "number",
                label: "Monthly Expense"
            },
            {
                id: "currentAge",
                placeholder: "0 years",
                inputType: "number",
                label: "Current Age"
            },
            {
                id: "freedomAge",
                placeholder: "0 years",
                inputType: "number",
                label: "Freedom Age"
            },
            {
                id: "lifeExpectancy",
                placeholder: "0 years",
                inputType: "number",
                label: "LifeExpectancy"
            },
            {
                id: "inflationRate",
                placeholder: "0%",
                inputType: "number",
                label: "Inflation Rate"
            },
            {
                id: "postFreedomReturn",
                placeholder: "0%",
                inputType: "number",
                label: "Post Freedom Return"
            },
        ];
    return (
        <Wrapper onSubmit={onSubmit} className={className}>
            {
                freedomFundFormInputProperties.map(({ id, inputType, label, placeholder }) => {
                    const isError = touched[id] && (errors[id] !== undefined);
                    return (
                        <LabeledInput key={id} idFor={id} showError={isError} errorMessage={errors[id]} inputElement={<Input error={isError} type={inputType}
                            onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} id={id} value={values[id]} onChange={onChange} />}>{label}</LabeledInput>
                    )

                })
            }
            <Button type="submit" disabled={!isValid}>Calculate</Button>
        </Wrapper>
    )
}

export default FreedomFundForm;
