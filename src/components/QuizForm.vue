<template>
  <div>
    <form class="quiz-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">Topic:</label>
        <input v-model="topics" class="form-control-custom" type="text" placeholder="Ingresa un tema">
      </div>
      <div class="form-group">
        <label class="form-label">Number of questions:</label>
        <input v-model="numberQuestions" class="form-control-custom" type="number" min="2" max="5">
      </div>
      <div class="form-group">
        <label class="form-label">Number of options:</label>
        <input v-model="numberOptions" class="form-control-custom" type="number" min="2" max="4">
      </div>
      <div class="form-group">
        <label class="form-label">Language:</label>
        <select v-model="language" class="form-control-custom">
          <option value="Spanish">Spanish</option>
          <option value="English">English</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Difficulty:</label>
        <select v-model="difficulty" class="form-control-custom">
          <option value="School">Easy</option>
          <option value="Advanced">Hard</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-check-custom">
          <input v-model="correct" class="form-check-input-custom" type="checkbox">
          <label class="form-check-label-custom">Show correct option and explanation:</label>
        </div>
      </div>
      <div class="form-group">
        <button class="btn-custom" type="submit">Generate Quiz</button>
      </div>
    </form>
    <div v-if="isLoading" class="loading"></div>
    <div v-if="response" class="quiz-response">
      <h3 class="quiz-title">Quiz ☟</h3>
      <div v-for="(question, index) in response.questions" :key="index">
        <p class="quiz-question">Question {{ index + 1 }}: {{ question.question }}</p>
        <ul class="quiz-options">
          <li v-for="(option, optionIndex) in question.options" :key="optionIndex">֎ {{ option }}</li>
        </ul>
        <p class="quiz-options">Difficulty: {{ question.difficulty }}</p>
        <p class="quiz-correct">Correct Answer: {{ question.correctAnswer }}</p>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.quiz-form {
  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 500px;
  font-family: Arial, sans-serif;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control-custom {
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.form-group,
.form-check-custom {
  padding: 0px 0px;
  width: 100%;
}

.form-control-custom:focus {
  outline: none;
  border-color: #00ff84;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-check-custom {
  margin-bottom: 10px;
}

.form-check-input-custom {
  display: inline-block;
  width: auto;
  margin-top: 6px;
  margin-right: 5px;
}

.form-check-label-custom {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
}

.btn-custom {
  display: inline-block;
  font-weight: 400;
  color: #fff;
  background-color: #45b881;
  border-color: #45b881;
  height: 40px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #000000;
  opacity: .95;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.loading:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top-color: #45b881;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.quiz-response {
  background-color: #343c3e;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 600px;
  max-height: 300px;
  /* Altura máxima del cuadro */
  overflow-y: auto;
  /* Activar scroll si el contenido excede la altura máxima */
}

.quiz-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.quiz-question {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.quiz-options {
  margin-top: 0;
  margin-bottom: 10px;
  list-style-type: none;
  padding-left: 0;
}

.quiz-options li {
  margin-bottom: 5px;
}

.quiz-correct {
  font-style: italic;
  font-size: 1rem;
  margin-top: 10px;
}

.error {
  background-color: #ff0000;
  color: #ffffff;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin-top: 20px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      topics: '',
      numberQuestions: 0,
      numberOptions: 0,
      language: '',
      difficulty: '',
      correct: false,
      isLoading: false,
      response: null,
      error: null,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:3000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topics: this.topics,
            numberQuestions: this.numberQuestions,
            numberOptions: this.numberOptions,
            language: this.language,
            difficulty: this.difficulty,
            correct: this.correct,
          }),
        })
        const data = await response.json()
        this.response = data
        this.error = null
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    }
  },
})
</script>