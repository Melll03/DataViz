document.addEventListener("DOMContentLoaded", function () {
  AOS.init(); //AOS


// Charger les données depuis le fichier JSON
d3.json('Datavisitors.json').then(data => {
    const svg = d3.select("section#tourism-graph svg");
    const margin = { top: 20, right: 30, bottom: 50, left: 95 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
  // Échelles pour les axes x et y 
  const x = d3.scaleBand()
    .domain(data.map(d => d.year)) 
    .range([0, width])
    .padding(0.1);
    
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.travellers)]) 
    .nice()
    .range([height, 0]);
    
  // Ajouter les axes
    chart.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d => d).tickSizeOuter(0))
    .selectAll("text")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .style("font-family", "Montserrat Alternates, sans-serif")
    .style("font-size", "0.7rem")
    .style("font-weight", "bold")
    .style("fill", "#FFFFFF");
    
    chart.append("g")
    .call(d3.axisLeft(y)
    .ticks(10)
    .tickFormat(d => d >= 1e6 ? `${(d / 1e6).toFixed(1)}M` : `${d}`)) 
    .selectAll("text")
    .style("font-family", "Montserrat Alternates, sans-serif")
    .style("font-size", "0.7rem")
    .style("font-weight", "bold")
    .style("fill", "#FFFFFF");
      
  //Grillage
    chart.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y)
    .tickSize(-width)
    .tickFormat("")
  )
    .selectAll("line")
    .style("stroke", "#e0e0e0");
        
  // Fonction de formatage des nombres
  function formatNumber(value) {
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + " millions"; // Formate en millions
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(0) + "k"; // Formate en milliers
    }
      return value.toString();
  }
    
  // Ajouter les barres
    chart.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.travellers))
    .attr("height", d => height - y(d.travellers))
    .attr("width", x.bandwidth())
    .style("fill", "#FFBC40")
    .style("transform-origin", d => `${x(d.year) + x.bandwidth() / 2}px ${height}px`)
    .on("mouseover", function(event, d) {
      tooltip.style("opacity", 1)
    .html(`<strong>${d.year}</strong>: ${formatNumber(d.travellers)} de touristes`); // Contenu du tooltip

     // Agrandir la barre survolée
     d3.select(this)
     .style("transform", "scale(1.3)")
     .style("fill", "#3C6E70")
     .style("z-index", 10);

      // Assombrir les autres barres
     chart.selectAll(".bar").filter(e => e !== d)
     .style("opacity", 0.5);
  })
    .on("mousemove", function(event) {
    tooltip.style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 20) + "px");
  })
    .on("mouseout", function() {
    tooltip.style("opacity", 0);

    // Réinitialiser toutes les barres à leur état initial
    chart.selectAll(".bar")
    .style("transform", "#FFBC40")
    .style("oppacity", 1);
  });
    
  // Ajouter les labels des axes x et y
   svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2 + margin.left) // Centré horizontalement
    .attr("y", height + margin.top + 50)
    .text("Années")
    .style("font-family", "Montserrat Alternates, sans-serif")
    .style("font-size", "1rem")
    .style("font-weight", "bold")
    .style("fill", "#FFFFFF");
    
    svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("x", -height / 2) // Position centré verticalement
    .attr("y", margin.left - 60)
    .attr("transform", "rotate(-90)")
    .text("Nombre de touristes (millions)")
    .style("font-family", "Montserrat Alternates, sans-serif")
    .style("font-size", "1rem")
    .style("font-weight", "bold")
    .style("fill", "#FFFFFF");
    
  // Tooltip pour afficher les données
  const tooltip = d3.select("#tooltip");
   }).catch(error => {
  console.error("Erreur lors du chargement des données :", error);
  });
       
  
  //Bouton afficher/masquer les données pour le graphique en barres

fetch('Datavisitors.json')
.then(response => response.json())
.then(data => {
    const showTableButton = document.getElementById("showTableButton");
    const tableContainer = document.getElementById("tableContainer");
    const tourismTableBody = document.getElementById("tourismTableBody");

    showTableButton.addEventListener("click", () => {
        // Afficher/Masquer le tableau
        if (tableContainer.style.display === "none" || tableContainer.style.display === "") {
            tourismTableBody.innerHTML = ""; 
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.year}</td>
                    <td>${item.travellers}</td>
                `;
                tourismTableBody.appendChild(row);
            });
            tableContainer.style.display = "block"; // Affiche le tableau
            showTableButton.textContent = "Masquer les données";
        } else {
            tableContainer.style.display = "none"; // Masque le tableau
            showTableButton.textContent = "Afficher les données";
        }
    });
});
  
});
  
