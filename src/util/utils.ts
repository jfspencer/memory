import { shuffle, chunk, uniq} from 'lodash/fp'
import { GameConfig } from '../state/SessionState';

export const defaultGameChars: string = "A,B,C,D,E,@,AB,BA"
let count = 0

export const initGameBoard = (col = 4, symbols = defaultGameChars):GameConfig => {
    //const charPairs = flatMap(v => [v,v], symbols.split(',')) // really slow 800K ops/sec
    const symbolsArray = symbols.split(',')
    const uniqSymbols = uniq(symbolsArray) //recent addition
    const charPairs = [...uniqSymbols, ...uniqSymbols] //18M ops/sec
    const randomizedPairs = shuffle(charPairs).map(char => ({char, found: false, id: genId() }))
    return chunk(col, randomizedPairs)
}

const genId = () => {
    count = count + 1
    return count
}