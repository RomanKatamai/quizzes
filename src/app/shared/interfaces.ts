export interface Category {
  id: number,
  name: string
}

export interface TriviaCategories {
  trivia_categories : Category[]
}

export interface Test {
  title: string;
  quantity: number;
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: []
}
