import React, { useState, useEffect } from 'react'
//Slimmed down, updated, version of SimpleInput

import useInput from '../hooks/use-input'

const SimpleInput2 = () => {
    //--Using our Hook to slim down this component--
    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput((value) => value.trim() !== '')

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput((value) => value.trim().includes('@'))

    //--State Variables--
    // const [name, setName] = useState('')
    // const [nameInputTouched, setNameInputTouched] = useState(false)
    // const [email, setEmail] = useState('')
    // const [emailInputTouched, setEmailInputTouched] = useState(false)

    //--Creating Validity checks w/o State--
    // const nameIsValid = name.trim() !== ''
    // const nameInputIsInvalid = !nameIsValid && nameInputTouched
    // const emailIsValid = email.trim().includes('@')
    // const emailInputIsInvalid = !emailIsValid && emailInputTouched

    //--Setting Form Validity--
    let formIsValid = false
    if (nameIsValid && emailIsValid) { formIsValid = true }


    //--Input Change Handlers--
    // const nameChangeHandler = e => {
    //     setName(e.target.value)
    // }
    // const emailChangeHandler = e => {
    //     setEmail(e.target.value)
    // }

    //--Input Blur Handlers--
    // const nameBlurHandler = () => {
    //     setNameInputTouched(true)
    // }
    // const emailBlurHandler = () => {
    //     setEmailInputTouched(true)
    // }

    //--Submission Handler--
    const submitHandler = e => {
        e.preventDefault()
        // setNameInputTouched(true)
        if (!nameIsValid) { return }
        if (!emailIsValid) { return }
        //--Reseting the input field upon submission--
        // setName('')
        // setNameInputTouched(false)
        // setEmail('')
        // setEmailInputTouched(false)
        resetNameInput()
        resetEmailInput()
    }


    //--Variable made for conditional styling--
    const nameFormClasses = nameHasError
        ? 'form-control invalid'
        : 'form-control'
    const emailFormClasses = emailHasError
        ? 'form-control invalid'
        : 'form-control'

    return (
        <form onSubmit={submitHandler}>
            <div className={nameFormClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    value={enteredName}
                    onBlur={nameBlurHandler}
                    type='text'
                    id='name'
                    onChange={nameChangeHandler}
                />
                {nameHasError && <p className='error-text'>Name cannot be empty.</p>}
            </div>
            <div className={emailFormClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    value={enteredEmail}
                    onBlur={emailBlurHandler}
                    type='text'
                    id='email'
                    onChange={emailChangeHandler}
                />
                {emailHasError && <p className='error-text'>You must provide a valid email.</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    )
}

export default SimpleInput2