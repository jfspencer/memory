import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Card } from '../../services/utils.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  turn: Card[] = []
  @Input() cards: Card[] = []

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.cards = this.utils.initGameBoard()
  }

  cardTapped(card: Card) {
    const [nextCards, nextTurn] = this.utils.cardTapped(this.cards, card, this.turn)
    console.log(nextCards, nextTurn)
    this.cards = nextCards
    this.turn = nextTurn
  }

  trackCards(i, card:Card){
    return card.id
  }
  
}
