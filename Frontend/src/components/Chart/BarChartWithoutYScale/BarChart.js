import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import BarChartStyle from "./BarChart.module.scss";

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

function BarChart({ labels, label, data }) {
  return (
    <div className={BarChartStyle["chart-wrapper"]}>
      <Bar
        plugins={[plugin]}
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: "#4361ee",
              // borderColor: "#4361ee",
              // borderWidth: 1,
              // tension: 0.4,
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
              display: false,

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

export default BarChart;
