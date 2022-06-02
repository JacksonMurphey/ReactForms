import { useRef, useState, useEffect } from 'react'


const SimpleInput = (props) => {
  //if you only need the input value once, then using useRef works. Using useState for something you just will use once can be a bit overkill
  const nameRef = useRef()
  //if you need the entered value after every keystroke 'onChange', to check for validations per say, refs cannot do that. useState what you would use.
  const [name, setName] = useState('')
  const [nameIsValid, setNameIsValid] = useState(false)
  const [nameInputTouched, setNameInputTouched] = useState(false)

  useEffect(() => {
    if (nameIsValid) {
      console.log('name is valid')
    }
  }, [nameIsValid])



  const nameChangeHandler = e => {
    setName(e.target.value)
    //Here we are checking e.target.value b/c if we were to check if our state value 'name' != an empty string, it would be checking the previous value of our state first before updating
    if (e.target.value.trim() !== '') {
      setNameIsValid(true)
    }
  }

  const nameBlurHandler = (e) => {
    setNameInputTouched(true)

    if (name.trim() === '') {
      setNameIsValid(false)
    }
  }


  const submitHandler = e => {
    e.preventDefault()
    setNameInputTouched(true)
    if (name.trim() === '') {
      setNameIsValid(false)
      return
    }
    setNameIsValid(true)

    //refs return an object, to extrapolate the input we must call our variable and use 'current.value' to get the entered value
    const enteredName = nameRef.current.value

    console.log('useState name: ' + name)
    console.log('useRef name: ' + enteredName)

    //--reseting the input field upon submission--
    setName('')
    nameRef.current.value = ''
    //This would work to clear the input field. However this isnt ideal because we are directly manipulating the DOM.
  }

  const nameInputIsInvalid = !nameIsValid && nameInputTouched

  //--Variable made for conditional styling--
  const nameFormClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control'

  return (
    <form onSubmit={submitHandler}>
      <div className={nameFormClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameRef}
          value={name}
          onBlur={nameBlurHandler}
          type='text'
          id='name'
          onChange={nameChangeHandler}
        />
        {nameInputIsInvalid && <p className='error-text'>Name cannot be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
