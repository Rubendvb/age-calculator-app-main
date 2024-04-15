import { useRef, useState } from 'react'
import moment from 'moment'

import { IForm } from '../@types/date'
import { InputChange } from '../@types/general'

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
  const initialState = {
    day: '',
    month: '',
    year: '',
    required: '',
  }

  const [formData, setFormData] = useState<IForm>(initialState)
  const [errorMessage, setErrorMessage] = useState({
    day: '',
    month: '',
    year: '',
    required: '',
  })

  const dayInputRef = useRef<HTMLInputElement>(null)
  const currentYear = new Date().getFullYear()
  const isLeapYear = moment([formData.year]).isLeapYear()

  const handleInputChange = (e: InputChange) => {
    const { name, value } = e.target
    const valueNumber = Number(value)

    setFormData({ ...formData, [e.target.name]: e.target.value })

    if (name === 'day') {
      if (valueNumber > 31 || valueNumber < 0) {
        setErrorMessage({
          ...errorMessage,
          day: 'Must be a valid day',
        })
        return
      }
    }

    if (name === 'month') {
      if (valueNumber > 12 || valueNumber < 0) {
        setErrorMessage({
          ...errorMessage,
          month: 'Must be a valid month',
        })
        return
      }
    }

    if (name === 'year') {
      if (valueNumber < 0) {
        setErrorMessage({
          ...errorMessage,
          year: 'Must be a valid year',
        })

        return
      }

      if (valueNumber > currentYear) {
        setErrorMessage({
          ...errorMessage,
          year: 'Must be in the past',
        })

        return
      }
    }

    setErrorMessage({ ...errorMessage, [name]: '' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { day, month, year } = formData

    const userDate = moment(`${year}-${month}-${day}`)
    const currentDate = moment(new Date(), 'YYYY-MM-DD')
    const isValidDate = moment(userDate.format('YYYY-MM-DD')).isValid()

    if (day === '' || month === '' || year === '') {
      setErrorMessage({ ...errorMessage, required: 'This field is required' })
      return
    }

    if (errorMessage.day || errorMessage.month || errorMessage.year) {
      return
    }

    if (!isLeapYear && Number(month) === 2 && Number(day) > 28) {
      setErrorMessage({
        ...errorMessage,
        day: 'Must be a valid day',
        required: ' ',
      })
      return
    }

    if (isLeapYear && Number(month) === 2 && Number(day) > 29) {
      setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
      return
    }

    if (!isValidDate) {
      setErrorMessage({ ...errorMessage, day: 'Must be a valid day' })
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
    setFormData(initialState)
    setErrorMessage({
      ...errorMessage,
      day: '',
      month: '',
      year: '',
      required: '',
    })

    if (dayInputRef.current) {
      dayInputRef.current.focus()
    }
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
          name="day"
          id="day"
          onChange={handleInputChange}
          value={formData.day}
          placeholder="DD"
          ref={dayInputRef}
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
          name="month"
          id="month"
          onChange={handleInputChange}
          value={formData.month}
          placeholder="MM"
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
          name="year"
          id="year"
          onChange={handleInputChange}
          value={formData.year}
          placeholder="YYYY"
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
