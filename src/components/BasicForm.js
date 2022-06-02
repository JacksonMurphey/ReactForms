import useInput from "../hooks/use-input";

const BasicForm = () => {

  const {
    value: enteredFName,
    isValid: fNameIsValid,
    hasError: fNameHasError,
    valueChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: resetFNameInput,
    inputFormClass: fNameForm
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredLName,
    isValid: lNameIsValid,
    hasError: lNameHasError,
    valueChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: resetLNameInput,
    inputFormClass: lNameForm
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    inputFormClass: emailForm
  } = useInput((value) => value.trim().includes('@'))


  //Not at all certain as to why when I passed a function to useInput2, that it threw an error claiming value wasnt yet defined. 
  // const {
  //   value: enteredFName,
  //   isValid: fNameIsValid,
  //   hasError: fNameHasError,
  //   inputChangeHandler: fNameChangeHandler,
  //   onBlurHandler: fNameBlurHandler,
  //   reset: resetFNameInput,
  //   inputFormClass: fNameForm
  // } = useInput2((value) = value.trim() !== '')

  // const {
  //   value: enteredLName,
  //   isValid: lNameIsValid,
  //   hasError: lNameHasError,
  //   inputChangeHandler: lNameChangeHandler,
  //   onBlurHandler: lNameBlurHandler,
  //   reset: resetLNameInput,
  //   inputFormClass: lNameForm
  // } = useInput2((value) = value.trim() !== '')

  // const {
  //   value: enteredEmail,
  //   isValid: emailIsValid,
  //   hasError: emailHasError,
  //   inputChangeHandler: emailChangeHandler,
  //   onBlurHandler: emailBlurHandler,
  //   reset: resetEmailInput,
  //   inputFormClass: emailForm
  // } = useInput2((value) = value.trim().includes('@'))


  let formIsValid = false
  if (fNameIsValid && lNameIsValid && emailIsValid) { formIsValid = true }


  const submitHandler = e => {
    e.preventDefault()
    if (!fNameIsValid) return
    if (!lNameIsValid) return
    if (!emailIsValid) return

    resetEmailInput()
    resetFNameInput()
    resetLNameInput()
  }

  const firstNameClass = fNameForm(fNameHasError)
  const lastNameClass = lNameForm(lNameHasError)
  const emailClass = emailForm(emailHasError)

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClass}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={enteredFName}
            onBlur={fNameBlurHandler}
            onChange={fNameChangeHandler}
          />
          {fNameHasError && <p className='error-text'>First Name cannot be empty.</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={enteredLName}
            onBlur={lNameBlurHandler}
            onChange={lNameChangeHandler}
          />
          {lNameHasError && <p className='error-text'>Last Name cannot be empty.</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {emailHasError && <p className='error-text'>Email must be Valid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
