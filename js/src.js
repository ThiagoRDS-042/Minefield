let buttons = document.querySelectorAll('#container button');

let posMineOne = Math.floor(Math.random() * 9);
let posMineTwo = Math.floor(Math.random() * 9);
let posMineThree = Math.floor(Math.random() * 9);

let qtdMine;
let jogada = 1;
let finish = false;

let timeBefore = [];
let timeAfter = [];
let timeExacle = [];
let time;

let matriz = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

while (posMineOne === posMineTwo) {
    posMineTwo = Math.floor(Math.random() * 9);
}

while (posMineOne === posMineThree || posMineTwo === posMineThree) {
    posMineThree = Math.floor(Math.random() * 9);
}

function alocarMine(posMine) {
    if (posMine < 3) {
        matriz[0][posMine] = 'mine';
    } else if (posMine < 6) {
        if (posMine === 3) {
            matriz[1][0] = 'mine';
        } else if (posMine === 4) {
            matriz[1][1] = 'mine';
        } else {
            matriz[1][2] = 'mine';
        }
    } else {
        if (posMine === 6) {
            matriz[2][0] = 'mine';
        } else if (posMine === 7) {
            matriz[2][1] = 'mine';
        } else {
            matriz[2][2] = 'mine';
        }
    }
}

function timeHHmmss() {
    timeAfter[0] *= 3600;
    timeAfter[1] *= 60;

    timeBefore[0] *= 3600;
    timeBefore[1] *= 60;

    let soma1 = timeAfter.reduce((v1, v2) => {
        return v1 + v2;
    });

    let soma2 = timeBefore.reduce((v1, v2) => {
        return v1 + v2;
    });

    time = soma1 - soma2;

    if (time / 3600 >= 1) {
        timeExacle.push(Math.trunc(time / 3600));

        time = ((time / 3600) - timeExacle[0]) * 60;
        timeExacle.push(Math.trunc(time));

        time = (time - timeExacle[1]) * 60;
        timeExacle.push(Math.round(time));
    } else if (time / 60 >= 1) {
        timeExacle.push(Math.trunc(time / 60));

        time = ((time / 60) - timeExacle[0]) * 60;
        timeExacle.push(Math.round(time));
    } else {
        timeExacle.push(time);
    }

    getTime();
}

function getTime() {
    if (timeExacle.length === 3) {
        time = `${timeExacle[0]} hora(s) e ${timeExacle[1]} minuto(s) e ${timeExacle[2]} segundo(s).`;
    } else if (timeExacle.length === 2) {
        time = `${timeExacle[0]} minuto(s) e ${timeExacle[1]} segundo(s).`;
    } else {
        time = `${timeExacle[0]} segundo(s).`;
    }
}

function exibir(indexMatriz001, indexMatriz002, button) {
    if (finish) {
        let reiniciar = confirm('Jogo Finalizado!, desja reiniciar?');
        reiniciar ? location.reload() : '';
    } else if (matriz[indexMatriz001][indexMatriz002] === 'mine') {
        buttons[0].setAttribute('style', `background: url("icons/${matriz[0][0]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[1].setAttribute('style', `background: url("icons/${matriz[0][1]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[2].setAttribute('style', `background: url("icons/${matriz[0][2]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[3].setAttribute('style', `background: url("icons/${matriz[1][0]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[4].setAttribute('style', `background: url("icons/${matriz[1][1]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[5].setAttribute('style', `background: url("icons/${matriz[1][2]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[6].setAttribute('style', `background: url("icons/${matriz[2][0]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[7].setAttribute('style', `background: url("icons/${matriz[2][1]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);
        buttons[8].setAttribute('style', `background: url("icons/${matriz[2][2]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);

        if (jogada === 1) {
            let data = new Date();
            timeBefore.push(data.getHours());
            timeBefore.push(data.getMinutes());
            timeBefore.push(data.getSeconds());
        }

        let data = new Date();
        timeAfter.push(data.getHours());
        timeAfter.push(data.getMinutes());
        timeAfter.push(data.getSeconds());

        timeHHmmss();

        let result = document.querySelector('#result');
        result.setAttribute('style', 'border: solid 1px black;');
        result.innerHTML = `<h3>Resultado:</h3>`;
        result.innerHTML += `<p><strong>Tempo: ${time}</strong></p>`;
        result.innerHTML += `<button style = "margin-bottom: 20px; width: 120px; height: 30px; cursor: pointer;"  onclick="reset();">Reiniciar</button>`;

        setTimeout(() => {
            alert('Você perdeu, reinicie e tente novamente!');
        }, 100);
        finish = true;
    } else {
        button.setAttribute('style', `background: url("icons/${matriz[indexMatriz001][indexMatriz002]}.png");background-color: #efefef; background-repeat: no-repeat; background-position: center;`);

        if (jogada === 1) {
            let data = new Date();
            timeBefore.push(data.getHours());
            timeBefore.push(data.getMinutes());
            timeBefore.push(data.getSeconds());
        }

        jogada++;

        if (jogada === 7) {

            let data = new Date();
            timeAfter.push(data.getHours());
            timeAfter.push(data.getMinutes());
            timeAfter.push(data.getSeconds());

            setTimeout(() => {
                alert('Parabéns você ganhou!, reinicie e joge novamente.');
            }, 100);
            finish = true;
            timeHHmmss();

            let result = document.querySelector('#result');
            result.setAttribute('style', 'border: solid 1px black;');
            result.innerHTML = `<h3>Resultado:</h3>`;
            result.innerHTML += `<p><strong>Tempo: ${time}</strong></p>`;
            result.innerHTML += `<button style = "margin-bottom: 20px; width: 120px; height: 30px; cursor: pointer;"  onclick="reset();">Reiniciar</button>`;
        }

    }
}

function iterarMatriz(matriz) {
    matriz.map((array, end) => {
        array.map((element, index) => {
            qtdMine = 0;
            if (element !== 'mine') {
                if (end === 0) {
                    //coluna atual
                    if (array[index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (array[index + 1] === 'mine') {
                        qtdMine++;
                    }
                    //coluna de baixo
                    if (matriz[end + 1][index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end + 1][index] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end + 1][index + 1] === 'mine') {
                        qtdMine++;
                    }
                } else if (end === 1) {
                    //coluna de cima
                    if (matriz[end - 1][index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end - 1][index] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end - 1][index + 1] === 'mine') {
                        qtdMine++;
                    }
                    //coluna atual
                    if (array[index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (array[index + 1] === 'mine') {
                        qtdMine++;
                    }
                    //coluna de baixo
                    if (matriz[end + 1][index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end + 1][index] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end + 1][index + 1] === 'mine') {
                        qtdMine++;
                    }
                }
                if (end === 2) {
                    //coluna de cima
                    if (matriz[end - 1][index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end - 1][index] === 'mine') {
                        qtdMine++;
                    }
                    if (matriz[end - 1][index + 1] === 'mine') {
                        qtdMine++;
                    }
                    //coluna atual
                    if (array[index - 1] === 'mine') {
                        qtdMine++;
                    }
                    if (array[index + 1] === 'mine') {
                        qtdMine++;
                    }
                }
                array[index] = qtdMine;
            }
        });
    });
}

function reset() {
    location.reload();
}

alocarMine(posMineOne);
alocarMine(posMineTwo);
alocarMine(posMineThree);

iterarMatriz(matriz);

buttons[0].onclick = function() {
    exibir(0, 0, buttons[0]);
};


buttons[1].onclick = function() {
    exibir(0, 1, buttons[1]);
};

buttons[2].onclick = function() {
    exibir(0, 2, buttons[2]);
};

buttons[3].onclick = function() {
    exibir(1, 0, buttons[3]);
};

buttons[4].onclick = function() {
    exibir(1, 1, buttons[4]);
};

buttons[5].onclick = function() {
    exibir(1, 2, buttons[5]);
};

buttons[6].onclick = function() {
    exibir(2, 0, buttons[6]);
};

buttons[7].onclick = function() {
    exibir(2, 1, buttons[7]);
};

buttons[8].onclick = function() {
    exibir(2, 2, buttons[8]);
};