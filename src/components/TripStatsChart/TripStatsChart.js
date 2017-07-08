import React, { Component } from 'react';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveCatmullRom } from '@vx/curve';
import { max } from 'd3-array';

const x = d => d.date;
const y = d => d.val;
const width = 500;
const height = 100;
const margin = {
  top: 10,
  bottom: 10,
  left: 0,
  right: 0,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

class TripStatsChart extends Component {

  render () {
    console.log(this.props.data);

    return (
      <div className="trip-stats-chart">
        <svg width={width} height={height}>
          <Group top={margin.top} left={margin.left}>
            {this.props.data.data.map((series, idx) => {
              const xScale = scaleTime({
                range: [0, xMax],
                domain: this.props.data.timeExtent
              });

              console.log("SERIES", series);
              console.log("MAX", max(series, y));

              const yScale = scaleLinear({
                range: [yMax, 0],
                domain: [0, max(series, y)],
              });

              return (
                <LinePath
                  key={idx}
                  data={series}
                  xScale={xScale}
                  yScale={yScale}
                  x={x}
                  y={y}
                  stroke="#FFFFFF"
                  strokeWidth={1}
                  curve={curveCatmullRom}
                  defined={d => (y(d) || y(d) === 0) && x(d)}
                />
              )
            })}
          </Group>
        </svg>
      </div>
    );
  }
}

export default TripStatsChart;
