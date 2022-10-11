import React from "react";

class AnimatedProgressbar extends React.Component {
  static defaultProps = {
    interval: 3000,
  };

  state = {
    valuesIndex: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
      });
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default AnimatedProgressbar;
