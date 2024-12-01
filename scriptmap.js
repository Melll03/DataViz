// Carte interactive
document.addEventListener('DOMContentLoaded', function () {
    const regionNames = {
      KR11: 'Seoul', KR26: 'Busan', KR27: 'Daegu', KR28: 'Incheon',
      KR29: 'Gwangju', KR30: 'Daejeon', KR31: 'Ulsan', KR41: 'Gyeonggi',
      KR42: 'Gangwon', KR43: 'North Chungcheong', KR44: 'South Chungcheong',
      KR45: 'North Jeolla', KR46: 'South Jeolla', KR47: 'North Gyeongsang',
      KR48: 'South Gyeongsang', KR49: 'Jeju', KR50: 'Sejong'
    };
    
    fetch('south-korea.svg') // Charge le fichier SVG
      .then(response => response.text())
      .then(svg => {
          document.getElementById('map-container').innerHTML = svg;
          const tip = document.getElementById('tip');
    
          document.querySelectorAll('#map-container path').forEach(region => {
              region.addEventListener('mouseover', function (event) {
                  const regionId = this.id;
                  tip.textContent = regionNames[regionId];
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
      })
});