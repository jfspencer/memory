import {flatMap, shuffle, chunk} from 'lodash/fp'

type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type GameBoard = validChar[][]

export const genGameBoard = (charArr: validChar[]):GameBoard => {
    //flatmap the charArray to generate the char pairs
    const charPairs = flatMap(v => [v,v], charArr)
    const randomizedPairs = shuffle(charPairs)
    console.log(chunk(4, randomizedPairs) as any)
    return chunk(4, randomizedPairs) as GameBoard
}