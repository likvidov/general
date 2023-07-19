const carsSelect = document.getElementById('carsSelect');
const text = document.querySelector('.text');

const getData = async (id) => {
  try {
    const response = await fetch('cars.json');
    const data = await response.json();

    if (data.length < id) {
      throw new Error('Отсутвует такой id')
    }

    return data;
  } catch (error) {
    throw new Error(error.message)
  }
}

const renderSelect = (data) => {
  data.forEach((item, i) => {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = item['brand'];
    carsSelect.append(option)
  });
}

carsSelect.addEventListener('change', e => {
  if (e.target.value) {
    getData().then(data => {
      text.innerHTML = `Тачка ${data['cars'][e.target.value]['brand']} ${data['cars'][e.target.value]['model']} <br> Цена: ${data['cars'][e.target.value]['price']}`
    })
  } else {
    text.textContent = 'Выберите машину'
  }
})

getData().then(data => {
  renderSelect(data['cars']);
});