import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Constants, { chartOptions } from './Constants';
import * as Utils from './Utils';

const objectPath = require('object-path');

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      labels: [],
      options: chartOptions(props),
    };
  }

  componentDidMount() {
    this.initChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initChart(nextProps);
  }


  initChart = (nextProps) => {
    const {
      id,
      period: { from, to },
      results,
      metrics,
    } = nextProps;
    const dateFrom = from.getTime();
    const dateTo = to.getTime();

    const timestamps = Utils.getTimestampsByInterval(results, dateFrom, dateTo);
    const labels = timestamps.map(date => (
      moment(new Date(date * 1000)).format('MMMM Do YYYY, kk:mm')
    ));
    const datasets = [];
    metrics.forEach((metricPath) => {
      const metric = objectPath.get(Constants.metrics, metricPath);
      const { color } = metric;
      const values = timestamps.map((date) => {
        let value = [];
        results.forEach((obj) => {
          if (obj.date === date) {
            value = objectPath.get(obj, metricPath);
          }
        });

        if (typeof metric.transform === 'function') {
          value = metric.transform(value);
        }

        return value;
      });

      const barCtx = document.getElementById(`chart${id}`).getContext('2d');
      const gradient = barCtx.createLinearGradient(0, 0, 0, barCtx.canvas.height);
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`); // show this color at 0%;
      gradient.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.25)`); // show this color at 50%;
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`); // show this color at 100%;

      datasets.push({
        backgroundColor: gradient,
        borderColor: Utils.getColor(metric.color, 1),
        pointBackgroundColor: Utils.getColor(color, 1),
        pointBorderColor: 'rgba(255, 255, 255, 0)',
        pointHoverBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        data: values,
        label: metric.name,
        lineTension: 0.5,
        pointRadius: 4,
      });
    });
    this.setState({
      datasets,
      labels,
    });
  }

  render() {
    const {
      labels,
      datasets,
      options,
    } = this.state;
    const {
      footNote,
      id,
    } = this.props;

    const placeholderClass = (labels.length < 2) ? ' c-Chart--placeholder' : '';

    return (
      <div className={`c-Chart${placeholderClass}`}>
        <Line
          id={`chart${id}`}
          data={{
            datasets,
            labels,
          }}
          options={options}
        />
        {
          footNote
          && <p className="c-Chart__footer">{footNote}</p>
        }
      </div>
    );
  }
}

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  footNote: PropTypes.object.isRequired,
};

export default Chart;
