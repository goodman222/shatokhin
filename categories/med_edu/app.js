const { createApp } = Vue;

createApp({
  data() {
    return {
      categorys: [
        // "Медецина"
        {
          name: "Медецина",
          question: {
            text: null,
          },
        },
        // "Образование"
        {
          name: "Образование",
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
