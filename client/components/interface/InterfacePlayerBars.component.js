// MobX
import { observer } from 'mobx-react';
import {action, reaction, observable, observe, computed, autorun, asStructure, runInAction, toJs } from 'mobx';
// Chart
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, Surface, Sector, LabelList, XAxis, Tooltip, Area, Bar, Legend, YAxis, Scatter, Line, Brush } from "recharts";
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

const colors = scaleOrdinal(schemeCategory10).range();

const data01 = [
	{ x: 100, y: 200, z: 200, errorY: [20, 30], errorX: 30 },
	{ x: 120, y: 100, z: 260, errorY: 20, errorX: [20, 30] },
	{ x: 170, y: 300, z: 400, errorY: [12, 8], errorX: 20 },
	{ x: 140, y: 250, z: 280, errorY: 23, errorX: [12, 8] },
	{ x: 150, y: 400, z: 500, errorY: [21, 10], errorX: 23 },
	{ x: 110, y: 280, z: 200, errorY: 21, errorX: [21, 10] },
];


@observer
class InterfacePlayerBars extends React.Component {


	get chartData() {
		return _.map(this.props.playerData.output, (value, name)=> ({ name, value: Math.round((+value) * 10) }))
	};

	render() {
		return (
			<ResponsiveContainer>
				<Surface width={500} height={1000}>
					<Sector fill="#ff7902" cx={200} cy={200} innerRadius={150} outerRadius={200} endAngle={90} />
					<Sector
						fill="#287902"
						cx={200}
						cy={400}
						innerRadius={180}
						outerRadius={200}
						startAngle={45}
						endAngle={135}
						cornerRadius={10}
					/>
				</Surface>
			</ResponsiveContainer>
		)
	}
}


export default InterfacePlayerBars