import { Injectable } from '@angular/core';
import { shuffle, uniq, partition, map, some} from 'lodash/fp'

export type Card = {char:string, found: boolean, id: number, matchesTurn}
export type GameConfig = Card[]


@Injectable()
export class UtilsService {
    static defaultGameChars: string = "A,B,C,D,E,@,AB,BA"
    static count = 0

    cardTapped(game:GameConfig, card: Card, turn: Card[]) {
      if(turn.length  < 2) return [game, [...turn, card]]
      else if(turn.length === 2) {
        const [c1, c2] = turn
        if(c1.char === c2.char) {
          const [matchedCards]: Card[][] = partition((v: Card) => v.id === c1.id || v.id === c2.id, game)
          const [foundMatch1, foundMatch2]:Card[] = map((v: Card): Card => ({...v, found:true}), matchedCards)
          const updatedGame = map(this.updateMatches(foundMatch1, foundMatch2, turn), game)
          return [[...updatedGame], [card]]
        }
        return [[...game], [card]]
      }
      return [[...game], []]
    }

    initGameBoard(col = 4, symbols = UtilsService.defaultGameChars): GameConfig {
        const symbolsArray = symbols.split(',')
        const uniqSymbols = uniq(symbolsArray) //recent addition
        const charPairs = [...uniqSymbols, ...uniqSymbols] //18M ops/sec
        const randomizedPairs = 
            shuffle(charPairs).map(char => ({char, found: false, id: this.genId(),matchesTurn:false }))
        return randomizedPairs
    }

    private genId() {
        UtilsService.count = UtilsService.count + 1
        return UtilsService.count
   }

   private updateMatches (m1: Card, m2:Card, turn: Card[]) {
    
        return (card: Card) =>  {
            if(card.id === m1.id) return  m1;
            else if(card.id === m2.id) return m2;
            else return some((v: Card) => v.id === card.id, turn) ? {...card, matchesTurn: true} : {...card, matchesTurn: false} 
          }
   }
}