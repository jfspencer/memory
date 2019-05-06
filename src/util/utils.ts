import {flatMap, shuffle, chunk} from 'lodash/fp'

export type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type GameBoard = validChar[][]

const gameChars: validChar[] = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H']
export const genGameBoard = ():GameBoard => {
    
    //flatmap the charArray to generate the char pairs
    const charPairs = flatMap(v => [v,v], gameChars)
    const randomizedPairs = shuffle(charPairs)
    console.log(chunk(4, randomizedPairs) as any)
    return chunk(4, randomizedPairs) as GameBoard
}