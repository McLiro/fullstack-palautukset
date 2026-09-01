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

const StatisticLine = ({text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad, average, positive, totalFeedback}) => {
  if (totalFeedback == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good}/>
          <StatisticLine text={"Neutral"} value={neutral}/>
          <StatisticLine text={"Bad"} value={bad}/>
          <StatisticLine text={"All"} value={good + neutral + bad}/>
          <StatisticLine text={"Average"} value={average}/>
          <StatisticLine text={"Positive"} value={positive}/>
        </tbody>
      </table>
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
    if (totalFeedback == 0) {
      return 0
    }
    return ((good - bad) / totalFeedback)
  }

  const getPositive = () => {
    if (totalFeedback == 0) {
      return 0
    }
    return (good / totalFeedback)
  }

  const totalFeedback = (good + neutral + bad)

  return (
    <div>
      <Header header={"Give feedback"}/>
      <Button onClick={increaseGood} text={"Good"}/>
      <Button onClick={increaseNeutral} text={"Neutral"}/>
      <Button onClick={increaseBad} text={"Bad"}/>
      <Header header={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={neutral} average={getAverage()} positive={getPositive()} totalFeedback={totalFeedback}/>
    </div>
  )
}

export default App