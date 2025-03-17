"use client"

import { RadioGroup } from "@/components/ui/radio-group"

interface MCQQuestionProps {
  options: string[]
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

export default function MCQQuestion({ options, selectedAnswer, onSelectAnswer }: MCQQuestionProps) {
  return (
    <RadioGroup value={selectedAnswer || ""} className="space-y-3">
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedAnswer === option ? "bg-primary/10 border-primary" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => onSelectAnswer(option)}
        >
          <div className="w-full">{option}</div>
        </div>
      ))}
    </RadioGroup>
  )
}

