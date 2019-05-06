import flatMap from 'lodash/fp/flatMap'
import shuffle from 'lodash/fp/shuffle';

type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type GameBoard = validChar[][]

export const genGameBoard = (charArr: string[]):GameBoard => {
    //flatmap the charArray to generate the char pairs
    const charPairs = flatMap(v => [v,v], charArr)
    const randomizedPairs = shuffle(charPairs)
    



    return [['A'],['A']]
}