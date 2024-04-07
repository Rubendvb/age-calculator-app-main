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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'day') {
      if (Number(value) > 31) {
        setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
        return
      }

      setUserDay(Number(value))
      setErrorMessage({ ...errorMessage, day: '' })
    } else if (name === 'month') {
      if (Number(value) > 12 || Number(value) < 0) {
        setErrorMessage({ ...errorMessage, month: 'Must be a valid month' })
        return
      }

      const selectedMonth = Number(value)
      const daysInMonth = moment(
        `${currentYear}-${selectedMonth}`,
        'YYYY-MM'
      ).daysInMonth()

      if (Number(userDay) > daysInMonth) {
        setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
        return
      }

      setUserMonth(Number(value))
      setErrorMessage({ ...errorMessage, month: '' })
    } else if (name === 'year') {
      if (Number(value) > currentYear) {
        setErrorMessage({ ...errorMessage, year: 'Must be in the past' })
        return
      }

      setUserYear(Number(value))
      setErrorMessage({ ...errorMessage, year: '' })
    }

    setErrorMessage({ ...errorMessage, [name]: '' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userDay === '' || userMonth === '' || userYear === '') {
      setErrorMessage({ ...errorMessage, required: 'This field is required' })
      return
    }

    // Creating Moment.js objects for user date and current date
    const userDate = moment(`${userYear}-${userMonth}-${userDay}`, 'YYYY-MM-DD')
    const currentDate = moment()

    if (userDate.isAfter(currentDate)) {
      setErrorMessage({ ...errorMessage, day: 'Must be in the past' })
      return
    }

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
          type="number"
          placeholder="DD"
          id="day"
          name="day"
          value={userDay === null ? '' : userDay}
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
          value={userMonth === null ? '' : userMonth}
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
          value={userYear === null ? '' : userYear}
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
