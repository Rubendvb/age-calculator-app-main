import { useState } from 'react'
import moment from 'moment'

interface FormProps {
  setCalculatedDay: React.Dispatch<React.SetStateAction<number>>
  setCalculatedMonth: React.Dispatch<React.SetStateAction<number>>
  setCalculatedYear: React.Dispatch<React.SetStateAction<number>>
}

export default function Form({
  setCalculatedDay,
  setCalculatedMonth,
  setCalculatedYear,
}: FormProps) {
  const [userDay, setUserDay] = useState<number | ''>('')
  const [userMonth, setUserMonth] = useState<number | ''>('')
  const [userYear, setUserYear] = useState<number | ''>('')
  const [errorMessage, setErrorMessage] = useState({
    day: '',
    month: '',
    year: '',
    required: '',
  })

  const currentYear = new Date().getFullYear()
  const isLeapYear = moment([userYear]).isLeapYear()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'day') {
      const dayValue = Number(value)

      setUserDay(dayValue)

      if (dayValue > 31 || dayValue < 0) {
        setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
        return
      } else {
        setErrorMessage({ ...errorMessage, day: '' })
      }
    }

    if (name === 'month') {
      const monthValue = Number(value)

      setUserMonth(monthValue)

      if (monthValue > 12 || monthValue < 0) {
        setErrorMessage({ ...errorMessage, month: 'Must be a valid month' })
        return
      } else {
        setErrorMessage({ ...errorMessage, month: '' })
      }
    }

    if (name === 'year') {
      const yearValue = Number(value)

      setUserYear(yearValue)

      if (yearValue < 0) {
        setErrorMessage({ ...errorMessage, year: 'Must be a valid year' })
        return
      }

      if (yearValue > currentYear) {
        setErrorMessage({ ...errorMessage, year: 'Must be in the past' })
        return
      } else {
        setErrorMessage({ ...errorMessage, year: '' })
      }
    }

    setErrorMessage({ ...errorMessage, [name]: '' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userDay === '' || userMonth === '' || userYear === '') {
      setErrorMessage({ ...errorMessage, required: 'This field is required' })
      return
    }

    if (errorMessage.day || errorMessage.month || errorMessage.year) {
      return
    }

    if (!isLeapYear && userMonth === 2 && userDay > 28) {
      setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
      return
    }

    if (isLeapYear && userMonth === 2 && userDay > 29) {
      setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
      return
    }

    const userDate = moment(`${userYear}-${userMonth}-${userDay}`)
    const currentDate = moment(new Date(), 'YYYY-MM-DD')

    const yearsDiff = currentDate.diff(userDate, 'years')
    const lastBirthday = userDate.clone().add(yearsDiff, 'years')
    const monthsDiff = currentDate.diff(lastBirthday, 'months')
    const daysDiff = currentDate.diff(
      lastBirthday.add(monthsDiff, 'months'),
      'days'
    )

    // Setting calculated values
    setCalculatedYear(yearsDiff)
    setCalculatedMonth(monthsDiff)
    setCalculatedDay(daysDiff)

    // Resetting form inputs
    setUserDay('')
    setUserMonth('')
    setUserYear('')
    setErrorMessage({
      ...errorMessage,
      day: '',
      month: '',
      year: '',
      required: '',
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__container">
        <label
          className={`${
            errorMessage.day || errorMessage.required ? 'color-erro' : null
          } form__label`}
          htmlFor="day"
        >
          Day
        </label>
        <input
          className={`${
            errorMessage.day || errorMessage.required ? 'border-erro' : null
          } form__input`}
          type="text"
          placeholder="DD"
          id="day"
          name="day"
          value={userDay === 0 ? '' : userDay}
          onChange={(e) => handleInput(e)}
        />

        <span className="form__span__erro">
          {`${errorMessage.day || errorMessage.required}`}
        </span>
      </div>

      <div className="form__container">
        <label
          className={`${
            errorMessage.month || errorMessage.required ? 'color-erro' : null
          } form__label`}
          htmlFor="month"
        >
          Month
        </label>
        <input
          className={`${
            errorMessage.month || errorMessage.required ? 'border-erro' : null
          } form__input`}
          type="number"
          placeholder="MM"
          id="month"
          name="month"
          value={userMonth === 0 ? '' : userMonth}
          onChange={(e) => handleInput(e)}
        />

        <span className="form__span__erro">
          {`${errorMessage.month || errorMessage.required}`}
        </span>
      </div>

      <div className="form__container">
        <label
          className={`${
            errorMessage.year || errorMessage.required ? 'color-erro' : null
          } form__label`}
          htmlFor="year"
        >
          Year
        </label>
        <input
          className={`${
            errorMessage.year || errorMessage.required ? 'border-erro' : null
          } form__input`}
          type="number"
          placeholder="YYYY"
          id="year"
          name="year"
          value={userYear === 0 ? '' : userYear}
          onChange={(e) => handleInput(e)}
        />

        <span className="form__span__erro">
          {`${errorMessage.year || errorMessage.required}`}
        </span>
      </div>

      <button className="form__button" type="submit">
        <img src="/icon-arrow.svg" alt="" />
      </button>
    </form>
  )
}
