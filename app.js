(function () {

  const container = document.getElementById('game-app');

  function startGame(container, level) {
    let cardsCount = (level * 2)**2 / 2;
    console.log(cardsCount)
    let cardsNumberArray = [];
    let firstCard = null;
    let secondCard = null;
    const titleEl = document.createElement('h1');
    const divEl = document.createElement('div');
    const divBtn = document.createElement('div');
    const btnStart = document.createElement('button');
    const btnLevel = document.createElement('button');
    const btnReset = document.createElement('button');

    container.classList.add('d-flex', 'flex-column', 'vw-100', 'vh-100')
    titleEl.textContent = 'Game  pair of cards '
    titleEl.classList.add('mb-2', 'flex-start', 'text-center', 'fw-bold', 'title')
    divEl.classList.add('container', 'game-app')
    divBtn.classList.add('container', 'gap-2', 'd-md-flex', 'justify-content-md-center')
    btnStart.classList.add('btn', 'btn-success', 'mr-5');
    btnStart.textContent = 'StartGame';
    btnLevel.classList.add('btn', 'btn-success', 'mr-5');
    btnLevel.textContent = 'Level Game';
    btnReset.classList.add('btn', 'btn-success');
    btnReset.textContent = 'Restart Game';

    container.append(titleEl);
    container.append(divEl);

    container.append(divBtn);
    divBtn.append(btnStart);
    // divBtn.append(btnLevel);
    divBtn.append(btnReset);

    // создаём массив
    for (let i = 1; i <= cardsCount; i++) {
      cardsNumberArray.push(i, i)
    }
    // console.log(cardsNumberArray)//8

    //перемешиваем массив
    for (let i = 0; i < cardsNumberArray.length; i++) {
      const cardRandomIndex = Math.floor(Math.random() * cardsNumberArray.length);
      let temp = cardsNumberArray[i];
      cardsNumberArray[i] = cardsNumberArray[cardRandomIndex];
      cardsNumberArray[cardRandomIndex] = temp;
    }
// Настройка сетки
    let columns = 2;
    switch (level) {
      case 1:
        columns = 2;
        break;
      case 2:
        columns = 4;
        break;
      case 3:
        columns = 6;
        break;
      case 4:
        columns = 8;
        break;
      case 5:
        columns = 10;
        break;
      default:
        columns = 4;
    }
    divEl.style = `grid-template-columns: repeat(${columns}, 1fr);`


    //  Создание карточек
    // console.log(cardsNumberArray)// Shuffle cards  перемешивает карты
    for (let cardNumber of cardsNumberArray) {
      let card = document.createElement('div');
      card.textContent = cardNumber;
      card.classList.add('card')
      divEl.append(card);
      //  Клик по карточке
      card.addEventListener('click', function () {
        if (card.classList.contains('open') || card.classList.contains('success')) {
          return alert('Press another card');
        }
        //  Закрывать при нажатии третьей карты
        if (firstCard !== null && secondCard !== null) {
          firstCard.classList.remove('open');
          secondCard.classList.remove('open');
          firstCard = null;
          secondCard = null;
        }
        // console.log(card)// test good
        card.classList.add('open');
        console.log('card clicked', card);// test good


        if (firstCard === null) {
          firstCard = card;
        } else if (secondCard === null) {
          secondCard = card;
        }
        if (firstCard !== null && secondCard !== null) {
          console.log('both cards open')
          let firstCardNumber = firstCard.textContent;
          let secondCardNumber = secondCard.textContent;

          if (firstCardNumber === secondCardNumber) {
            // console.log('both card over')
            firstCard.classList.add('success');
            secondCard.classList.add('success');
          }
        }
        if (cardsNumberArray.length === document.querySelectorAll('.success').length) {
          setTimeout(function () {
            container.innerHTML = '';
            alert('Game over');
            let cardsCount = Number(prompt('Enter number  from 1 to 5', 2));
            startGame(container, cardsCount)
          }, 400)
        }
        // console.log('clicked card', firstCard)
        // console.log('clicked card', secondCard)
      })
    }
    let timeId;
    timeId = setTimeout(() => {
      container.innerHTML = '';
      alert('Time over');
      let cardsCount = Number(prompt('Enter number  from 1 to 5', 2));
      startGame(container, cardsCount)
    }, 60000)

    btnStart.addEventListener('click', function () {
      container.innerHTML = '';
      clearInterval(timeId);
      let cardsCount = Number(prompt('Enter number  from 1 to 5',2));
      if (cardsCount >= 1 && cardsCount <= 5) {
        startGame(container, cardsCount)
      }else {
        container.innerHTML = '';
        alert('Game over');
        startGame(container, level)
      }

    })
    btnReset.addEventListener('click', function () {
      container.innerHTML = '';
      clearInterval(timeId);
      let level = 2;
      startGame(container, level)
    })
    // btnLevel.addEventListener('click', function () {
    //   container.innerHTML = '';
    //   let cardsCount = Number(prompt('Enter count cards', 4)) + 1;
    //   startGame(container,cardsCount)
    // })
  }

  let level =  2;
  startGame(container, level)

})();




