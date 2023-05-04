
chart.render();
colors = ["#727cf5", "#6c757d"];
(dataColors = $("#spline-area").data("colors")) && (colors = dataColors.split(","));
options = {
    chart: { height: 380, type: "area" },
    dataLabels: { enabled: !1 },
    stroke: { width: 3, curve: "smooth" },
    colors: colors,
    series: [
        { name: "Series 1", data: [31, 40, 28, 51, 42, 52, 100] },
        { name: "Series 2", data: [11, 32, 45, 32, 34, 52, 41] },
    ],
    legend: { offsetY: 5 },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    tooltip: { fixed: { enabled: !1, position: "topRight" } },
    grid: { borderColor: "#f1f3fa" },
};
(chart = new ApexCharts(document.querySelector("#spline-area"), options)).render();

     
