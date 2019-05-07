import {flatMap, shuffle, chunk} from 'lodash/fp'
import { store } from '../state';
import { getPrefs } from '../state/SessionState';

export type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | '@' | 'SDLKFJ'
export type CardState = {char:validChar, found: boolean, id: number}
export type GameConfig = CardState[][]

const gameChars: validChar[] = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H', '@', 'SDLKFJ']
let count = 0
export const genGameBoard = ():GameConfig => {
    //const {columns = 4, symbols }:{columns: number, symbols: string} = getPrefs(store.getState())
    
    //flatmap the charArray to generate the char pairs
    const charPairs = flatMap(v => [v,v], gameChars as validChar[])
    const randomizedPairs = shuffle(charPairs).map(char => ({char, found: false, id: genId() }))
    count = count + 1
    return chunk(4, randomizedPairs)
}

const genId = () => {
    count = count + 1
    return count
}