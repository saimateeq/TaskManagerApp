import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { TaskStats } from '../selectors/taskSelector';


export default function Chart() {

const Stats = useSelector(TaskStats)
const data = Object.entries(Stats || {})
        .filter(([_, value]) => value !== 0)
        .map(([key, value], index) => ({
            id: index,
            label: key,
            value: value,
        }));
const settings = {
    margin: { right: 5 },
    width: 150,
    height: 150,
    hideLegend: true,
};


    return (
        <PieChart
            series={[{ innerRadius: 30, outerRadius: 75, data, arcLabel: (item) => `${item.value}` }]}
            colors={["#FC8121", "#016630", "#9F0712"]}
            {...settings}
        />
    );
}
