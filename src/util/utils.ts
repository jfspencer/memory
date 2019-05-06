import {flatMap, shuffle, chunk} from 'lodash/fp'

export type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
export type GameConfig = validChar[][]

const gameChars: validChar[] = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H']
export const genGameBoard = ():GameConfig => {
    
    //flatmap the charArray to generate the char pairs
    const charPairs = flatMap(v => [v,v], gameChars)
    const randomizedPairs = shuffle(charPairs)
    return chunk(4, randomizedPairs)
}