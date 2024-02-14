const { createApp } = Vue;

createApp({
  data() {
    return {
      categorys: [
        // "Выселение"
        {
          name: "Выселение",
          question: {
            text: "Выберите нужный вариант:",
            answer: [
              {
                text: "Вы хотите выселить",
                nextQuestion: {
                  text: "Вы хотите выселить из помещения",
                  answer: [
                    {
                      text: "находящегося в муниципальной (государственной) собственности",
                      nextQuestion: undefined, //cons  realty 2 1 1 1
                    },

                    {
                      text: "находящегося в вашей собственности",
                      nextQuestion: undefined, //cons realty 2 1 1 2
                    },
                  ],
                },
              },
              {
                text: "Вас хотят выселить",
                nextQuestion: {
                  text: "Вас хотят выселить из помещения",
                  answer: [
                    {
                      text: "находящегося в муниципальной (государственной) собственности",
                      nextQuestion: undefined, //cons  realty 2 1 2 1
                    },

                    {
                      text: "находящегося в вашей собственности",
                      nextQuestion: undefined, //cons realty 2 1 2 2
                    },
                  ],
                },
              },
            ],
          },
        },
        // "Вселение"
        {
          name: "Вселение",
          question: {
            text: "Выберите нужный вариант:",
            answer: [
              {
                text: "Вы хотите вселиться",
                nextQuestion: {
                  text: "Вы хотите вселиться в помещение",
                  answer: [
                    {
                      text: "находящееся в муниципальной (государственной) собственности",
                      nextQuestion: undefined, //cons  realty 2 2 1 14
                    },

                    {
                      text: "находящееся в частной собственности",
                      nextQuestion: undefined, //cons realty 2 2 1 2
                    },
                  ],
                },
              },
              {
                text: "К вам хотят вселить",
                nextQuestion: {
                  text: "К вам хотят вселить в помещение",
                  answer: [
                    {
                      text: "находящееся в муниципальной (государственной) собственности",
                      nextQuestion: undefined, //cons  realty 1 1 1
                    },

                    {
                      text: "находящееся в вашей собственности",
                      nextQuestion: undefined, //cons realty 1 1 2
                    },
                  ],
                },
              },
            ],
          },
        },
        // "Приватизация",
        {
          name: "Приватизация",
          question: {
            text: null,
            // cons realty 2 4 1
          },
        },
        // "Перепланировка",
        {
          name: "Перепланировка",
          question: {
            text: null, // cons realty 2 3 1
          },
        },
        // "Купля продажа недвижимости"
        {
          name: "Купля продажа недвижимости",
          question: {
            text: "Вы желаете:",
            answer: [
              {
                text: "Купить недвижимость",
                nextQuestion: undefined, // cons realty 2 5 1
              },
              {
                text: "Продать недвижимость",
                nextQuestion: undefined, // cons realty 2 5 2
              },
            ],
          },
        },
        // "Ипотека",
        {
          name: "Ипотека",
          question: {
            text: "Выберите вариант ответа, подходящий к вашей ситуации",
            answer: [
              {
                text: "Обращение взыскания на заложенное имущество",
                nextQuestion: undefined,
              },
              {
                text: "Реструктуризация долга",
                nextQuestion: undefined,
              },
              {
                text: "Иные вопросы, связанные с ипотекой",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Дарение",
        {
          name: "Дарение",
          question: {
            text: "Вы желаете:",
            answer: [
              {
                text: "Подарить недвижимость",
                nextQuestion: undefined,
              },
              {
                text: "Отменить дарение",
                nextQuestion: undefined,
              },
              {
                text: "Иные вопросы по дарению",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Наём жилого помещения",
        {
          name: "Наём жилого помещения",
          question: {
            text: "Вы желаете:",
            answer: [
              {
                text: "Снять жилое помещение",
                nextQuestion: undefined,
              },
              {
                text: "Сдать жилое помещение",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Долевое участие в строительстве",
        {
          name: "Долевое участие в строительстве",
          question: {
            text: "Вы желаете:",
            answer: [
              {
                text: "Взыскание неустойки за задержку сроков строительства",
                nextQuestion: undefined,
              },
              {
                text: "Продажа объекта на этапе строительства",
                nextQuestion: undefined,
              },
              {
                text: "Иные вопросы по долевому участию в строительстве",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Строительные споры между подрядчиком и заказчиком",
        {
          name: "Строительные споры между подрядчиком и заказчиком",
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
