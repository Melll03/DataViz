document.addEventListener('DOMContentLoaded', function () {
    const regionNames = {
      KR11: 'Seoul', KR26: 'Busan', KR27: 'Daegu', KR28: 'Incheon',
      KR29: 'Gwangju', KR30: 'Daejeon', KR31: 'Ulsan', KR41: 'Gyeonggi',
      KR42: 'Gangwon', KR43: 'North Chungcheong', KR44: 'South Chungcheong',
      KR45: 'North Jeolla', KR46: 'South Jeolla', KR47: 'North Gyeongsang',
      KR48: 'South Gyeongsang', KR49: 'Jeju', KR50: 'Sejong'
    };

    const regionVisitors = {
      "Seoul": 12451891,
      "Busan": 7158553,
      "Daegu": 3163161,
      "Incheon": 4407063,
      "Gwangju": 2135332,
      "Daejeon": 2984929,
      "Ulsan": 1632410,
      "Sejong": 333329,
      "Gyeonggi": 15451755,
      "Gangwon": 11559005,
      "North Chungcheong": 5141110,
      "South Chungcheong": 9944616,
      "North Jeolla": 6760830,
      "South Jeolla": 8063538,
      "North Gyeongsang": 8822201,
      "South Gyeongsang": 8479567,
      "Jeju": 4732494
    };

    function formatVisitors(visitors) {
        if (visitors >= 1000000) {
            return (visitors / 1000000).toFixed(1) + 'M'; // Affiche en millions
        } else if (visitors >= 1000) {
            return (visitors / 1000).toFixed(1) + 'K'; // Affiche en milliers
        } else {
            return visitors; 
        }
    }

    fetch('south-korea.svg') // Charge le fichier SVG
      .then(response => response.text())
      .then(svg => {
          document.getElementById('map-container').innerHTML = svg;
          const tip = document.getElementById('tip');
    
          document.querySelectorAll('#map-container path').forEach(region => {
              region.addEventListener('mouseover', function (event) {
                  const regionId = this.id;
                  const regionName = regionNames[regionId];
                  const visitors = regionVisitors[regionName];
                  const formattedVisitors = formatVisitors(visitors);
                  tip.textContent = `${regionName}: ${formattedVisitors}`;
                  tip.style.display = 'block';
                  tip.style.left = event.pageX + 10 + 'px';
                  tip.style.top = event.pageY + 10 + 'px';
              });
    
              region.addEventListener('mousemove', function (event) {
                  tip.style.left = event.pageX + 10 + 'px';
                  tip.style.top = event.pageY + 10 + 'px';
              });
    
              region.addEventListener('mouseout', function () {
                  tip.style.display = 'none';
              });
          });
      });
});
