"use client"

import { Button } from "@/components/ui/button"

interface TrueFalseQuestionProps {
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

export default function TrueFalseQuestion({ selectedAnswer, onSelectAnswer }: TrueFalseQuestionProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant={selectedAnswer === "True" ? "default" : "outline"}
        className="flex-1 h-16 text-lg"
        onClick={() => onSelectAnswer("True")}
      >
        True
      </Button>
      <Button
        variant={selectedAnswer === "False" ? "default" : "outline"}
        className="flex-1 h-16 text-lg"
        onClick={() => onSelectAnswer("False")}
      >
        False
      </Button>
    </div>
  )
}

