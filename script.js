const quizData = [
    {
        question: "愛成はなんて読みますか❓",
        answers: ["ケツ穴", "あいナリ", "穴", "肉棒"],
        correct: 0
    },
    {
        question: "世歩玲の意味は❓",
        answers: ["セックスフレンド", "男根の射精", "穴", "生濡れアナルセックス"],
        correct: 0
    },
    {
        question: "チンコの平均の大きさを答えなさい",
        answers: ["太さがほシい‼️", "キノコ⁉️", "ウンコ‼️", "マンコ‼️"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');
    document.body.appendChild(curtain);

    // ページが開いたときに810.wavを再生
    document.getElementById('startSound').play();

    // 画像表示の処理
    let imgCount = 0;
    const showImageInterval = setInterval(() => {
        if (imgCount < 5) {
            const fullScreenImage = document.createElement('img');
            fullScreenImage.src = '114514.jpg';
            fullScreenImage.style.position = 'fixed';
            fullScreenImage.style.top = '0';
            fullScreenImage.style.left = '0';
            fullScreenImage.style.width = '100%';
            fullScreenImage.style.height = '100%';
            fullScreenImage.style.zIndex = '1000';
            document.body.appendChild(fullScreenImage);
            
            setTimeout(() => {
                fullScreenImage.remove();
            }, 1000);
            imgCount++;
        } else {
            clearInterval(showImageInterval);
        }
    }, 200);

    setTimeout(() => {
        curtain.remove();
        document.getElementById('startScreen').style.display = 'block';
    }, 500);
});

document.getElementById('startButton').onclick = () => {
    const startScreen = document.getElementById('startScreen');
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');
    document.body.appendChild(curtain);

    document.getElementById('finalSound').play();
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = '114514.jpg';
    fullScreenImage.style.position = 'fixed';
    fullScreenImage.style.top = '0';
    fullScreenImage.style.left = '0';
    fullScreenImage.style.width = '100%';
    fullScreenImage.style.height = '100%';
    fullScreenImage.style.zIndex = '1000';
    document.body.appendChild(fullScreenImage);

    setTimeout(() => {
        fullScreenImage.remove();
        setTimeout(() => {
            startScreen.style.display = 'none';
            curtain.classList.add('curtainUp');
            setTimeout(() => {
                document.getElementById('quiz').style.display = 'block';
                loadQuestion();
                curtain.remove();
            }, 500);
        }, 1000);
    }, 0);
};

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const currentQuestion = quizData[currentQuestionIndex];

    const questionElement = document.createElement('h2');
    questionElement.classList.add('question', 'fade-in');
    questionElement.textContent = currentQuestion.question;
    quizContainer.appendChild(questionElement);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');

    currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement('div');
        answerButton.textContent = answer;
        answerButton.classList.add('answer');
        answerButton.onclick = () => selectAnswer(index);
        
        answerButton.onmouseenter = () => {
            document.getElementById('hoverSound').play();
            answerButton.classList.add('hover');
        };
        answerButton.onmouseleave = () => {
            answerButton.classList.remove('hover');
        };

        answersContainer.appendChild(answerButton);
    });

    quizContainer.appendChild(answersContainer);

    setTimeout(() => {
        questionElement.classList.add('show');
    }, 10);
}

function selectAnswer(index) {
    const currentQuestion = quizData[currentQuestionIndex];
    const answerElements = document.querySelectorAll('.answer');

    answerElements.forEach((element, i) => {
        if (i === currentQuestion.correct) {
            element.classList.add('correct');
            setTimeout(() => {
                element.classList.remove('glow');
            }, 2000);
        } else {
            element.classList.add('wrong');
            element.style.animation = 'shake 0.7s';
        }
        element.onclick = null;
    });

    if (index === currentQuestion.correct) {
        score++;
        document.getElementById('correctSound').play();
    } else {
        document.getElementById('wrongSound').play();
    }

    document.getElementById('next').style.display = 'block';
}

document.getElementById('next').onclick = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    
    if (document.querySelectorAll('.answer.wrong').length > 0) {
        // 間違えた場合の処理
        const curtain = document.createElement('div');
        curtain.classList.add('curtain');
        document.body.appendChild(curtain);
        
        document.getElementById('finalSound').play();
        const fullScreenImage = document.createElement('img');
        fullScreenImage.src = '114514.jpg';
        fullScreenImage.style.position = 'fixed';
        fullScreenImage.style.top = '0';
        fullScreenImage.style.left = '0';
        fullScreenImage.style.width = '100%';
        fullScreenImage.style.height = '100%';
        fullScreenImage.style.zIndex = '1000';
        document.body.appendChild(fullScreenImage);

        setTimeout(() => {
            fullScreenImage.remove();
            setTimeout(() => {
                currentQuestionIndex++;
                curtain.classList.add('curtainUp');
                setTimeout(() => {
                    curtain.remove();
                    loadQuestion();
                    document.getElementById('next').style.display = 'none';
                }, 500);
            }, 1000);
        }, 0);
    } else {
        currentQuestionIndex++;
        const curtain = document.createElement('div');
        curtain.classList.add('curtain');
        document.body.appendChild(curtain);
        
        curtain.classList.add('curtainUp');
        setTimeout(() => {
            curtain.remove();
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
                document.getElementById('next').style.display = 'none';
            } else {
                showScore();
            }
        }, 500);
    }
}

function showScore() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    document.getElementById('next').style.display = 'none';
    document.getElementById('title').style.display = 'none';

    const scoreMessage = score === quizData.length ? "満点おめでとう！" : "よくがんばりました！";
    const scoreElement = document.createElement('h2');
    scoreElement.className = 'score slide-in';
    scoreElement.innerHTML = `<span class="pop-up">${scoreMessage}</span><br>あなたのスコア: ${score}/${quizData.length}`;
    quizContainer.appendChild(scoreElement);
}

window.addEventListener('beforeunload', (event) => {
    event.preventDefault(); // 標準の動作を防ぐ
    event.returnValue = "何で消そうとするの❓嫌いなの❓"; // 警告メッセージを設定
});


