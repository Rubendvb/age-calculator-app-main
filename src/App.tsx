import './App.css'
import Form from './Form/Form'

function App() {
  return (
    <>
      <div className="card">
        <header className="header">
          <Form />
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
