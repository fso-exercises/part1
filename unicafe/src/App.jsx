import {useState} from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const MetricRow = (props) => {
  const formattedValue = `${props.value} ${props.symbol?.trim() ?? ''}`

  return (
      <tr>
        <td>{props.text}</td>
        <td>{formattedValue}</td>
      </tr>
  )
}

const PercentileMetricRow = ({ symbol, ...props }) =>
    <MetricRow {...props} symbol={'%'}/>

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
        <p>
          No feedback given
        </p>
    )
  }

  const average = (good - bad) / total
  const positive = 100 * good / total
  
  return (
      <table>
        <tbody>
        <MetricRow text={'good'} value={good}/>
        <MetricRow text={'neutral'} value={neutral}/>
        <MetricRow text={'bad'} value={bad}/>
        <MetricRow text={'all'} value={total}/>
        <MetricRow text={'average'} value={average}/>
        <PercentileMetricRow text={'positive'} value={positive}/>
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodFeedback = () => setGood(good + 1)
  const addNeutralFeedback = () => setNeutral(neutral + 1)
  const addBadFeedback = () => setBad(bad + 1)

  return (
      <div>
        <Header name={'give feedback'}/>
        <Button onClick={addGoodFeedback} text={'good'} />
        <Button onClick={addNeutralFeedback} text={'neutral'} />
        <Button onClick={addBadFeedback} text={'bad'} />
        <Header name={'statistics'}/>
        <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
        />
      </div>
  )
}

export default App
