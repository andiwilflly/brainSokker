// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Chart
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, PieChart, Sector, LabelList, Cell, Legend, Pie } from "recharts";
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

const colors = scaleOrdinal(schemeCategory10).range();

const data01 = [
	{ name: 'GK', value: 0.1 },
	{ name: 'DEF', value: 0.2 },
	{ name: 'MID', value: 0.8 },
	{ name: 'ATT', value: 1 }
];

const player = {
	"name": "Miltos Kotsou",
	"age": 0.35,
	"stamina": 0.11,
	"keeper": 0,
	"pace": 0.14,
	"defender": 0.11,
	"technique": 0.08,
	"playmaker": 0.06,
	"passing": 0.08,
	"striker": 0.07
};


@observer
class InterfacePlayerChart extends React.Component {

	@observable activeIndex = -1;


	get chartData() {
		return _.map(this.props.playerData.output, (value, name)=> ({ name, value: +value }))
	};


	renderActiveShape = (props)=> {
		const RADIAN = Math.PI / 180;
		const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
			fill, payload, percent } = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
					{ `${payload.name}` }
				</text>
				{/*<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#333">
					{`${payload.value}`}
				</text>*/}
			</g>
		);
	};


	onPieEnter = (data, index, e)=> {
		this.activeIndex = index;
	};


	render() {
		return (
			<ResponsiveContainer>
				<PieChart width={100} height={100}>
					<Legend verticalAlign="top" align="right" />
					<Pie data={this.chartData}
						 dataKey="value"
						 activeShape={this.renderActiveShape}
						 activeIndex={this.activeIndex}
						 onMouseEnter={this.onPieEnter}
						 cx={'50%'}
						 cy={'50%'}
						 innerRadius={0}
						 outerRadius={70}>
						{ data01.map((entry, index)=> (
							<Cell key={`slice-${index}`} fill={colors[index % 10]} />
						)) }
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		)
	}
}


export default InterfacePlayerChart