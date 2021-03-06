import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Stat } from 'g2';

class HigherChart extends Component {
  constructor(props, ...others) {
    super(props, ...others);
    this.Chart = createG2(chart => {
      this.chart = chart;
      chart.line().position('time*price').color('name').shape(props.shape).size(2);
      chart.render();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shape !== this.props.shape) {
      this.chart.clear();
      this.chart.line().position('time*price').color('name').shape(nextProps.shape).size(2);
      this.chart.render();
    }
  }

  render() {
    return (<this.Chart {...this.props} />);
  }
}

export default HigherChart;
