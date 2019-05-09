import { Injectable } from '@angular/core';
import { shuffle, uniq} from 'lodash/fp'

export type Card = {char:string, found: boolean, id: number, matchesTurn}
export type GameConfig = Card[]


@Injectable()
export class UtilsService {
    static defaultGameChars: string = "A,B,C,D,E,@,AB,BA"
    static count = 0
    initGameBoard(col = 4, symbols = UtilsService.defaultGameChars): GameConfig {
        const symbolsArray = symbols.split(',')
        const uniqSymbols = uniq(symbolsArray) //recent addition
        const charPairs = [...uniqSymbols, ...uniqSymbols] //18M ops/sec
        const randomizedPairs = shuffle(charPairs).map(char => ({char, found: false, id: this.genId(),matchesTurn:false }))
        return randomizedPairs
    }

    genId() {
        UtilsService.count = UtilsService.count + 1
        return UtilsService.count
   }
}