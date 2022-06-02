import React, { useState } from 'react'

const useInput2 = (validateValue) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    const valueIsValid = validateValue(enteredValue)
    const hasError = !valueIsValid && isTouched


    const inputChangeHandler = e => {
        setEnteredValue(e.target.value)
    }
    const onBlurHandler = () => {
        setIsTouched(true)
    }

    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }

    const inputFormClass = (hasError) => {
        return (
            hasError
                ? 'form-control invalid'
                : 'form-control'
        )
    }


    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        inputChangeHandler,
        onBlurHandler,
        reset,
        inputFormClass
    }
}

export default useInput2