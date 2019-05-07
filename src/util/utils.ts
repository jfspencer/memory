import {flatMap, shuffle, chunk} from 'lodash/fp'

export type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
export type CardState = {char:validChar, found: boolean}
export type GameConfig = CardState[][]

const gameChars: validChar[] = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H']
export const genGameBoard = (symbols = gameChars, rows = 4):GameConfig => {
    
    //flatmap the charArray to generate the char pairs
    const charPairs = flatMap(v => [v,v], symbols)
    const randomizedPairs = shuffle(charPairs).map(char => ({char, found: false }))
    return chunk(rows, randomizedPairs)
}