const { createApp } = Vue;

createApp({
  data() {
    return {
      categorys: [
        // "Увольнение и трудовой договор"
        {
          name: "Увольнение и трудовой договор",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Заключение трудового договора  ",
                nextQuestion: undefined,
              },
              {
                text: "Расторжение трудового договора  ",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Возмещение ущерба, причинённого работником"
        {
          name: "Возмещение ущерба, причинённого работником",
          question: {
            text: null,
          },
        },
        // "Изменение условий трудового договора / перевод на другую работу"
        {
          name: "Изменение условий трудового договора / перевод на другую работу",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Изменение условий трудового договора",
                nextQuestion: undefined,
              },
              {
                text: "Перевод на другую работу",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Заработная плата, выходные пособия и другие выплаты"
        {
          name: "Заработная плата, выходные пособия и другие выплаты",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Выплата заработной платы ",
                nextQuestion: undefined,
              },
              {
                text: "Выходные пособия, иные выплаты",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Оспаривание приказов и локальных актов работодателя"
        {
          name: "Оспаривание приказов и локальных актов работодателя",
          question: {
            text: null,
          },
        },
        // "Производственная травма / Взыскание компенсации морального вреда"
        {
          name: "Производственная травма / Взыскание компенсации морального вреда",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Производственная травма  ",
                nextQuestion: undefined,
              },
              {
                text: "Компенсация морального вреда работнику",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Отпуск"
        {
          name: "Отпуск",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Размер отпускных",
                nextQuestion: undefined,
              },
              {
                text: "Продолжительность отпуска",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Рабочее время"
        {
          name: "Рабочее время",
          question: {
            text: "Выберите вариант ответа, подходящий к вашей ситуации",
            answer: [
              {
                text: "Работа сверхурочно / ненормированный рабочий день",
                nextQuestion: undefined,
              },
              {
                text: "Работа в выходные и праздничные дни / ночное время",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Командировки"
        {
          name: "Командировки",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Причинение ущерба в командировке",
                nextQuestion: undefined,
              },
              {
                text: "Оплата труда в командировке",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Нетрудоспособность, больничный"
        {
          name: "Нетрудоспособность, больничный",
          question: {
            text: "Вас интересует:",
            answer: [
              {
                text: "Увольнение в период временной нетрудоспособности",
                nextQuestion: undefined,
              },
              {
                text: "Оплата больничного листа",
                nextQuestion: undefined,
              },
            ],
          },
        },
        // "Внесение записи в трудовую книжку"
        {
          name: "Внесение записи в трудовую книжку",
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
