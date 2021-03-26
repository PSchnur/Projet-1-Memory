
  let rankingTable = [
    {
      name: 'Brandon',
      score: 230000,
    },
    {
      name: 'Jonathan',
      score: 230000,
    },
    {
      name: 'Priscilia',
      score: 230000,
    },
    {
      name: 'Bob',
      score: 75,
    },
    {
      name: 'Bob',
      score: 75,
    },
    {
      name: 'Bob',
      score: 75,
    },
    {
      name: 'Bob',
      score: 75,
    },
  ];


if (localStorage.isOver === 'true') {
    rankingTable.push({
      name: localStorage.name,
      score: parseInt(localStorage.score1),
    });
  }
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
    </tr>`;
  }
  