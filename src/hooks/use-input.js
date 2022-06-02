import React, { useState, useReducer } from 'react'

const initialState = {
    value: '',
    isTouched: false
}
const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
        return { value: action.value, isTouched: state.isTouched }
    }
    if (action.type === "BLUR") {
        return { isTouched: true, value: state.value }
    }
    if (action.type === "RESET") {
        return { value: '', isTouched: false }
    }

    return inputStateReducer
}


//--Creating Hook to Manage Input and Form Validity--
const useInput = (validateValue) => {

    const [state, dispatch] = useReducer(inputStateReducer, initialState)
    // const [enterdValue, setEnteredValue] = useState('')
    // const [isTouched, setIsTouched] = useState(false)


    //Receiving the function validateValue, which we will use to validate inputs.
    const valueIsValid = validateValue(state.value)
    const hasError = !valueIsValid && state.isTouched

    const valueChangeHandler = e => {
        // setEnteredValue(e.target.value)
        dispatch({ type: 'INPUT', value: e.target.value })
    }
    const inputBlurHandler = () => {
        // setIsTouched(true)
        dispatch({ type: "BLUR" })
    }
    const reset = () => {
        // setEnteredValue('')
        // setIsTouched(false)
        dispatch({ type: "RESET" })
    }

    const inputFormClass = (hasError) => {
        return (
            hasError
                ? 'form-control invalid'
                : 'form-control'
        )
    }
    return {
        value: state.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        inputFormClass
    }
}

export default useInput