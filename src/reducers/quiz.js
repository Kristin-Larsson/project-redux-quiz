import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!

// @TODO replace asbra text with Guess this one
const questions = [
  { id: 1, questionText: "Which room doesn't exist?", options: [<img alt="asbratext" src="./images/room/room-real-1.jpg" />, <img alt="asbratext" src="./images/room/room-real.jpg" />, <img alt="asbratext" src="./images/room/room-AI.jpg" />], correctAnswerIndex: 2 },
  { id: 2, questionText: 'Which of these portraits are real?', options: [<img alt="asbratext" src="./images/bnw/girl-AI.jpg" />, <img alt="asbratext" src="./images/bnw/girl-real.jpg" />, <img alt="asbratext" src="./images/bnw/man-AI-1.jpg" />], correctAnswerIndex: 1 },
  { id: 3, questionText: 'Which frog is fake?', options: [<img alt="asbratext" src="./images/frogs/frog-AI.jpg" />, <img alt="asbratext" src="./images/frogs/frog-real.jpg" />, <img alt="asbratext" src="./images/frogs/frog-real-1.jpg" />], correctAnswerIndex: 0 },
  { id: 4, questionText: 'Which concrete building exists?', options: [<img alt="asbratext" src="./images/concrete/concrete-AI.jpg" />, <img alt="asbratext" src="./images/concrete/concrete-real.jpg" />, <img alt="asbratext" src="./images/concrete/concrete-AI-1.jpg" />], correctAnswerIndex: 1 },
  { id: 5, questionText: 'Can you spot the fake cat?', options: [<img alt="asbratext" src="./images/cats/cat-AI.jpg" />, <img alt="asbratext" src="./images/cats/cat-real.jpg" />, <img alt="asbratext" src="./images/cats/cat-real-1.jpg" />], correctAnswerIndex: 0 }
]

const countdownInitialValue = 30

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  countdown: countdownInitialValue
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    resetCountdown: (state) => {
      state.countdown = countdownInitialValue
    },
    setCountdown: (state, seconds) => {
      state.countdown = seconds
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})