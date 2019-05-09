import { Component } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  gameBoard = []
  constructor(private utils: UtilsService){
    this.gameBoard = utils.initGameBoard()
  }
}
