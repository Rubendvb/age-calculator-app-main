import './App.css'

function App() {
  return (
    <>
      <div className="card">
        <header className="header">
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
        </header>

        <main>
          <div>
            <p className="main__p">
              <span>- -</span> years
            </p>
          </div>
          <div>
            <p className="main__p">
              <span>- -</span> months
            </p>
          </div>
          <div>
            <p className="main__p">
              <span>- -</span> days
            </p>
          </div>
        </main>
      </div>

      <footer className="attribution">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Rubén</a>.
      </footer>
    </>
  )
}

export default App
