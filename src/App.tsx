import { useState } from 'react'

import Form from './Form/Form'

import './App.css'

function App() {
  const [calculatedDay, setCalculatedDay] = useState(0)
  const [calculatedMonth, setCalculatedMonth] = useState(0)
  const [calculatedYear, setCalculatedYear] = useState(0)

  return (
    <>
      <div className="card">
        <header className="header">
          <Form
            setCalculatedDay={setCalculatedDay}
            setCalculatedMonth={setCalculatedMonth}
            setCalculatedYear={setCalculatedYear}
          />
        </header>

        <main>
          <div>
            <p className="main__p">
              <span>{calculatedYear ? calculatedYear : '- -'}</span> years
            </p>
          </div>
          <div>
            <p className="main__p">
              <span>{calculatedMonth ? calculatedMonth : '- -'}</span> months
            </p>
          </div>
          <div>
            <p className="main__p">
              <span>{calculatedDay ? calculatedDay : '- -'}</span> days
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
