import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({dataPoints}) =>{
    const data = {
        labels: ['Trí nhớ cấp 1','Trí nhớ cấp 2','Trí nhớ cấp 3','Trí nhớ cấp 4','Trí nhớ cấp 5'],
        datasets:[
            {
                label:'Số từ đã học',
                data: dataPoints,
                backgroundColor:'rbga(75,192,192,0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Số từ đã học theo ngày',
          },
        },
      };
    
      return <Bar data={data} options={options} />;
}

export default BarChart;