export default function Form() {
  return (
    <form className="form">
      <div className="form__container">
        <label className="form__label" htmlFor="day">
          Day
        </label>
        <input
          className="form__input"
          type="number"
          placeholder="DD"
          id="day"
          name="day"
        />
      </div>

      <div className="form__container">
        <label className="form__label" htmlFor="month">
          Month
        </label>
        <input
          className="form__input"
          type="number"
          placeholder="MM"
          id="month"
          name="month"
        />
      </div>

      <div className="form__container">
        <label className="form__label" htmlFor="year">
          Year
        </label>
        <input
          className="form__input"
          type="number"
          placeholder="YYYY"
          id="year"
          name="year"
        />
      </div>

      <button className="form__button" type="submit">
        <img src="/icon-arrow.svg" alt="" />
      </button>
    </form>
  )
}
