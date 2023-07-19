const currensuSelect1 = document.getElementById('currensuSelect1');
const currensuSelect2 = document.getElementById('currensuSelect2');
const currensuInp1 = document.getElementById('currensuInp1');
const currensuInp2 = document.getElementById('currensuInp2');
const convertBtn = document.getElementById('convertBtn');

const myHeaders = new Headers();
myHeaders.append("apikey", "Y3nB5w8ljFBD0nF5kijaAGnPWFGLP53q");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const getData = async (from, to, amount) => {
  try {
    const response = await fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message)
  }
}

currensuSelect1.addEventListener('change', (e) => {
  currensuSelect2.options[e.target.selectedIndex].selected = false;
})

currensuSelect2.addEventListener('change', (e) => {
  currensuSelect1.options[e.target.selectedIndex].selected = false;
})

convertBtn.addEventListener('click', () => {
  if (currensuInp1.value) {
    getData(currensuSelect1.options[currensuSelect1.selectedIndex].value,
      currensuSelect2.options[currensuSelect2.selectedIndex].value,
      currensuInp1.value)
      .then(data => {
        currensuInp2.value = Math.round(data['result'] * 100) / 100
      })
  } else {
    alert('Введите количество')
  }
})

// getData('USD').then(data => {
//   console.log(data);
// })