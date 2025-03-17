"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react"
import MCQQuestion from "./mcq-question"
import TrueFalseQuestion from "./truefalse-question"

const originalQuestions = [
  {
    type: "mcq",
    question: "What is the purpose of the softmax function?",
    options: [
      "Converts logits into probabilities",
      "Removes overfitting",
      "Improves activation functions",
      "Optimizes the loss function",
    ],
    answer: "Converts logits into probabilities",
    explanation: "Softmax normalizes scores into a probability distribution for classification tasks.",
  },
  {
    type: "mcq",
    question: "Which optimizer combines both momentum and adaptive learning rates?",
    options: ["SGD", "Adam", "RMSProp", "Adagrad"],
    answer: "Adam",
    explanation: "Adam combines the benefits of both momentum and RMSProp.",
  },
  {
    type: "mcq",
    question: "What is the main issue with using Sigmoid activation in deep networks?",
    options: ["Vanishing gradients", "Exploding gradients", "Overfitting", "Underfitting"],
    answer: "Vanishing gradients",
    explanation: "Sigmoid outputs between 0 and 1, causing gradients to shrink too much in deep networks.",
  },
  {
    type: "mcq",
    question: "What does Batch Normalization do?",
    options: [
      "Prevents overfitting",
      "Normalizes activations to speed up training",
      "Increases model complexity",
      "Reduces training data size",
    ],
    answer: "Normalizes activations to speed up training",
    explanation: "Batch normalization standardizes layer inputs, improving training efficiency.",
  },
  {
    type: "mcq",
    question: "Which function is commonly used to introduce non-linearity in neural networks?",
    options: ["Softmax", "Sigmoid", "ReLU", "Mean Squared Error"],
    answer: "ReLU",
    explanation: "ReLU allows neural networks to learn complex patterns by introducing non-linearity.",
  },
  {
    type: "mcq",
    question: "What is the role of Dropout in training deep networks?",
    options: [
      "It improves accuracy",
      "It prevents overfitting by randomly disabling neurons",
      "It makes training faster",
      "It prevents gradient explosion",
    ],
    answer: "It prevents overfitting by randomly disabling neurons",
    explanation: "Dropout forces the network to generalize by reducing reliance on specific neurons.",
  },
  {
    type: "truefalse",
    question: "Gradient Descent always finds the global minimum.",
    answer: "False",
    explanation: "It can get stuck in local minima or saddle points.",
  },
  {
    type: "truefalse",
    question: "ReLU is the most commonly used activation function in modern deep learning.",
    answer: "True",
  },
  {
    type: "truefalse",
    question: "L2 regularization helps prevent overfitting by penalizing large weights.",
    answer: "True",
  },
  {
    type: "truefalse",
    question: "A deep neural network without activation functions behaves like a linear model.",
    answer: "True",
  },
  {
    type: "truefalse",
    question: "Stochastic Gradient Descent is slower than Batch Gradient Descent.",
    answer: "False",
    explanation: "SGD updates weights more frequently, making it computationally faster but noisier.",
  },
  {
    type: "mcq",
    question: "Which optimization technique modifies learning rates per parameter?",
    options: ["SGD", "Momentum", "RMSProp", "Mini-Batch Gradient Descent"],
    answer: "RMSProp",
  },
  {
    type: "mcq",
    question: "Which function is typically used for binary classification?",
    options: ["Softmax", "Sigmoid", "ReLU", "Mean Squared Error"],
    answer: "Sigmoid",
  },
  {
    type: "mcq",
    question: "Which factor helps prevent exploding gradients?",
    options: ["Learning rate decay", "Weight initialization", "Gradient clipping", "All of the above"],
    answer: "All of the above",
  },
  {
    type: "mcq",
    question: "Which loss function is typically used for classification tasks?",
    options: ["Mean Squared Error", "Cross-Entropy Loss", "L1 Loss", "Huber Loss"],
    answer: "Cross-Entropy Loss",
  },
  {
    type: "mcq",
    question: "What is the main purpose of computer vision?",
    options: [
      "Analyzing and understanding images",
      "Processing voice commands",
      "Managing databases",
      "Classifying text",
    ],
    answer: "Analyzing and understanding images",
    explanation: "Computer vision aims to analyze digital images and extract meaningful information from them.",
  },
  {
    type: "mcq",
    question: "Which of the following is an example of computer vision application?",
    options: ["Email management", "Face recognition systems", "Voice assistants", "Text editing"],
    answer: "Face recognition systems",
    explanation: "Face recognition is an application of computer vision.",
  },
  {
    type: "mcq",
    question: "What role does deep learning play in computer vision?",
    options: [
      "Data storage",
      "Direct processing and classification of images",
      "Data encryption",
      "Creating voice response systems",
    ],
    answer: "Direct processing and classification of images",
    explanation: "Deep learning models can directly process and classify images with high accuracy.",
  },
  {
    type: "mcq",
    question: "What does 'feature extraction' mean in computer vision?",
    options: [
      "Extracting meaningful information from images",
      "Managing databases",
      "Processing voice commands",
      "Analyzing text",
    ],
    answer: "Extracting meaningful information from images",
    explanation: "Feature extraction is the technique of obtaining meaningful information from images.",
  },
  {
    type: "mcq",
    question: "What type of data are deep learning models designed to work with?",
    options: ["Text data", "Image and audio data", "Only numerical data", "Only text data"],
    answer: "Image and audio data",
    explanation: "Deep learning models are specifically designed to work with image and audio data.",
  },
  {
    type: "mcq",
    question: "Which step typically comes first in computer vision?",
    options: ["Feature extraction", "Image preprocessing", "Model training", "Results visualization"],
    answer: "Image preprocessing",
    explanation: "Image preprocessing is the first step in preparing raw images for analysis.",
  },
  {
    type: "mcq",
    question: "Which type of learning is used in training deep learning models?",
    options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "All of the above"],
    answer: "All of the above",
    explanation: "Deep learning models can use supervised, unsupervised, and reinforcement learning methods.",
  },
  {
    type: "mcq",
    question: "What does 'segmentation' mean in computer vision?",
    options: [
      "Dividing an image into meaningful parts",
      "Data encryption",
      "Creating voice responses",
      "Text analysis",
    ],
    answer: "Dividing an image into meaningful parts",
    explanation: "Segmentation involves dividing an image into meaningful regions to facilitate analysis.",
  },
  {
    type: "mcq",
    question: "What is one advantage of deep learning models?",
    options: [
      "No need for feature engineering",
      "Low computational power requirements",
      "High performance with small datasets",
      "Fast training times",
    ],
    answer: "No need for feature engineering",
    explanation:
      "Deep learning models can automatically extract features from raw data, eliminating the need for manual feature engineering.",
  },
  {
    type: "mcq",
    question: "What does 'classification' mean in computer vision?",
    options: [
      "Categorizing images into predefined categories",
      "Data encryption",
      "Creating voice responses",
      "Text analysis",
    ],
    answer: "Categorizing images into predefined categories",
    explanation: "Classification involves categorizing images into predefined classes or categories.",
  },
  {
    type: "mcq",
    question: "Which architecture is commonly used for image data in deep learning models?",
    options: [
      "Convolutional Neural Networks (CNN)",
      "Recurrent Neural Networks (RNN)",
      "Decision Trees",
      "Support Vector Machines (SVM)",
    ],
    answer: "Convolutional Neural Networks (CNN)",
    explanation: "CNNs are specially designed to process image data.",
  },
  {
    type: "mcq",
    question: "Which step is typically used to improve the accuracy of computer vision models?",
    options: ["Data augmentation", "Data encryption", "Creating voice responses", "Text analysis"],
    answer: "Data augmentation",
    explanation:
      "Data augmentation is a technique used to improve a model's generalization ability by generating new data from the original dataset.",
  },
  {
    type: "mcq",
    question: "Which factors can affect the performance of deep learning models?",
    options: ["Amount and quality of data", "Model architecture", "Computational power", "All of the above"],
    answer: "All of the above",
    explanation:
      "The amount and quality of data, model architecture, and computational power can all significantly affect the performance of deep learning models.",
  },
]

// Fisher-Yates (Knuth) shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function QuizApp() {
  const [questions, setQuestions] = useState(originalQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  // Shuffle questions on initial load
  useEffect(() => {
    setQuestions(shuffleArray(originalQuestions))
  }, [])

  const currentQuestion = questions[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion?.answer

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setIsFlipped(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsFlipped(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setIsFlipped(false)
    }
  }

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index)
    setSelectedAnswer(null)
    setIsFlipped(false)
  }

  const handleShuffleQuestions = () => {
    setQuestions(shuffleArray(questions))
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsFlipped(false)
  }

  if (!currentQuestion) return <div>Loading questions...</div>

  return (
    <div className="flex flex-col items-center">
      <div className="w-full relative perspective-1000">
        <div
          className={`relative w-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card (Question) */}
          <Card className="w-full p-6 backface-hidden min-h-[300px]">
            <div className="flex justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShuffleQuestions}
                className="flex items-center gap-1 text-xs"
              >
                <Shuffle className="h-3 w-3" />
                Shuffle
              </Button>
            </div>

            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

            {currentQuestion.type === "mcq" ? (
              <MCQQuestion
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleAnswerSelect}
              />
            ) : (
              <TrueFalseQuestion selectedAnswer={selectedAnswer} onSelectAnswer={handleAnswerSelect} />
            )}
          </Card>

          {/* Back of card (Answer) */}
          <Card
            className={`absolute inset-0 p-6 backface-hidden rotate-y-180 min-h-[300px] ${
              isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <h2 className="text-xl font-semibold mb-2">{currentQuestion.question}</h2>

            <div
              className={`text-lg font-medium mb-4 ${
                isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect!"} The answer is: {currentQuestion.answer}
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium mb-2">Explanation:</h3>
              <p>{currentQuestion.explanation || "No explanation provided."}</p>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={() => setIsFlipped(false)}>Back to Question</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex flex-wrap justify-center gap-1 max-w-[60%]">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionSelect(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-125 ${
                index === currentQuestionIndex
                  ? "bg-primary scale-125"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/70 dark:hover:bg-primary/70"
              }`}
              aria-label={`Go to question ${index + 1}`}
              title={`Question ${index + 1}`}
            />
          ))}
        </div>

        <Button variant="outline" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

