import type { WasAnswerCorrect } from '../learning-dino-api-client';

export function getToastColor(result: WasAnswerCorrect) {
	if (result.learned) return 'success';
	if (result.correct) return 'light';
	return 'warning';
}

export function getToastBody(result: WasAnswerCorrect) {
	if (result.learned) return getRandomElement(big_positive_header);
	if (result.correct) return getRandomElement(small_positive_header) + ' ' + result.nbAnswersCorrectInARow + '/' + result.repetitionsToLearn;
	return getRandomElement(negative_header);
}

function getRandomElement(array: any[]) {
	return array[Math.floor(Math.random() * array.length)];
}

let small_positive_header = ['Nice!', 'Good!', 'Correct!', 'Yes!'];
let big_positive_header = ['Well done!', 'Yeah!', 'Woohoo!'];
let negative_header = ['Whoops!', 'Nope!', 'Maybe next time...'];