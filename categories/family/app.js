const { createApp } = Vue;

createApp({
  data() {
    return {
      categorys: [
        // "Расторжение брака при отсутствии общих несовершеннолетних детей"
        {
          name: "Расторжение брака при отсутствии общих несовершеннолетних детей",
          question: {
            text: "Согласен ли ваш супруг/супруга на расторжение брака?",
            answer: [
              {
                text: "Согласен/а  ",
                nextQuestion: undefined,
              },
              {
                text: "Не согласен/а ",
                nextQuestion: undefined,
              },
              {
                text: "Не знаю / Нет возможности спросить",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Расторжение брака при наличии общих несовершеннолетних детей"
        {
          name: "Расторжение брака при наличии общих несовершеннолетних детей",
          question: {
            text: "Пришли ли вы с супругом/ой к соглашению о том с кем из родителей будет проживать ребёнок после развода?",
            answer: [
              {
                text: "Да",
                nextQuestion: undefined,
              },
              {
                text: "Нет",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Взыскание алиментов на содержание несовершеннолетних детей"
        {
          name: "Взыскание алиментов на содержание несовершеннолетних детей",
          question: {
            text: "Имеет ли лицо, с которого взыскивают алименты, официальный заработок?",
            answer: [
              {
                text: "Да",
                nextQuestion: undefined,
              },
              {
                text: "Нет/не знаю",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Взыскание алиментов на содержание родителей"
        {
          name: "Взыскание алиментов на содержание родителей",
          question: {
            text: "Являются ли родители нетрудоспособными / пенсионерами / инвалидами?",
            answer: [
              {
                text: "Да, относятся к одной или нескольким из указанных категорий ",
                nextQuestion: undefined,
              },
              {
                text: "Нет, не относятся",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Раздел совместно нажитого имущества"
        {
          name: "Раздел совместно нажитого имущества",
          question: {
            text: "Выберите состав имущества, который вы делите:",
            answer: [
              {
                text: "Только имущество",
                nextQuestion: undefined,
              },
              {
                text: "Имущество в ипотеке / долги по кредиту",
                nextQuestion: undefined,
              },
              {
                text: "Имущество, приобретённое с использованием материнского капитала",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Установление родственных связей"
        {
          name: "Установление родственных связей",
          question: {
            text: "С какой целью вам требуется установление родственных связей:",
            answer: [
              {
                text: "Вступление в наследство",
                nextQuestion: undefined,
              },
              {
                text: "Иные цели",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Установление материнства / отцовства"
        {
          name: "Установление материнства / отцовства",
          question: {
            text: "Что вы желаете установить:",
            answer: [
              {
                text: "Отцовство",
                nextQuestion: undefined,
              },
              {
                text: "Материнство",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Лишение родительских прав"
        {
          name: "Лишение родительских прав",
          question: {
            text: "Выберите интересующий вас вопрос:",
            answer: [
              {
                text: "Лишение родительских прав",
                nextQuestion: undefined,
              },
              {
                text: "Восстановление родительских прав",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Смена имени / фамилии"
        {
          name: "Смена имени / фамилии",
          question: {
            text: null,
          },
        },
        // "Признание брака недействительным"
        {
          name: "Признание брака недействительным",
          question: {
            text: null,
          },
        },
        // "Заключение брачного договора"
        {
          name: "Заключение брачного договора",
          question: {
            text: null,
          },
        },
        // "Расторжение брачного договора"
        {
          name: "Расторжение брачного договора",
          question: {
            text: null,
          },
        },
        // "Усыновление / удочерение"
        {
          name: "Усыновление / удочерение",
          question: {
            text: null,
          },
        },
      ],

      consultationURL: "./consultations/",

      currentCategory: -1,

      currentQuestion: undefined,

      toNextQuestion: "Перейти к следующему вопросу",

      toСonsultation:
        "Ознакомиться с текстом бесплатной консультации, узнать о предложениях и их стоимости ",

      textBtn: "",

      currentAnswer: null,
    };
  },

  methods: {
    checkNextQuestion() {
      console.log(this.currentQuestion);
      //Последний ли следующий вопрос, изменение текста на кнопке
      if (this.currentQuestion.answer[0].nextQuestion === undefined) {
        this.textBtn = this.toСonsultation;
      } else {
        this.textBtn = this.toNextQuestion;
      }
    },

    addToUrl(index) {
      this.consultationURL += "_" + (index + 1);
      console.log(this.consultationURL);
    },

    categoryChose(index) {
      this.currentCategory = index;
      this.currentQuestion = this.categorys[this.currentCategory]["question"];
      this.addToUrl(this.currentCategory);

      if (this.currentQuestion.text === null) {
        //Если вопросов в блоке нет, то переход к консультации
        window.location.href = this.consultationURL + ".html";
        return;
      }
      this.checkNextQuestion();
    },

    acceptAnswer() {
      if (this.currentAnswer === null) {
        return; //Действие при невыборе ответа
      }
      this.addToUrl(this.currentAnswer);
      if (
        this.currentQuestion.answer[this.currentAnswer].nextQuestion ===
        undefined
      ) {
        window.location.href = this.consultationURL + ".html"; //переход к консультации, если нет следующего вопроса
        return;
      }

      this.currentQuestion = //переход к следующему вопросу
        this.currentQuestion.answer[this.currentAnswer].nextQuestion;

      this.checkNextQuestion();

      this.currentAnswer = null; // сброс кнопок
    },
  },
}).mount("#app");
