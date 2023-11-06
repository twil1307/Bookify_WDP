import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import DualLineChartStyle from "./DualLineChart.module.scss";

const plugin = {
  beforeInit(chart) {
    // Get reference to the original fit function
    const originalFit = chart.legend.fit;

    // Override the fit function
    chart.legend.fit = function fit() {
      // Call original function and bind scope in order to use `this` correctly inside it
      originalFit.bind(chart.legend)();
      // Change the height as suggested in another answers
      this.height += 30;
    };
  },
};

// Note
// labels: Array
// label1: String
// label2: String
// data1: Array
// data2: Array

function DualLineChart({ labels, label1, data1, label2, data2 }) {
  return (
    <div className={DualLineChartStyle["chart-wrapper"]}>
      <Line
        plugins={[plugin]}
        data={{
          labels: labels,
          datasets: [
            {
              label: label1,
              data: data1,
              backgroundColor: "#4361ee",
              borderColor: "#4361ee",
              borderWidth: 1,
              tension: 0.4,
            },
            {
              label: label2,
              data: data2,
              backgroundColor: "#F72585",
              borderColor: "#F72585",
              borderWidth: 1,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                display: true,
                color: "#000",
                family: "'Poppins', 'sans-serif'",
              },

              // to remove the x-axis grid
              grid: {
                drawBorder: true,
                borderColor: "#000",
                borderWidth: 2,
                display: false,
              },
            },
            y: {
              beginAtZero: true,

              ticks: {
                display: false,
                beginAtZero: true,
              },
              // to remove the y-axis grid
              grid: {
                drawBorder: true,
                borderColor: "#000",
                borderWidth: 2,

                display: false,
              },
            },
            title: {
              display: false,
            },
          },

          plugins: {
            legend: {
              position: "top",
              align: "start",
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 12,
                  family: "'Poppins', 'sans-serif'",
                },
              },
              title: {
                display: true,
                align: "start",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DualLineChart;
