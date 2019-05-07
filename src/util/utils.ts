import {flatMap, shuffle, chunk} from 'lodash/fp'
export type CardState = {char:string, found: boolean, id: number}
export type GameConfig = CardState[][]

const gameChars: string = "A,B,C,D,E,@,AB,BA"
let count = 0
export const initGameBoard = (col = 4, symbols = gameChars):GameConfig => {
    const charPairs = flatMap(v => [v,v], symbols.split(','))
    const randomizedPairs = shuffle(charPairs).map(char => ({char, found: false, id: genId() }))
    count = count + 1
    return chunk(col, randomizedPairs)
}

const genId = () => {
    count = count + 1
    return count
}