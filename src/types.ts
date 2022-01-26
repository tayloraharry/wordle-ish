export interface ILetter {
  value: string;
  present: boolean;
  correct: boolean;
}

export interface IWord {
  text: string;
  letters: ILetter[];
}