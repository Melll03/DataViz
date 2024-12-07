const monthlyData2019 = {
    Janvier: [8793, 785, 180],
    Février: [38731, 2084, 908],
    Mars: [32532, 1231, 460],
    Avril: [9959, 333, 147],
  };
  
  const monthlyData2020 = {
    Janvier: [10433, 1035, 285],
    Février: [20753, 1536, 393],
    Mars: [7388, 868, 125],
    Avril: [1112, 49, 12],
  };
  
  const colors = [
  "rgb( 150 , 47 , 55)",
  "rgb( 255 , 188 , 64)",
  "rgb( 60 , 110 , 112)",
  ];
  
  let pieChartInstance2020 = null;
  let pieChartInstance2019 = null;
  
  function updateChart(month) {
    const data2020 = monthlyData2020[month];
    const data2019 = monthlyData2019[month];
  
    if (!data2020 || !data2019) {
        alert("Aucune donnée disponible pour ce mois.");
        return;
    }
  
    const pieData2020 = {
        labels: ["Chine", "Japon", "Taïwan"],
        datasets: [{
            label: `Répartition des Étudiants en 2020 (${month})`,
            data: data2020,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.4', '1')),
            borderWidth: 1,
        }]
    };
  
    const pieData2019 = {
        labels: ["Chine", "Japon", "Taïwan"],
        datasets: [{
            label: `Répartition des Étudiants en 2019 (${month})`,
            data: data2019,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.4', '1')),
            borderWidth: 1,
        }]
    };
  
    const pieConfig = {
        type: "pie",
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#ffffff", 
                    },
                },
                title: {
                    display: true,
                    text: `Répartition des Étudiants en ${month}`,
                    color: "#ffffff", 
                },
            },
        },
    };
  
    if (pieChartInstance2020) pieChartInstance2020.destroy();
    if (pieChartInstance2019) pieChartInstance2019.destroy();
  
    const ctx2020 = document.getElementById("pieChart2020").getContext("2d");
    const ctx2019 = document.getElementById("pieChart2019").getContext("2d");
    
    pieChartInstance2020 = new Chart(ctx2020, { ...pieConfig, data: pieData2020 });
    pieChartInstance2019 = new Chart(ctx2019, { ...pieConfig, data: pieData2019 });
  
    updateTable(month);
  }
  
  function updateTable(month) {
    const data2020 = monthlyData2020[month];
    const data2019 = monthlyData2019[month];
    const tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
  
    const newRow = tableBody.insertRow();
    const nationalities = ["Chine", "Japon", "Taïwan"];
  
    newRow.insertCell(0).textContent = month;
    data2019.forEach(data => newRow.insertCell().textContent = data);
    data2020.forEach(data => newRow.insertCell().textContent = data);
  }
  
  window.onload = function() {
    updateChart('Janvier');
  };