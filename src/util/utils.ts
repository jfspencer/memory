import {flatMap, shuffle, chunk} from 'lodash/fp'
export type CardState = {char:string, found: boolean, id: number}
export type GameConfig = CardState[][]

export const defaultGameChars: string = "A,B,C,D,E,@,AB,BA"
let count = 0

export const initGameBoard = (col = 4, symbols = defaultGameChars):GameConfig => {
    //const charPairs = flatMap(v => [v,v], symbols.split(',')) // really slow 800K ops/sec
    const symbolsArray = symbols.split(',')
    const charPairs = [...symbolsArray, ...symbolsArray] //18M ops/sec
    const randomizedPairs = shuffle(charPairs).map(char => ({char, found: false, id: genId() }))
    count = count + 1
    return chunk(col, randomizedPairs)
}

const genId = () => {
    count = count + 1
    return count
}