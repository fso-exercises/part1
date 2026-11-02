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

const Statistics = (props) => {
  if (props.total === 0) {
    return (
        <p>
          No feedback given
        </p>
    )
  }

  return (
      <table>
        <tbody>
        <MetricRow text={'good'} value={props.good}/>
        <MetricRow text={'neutral'} value={props.neutral}/>
        <MetricRow text={'bad'} value={props.bad}/>
        <MetricRow text={'all'} value={props.total}/>
        <MetricRow text={'average'} value={props.average}/>
        <PercentileMetricRow text={'positive'} value={props.positive}/>
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total

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
            total={total}
            average={average}
            positive={positive}
        />
      </div>
  )
}

export default App
