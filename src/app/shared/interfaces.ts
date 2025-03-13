export interface Category {
  id: number,
  name: string
}

export interface TriviaCategories {
  trivia_categories : Category[]
}

export interface Test {
  title: string,
  quantity: number,
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: [],
  results?: [],
  answers?: string[]
}

export interface UserInterface {
  email?: string;
  username: string;
  password?: string;
  id?: string;
}

export interface FBCreateResponse {
  name: string
}

export interface Card {
  id?: string;
  title: string;
  correct_answer: number;
  percent: number;
  time: string;
  date: Date;
  quantity: number;
}
