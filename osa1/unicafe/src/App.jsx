import { useState } from 'react'

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Counter = ({text, total }) => {
  return (
    <>
      <p>{text} {total}</p>
    </>
  )
}

const Statistics = ({good, neutral, bad, average, positive}) => {
  return (
    <>
      <Counter text={"Good"} total={good}/>
      <Counter text={"Neutral"} total={neutral}/>
      <Counter text={"Bad"} total={bad}/>
      <Counter text={"All"} total={good + neutral + bad}/>
      <Counter text={"Average"} total={average}/>
      <Counter text={"Positive"} total={positive}/>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  const getAverage = () => {
    if (sum == 0) {
      return 0
    }
    return ((good - bad) / sum)
  }

  const getPositive = () => {
    if (sum == 0) {
      return 0
    }
    return (good / sum)
  }

  const sum = (good + neutral + bad)

  return (
    <div>
      <Header header={"Give feedback"}/>
      <Button onClick={increaseGood} text={"Good"}/>
      <Button onClick={increaseNeutral} text={"Neutral"}/>
      <Button onClick={increaseBad} text={"Bad"}/>
      <Header header={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={neutral} average={getAverage()} positive={getPositive()}/>
    </div>
  )
}

export default App