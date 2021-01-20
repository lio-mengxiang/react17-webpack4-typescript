import * as React from "react"
import ReactDOM from "react-dom"

export interface Props {
  name: string
  enthusiasmLevel?: number
}

interface State {
  currentEnthusiasm: number
}

class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { currentEnthusiasm: props.enthusiasmLevel || 1 }
  }

  onIncrement = () => {
    const { currentEnthusiasm } = this.state
    this.updateEnthusiasm(currentEnthusiasm + 1)
  }

  updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm })
  }

  render() {
    const { name } = this.props
    const { currentEnthusiasm } = this.state

    if (currentEnthusiasm <= 0) {
      throw new Error("You could be a little more enthusiastic. :D")
    }
    return (
      <div className="hello">
        <div className="greeting">Hello {name}</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Hello name="123" />, window.document.getElementById("root"))
