
let rankingTable = [
    {
      name: 'Brandon',
      score: '∞',
    },
    {
      name: 'Jonathan',
      score: 9999,
    },
    {
      name: 'Priscilia',
      score: 7777,
    },
    {
      name: '???',
      score: '???',
    },
    {
      name: 'Pierre',
      score: 375,
    },
    {
      name: 'Thomas',
      score: 100,
    },
    {
      name: 'Lisa',
      score: 75,
    },
  ].concat(JSON.parse(localStorage.getItem("scores")));



  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    } else if (b.score > a.score) {
      return 1;
    } else return 0;
  }
  
  let sortedRankingTable = rankingTable.sort(compare);
  console.log(sortedRankingTable);
  
  for (let i = 0; i < sortedRankingTable.length; i++) {
    const myTable = document.querySelector('tbody');
    myTable.innerHTML += `<tr>
    <td>${i + 1}</td><td>${sortedRankingTable[i].name}</td><td>${
      sortedRankingTable[i].score
    }</td>
    </tr>`}