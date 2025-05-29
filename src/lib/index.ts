import {
  FaBook,
  FaBrain,
  FaCalculator,
  FaCar,
  FaComments,
  FaDice,
  FaFilm,
  FaFootballBall,
  FaGamepad,
  FaGlobeAmericas,
  FaLandmark,
  FaLaptop,
  FaMicroscope,
  FaMobileAlt,
  FaMusic,
  FaPalette,
  FaPaw,
  FaScroll,
  FaStar,
  FaTheaterMasks,
  FaTv,
  FaUniversity,
  FaYenSign,
} from "react-icons/fa";

import { MdAnimation } from "react-icons/md";

type ApiQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  type: string;
};

export const categoryIconMap = {
  9: FaBrain, // General Knowledge
  10: FaBook, // Entertainment: Books
  11: FaFilm, // Entertainment: Film
  12: FaMusic, // Entertainment: Music
  13: FaTheaterMasks, // Entertainment: Musicals & Theatres
  14: FaTv, // Entertainment: Television
  15: FaGamepad, // Entertainment: Video Games
  16: FaDice, // Entertainment: Board Games
  17: FaMicroscope, // Science & Nature
  18: FaLaptop, // Science: Computers
  19: FaCalculator, // Science: Mathematics
  20: FaScroll, // Mythology
  21: FaFootballBall, // Sports
  22: FaGlobeAmericas, // Geography
  23: FaLandmark, // History
  24: FaUniversity, // Politics
  25: FaPalette, // Art
  26: FaStar, // Celebrities
  27: FaPaw, // Animals
  28: FaCar, // Vehicles
  29: FaComments, // Entertainment: Comics
  30: FaMobileAlt, // Science: Gadgets
  31: FaYenSign, // Entertainment: Japanese Anime & Manga
  32: MdAnimation, // Entertainment: Cartoon & Animations
};

export function convertQuestions(results: ApiQuestion[]): Question[] {
  return results.map((item, index) => {
    const allOptions = [...item.incorrect_answers, item.correct_answer];
    const shuffledOptions = shuffleArray(allOptions);

    return {
      id: index + 1,
      question: decodeHtml(item.question),
      options: shuffledOptions.map(decodeHtml),
      correct: shuffledOptions.indexOf(item.correct_answer),
      type: item.type,
    };
  });
}

// mengacak aray jawaban (Fisher-Yates Shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// mendecode HTML entities seperti &quot; jadi "
function decodeHtml(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
