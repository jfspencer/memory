import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Card } from '../../services/utils.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() cards: Card[] = []

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.cards = this.utils.initGameBoard()
  }

  cardTapped(card: Card) {
    const nextGameState = this.utils.cardTapped(this.cards, card)
    console.log(nextGameState)
    this.cards = nextGameState
  }

  trackCards(i, card:Card){
    return card.id
  }
  
}
