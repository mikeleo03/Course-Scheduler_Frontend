import React from "react";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
    chartData: { 
        labels: string[]; 
        datasets: { 
            label: string; 
            data: number[];
            backgroundColor: string[], 
            hoverOffset: number; 
        }[]; 
    }
}

const DoughnutChart : React.FC<DoughnutChartProps> = ({ chartData }) => {
    return (
        <Doughnut
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Daftar Pengambilan Mata Kuliah"
                    },
                    colors: {
                        enabled: false,
                    }
                }
            }}
        />
    );
}

export default DoughnutChart;