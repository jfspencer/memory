import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Card } from 'src/app/services/utils.service';

@Component({
  selector: 'card',
  template: `<div (click)="tapped()"
                  [ngClass]="cardStyle">
                    <p *ngIf="cardMatches">{{card.char}}</p>
              </div>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  //cardActive: false, cardActive: false, 
  cardStyle = 'cardBase'
  baseStyle = 'cardBase'
  cardMatches = false
  _card = {char:'', found: false, id:NaN, matchesTurn: false};
  @Input() //card: Card = {char:'A', found: false, id:1, matchesTurn: false};
  set card(latestCard: Card) {
    this._card = latestCard;
    
    if(latestCard.found ) this.cardStyle = `${this.baseStyle} cardInsivible`
    else{
      if(latestCard.matchesTurn) this.cardStyle = `${this.baseStyle} cardActive`
      else this.cardStyle = `${this.baseStyle} cardInactive`
    }
    this.cardMatches = latestCard.found ? false : latestCard.matchesTurn
  }
  @Input() 
  set cardMatchesTurn(isMatch: boolean) {
    
  }
  

  @Output() sendTap = new EventEmitter<Card>();

  tapped() {
    this.sendTap.emit(this.card)
  }

  cardInPlay(turn: Card[]) {
    turn.find(v => v.id === this.card.id)
  }
}