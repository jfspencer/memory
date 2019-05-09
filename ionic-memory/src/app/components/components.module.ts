import { NgModule } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';

const componentList = [
    BoardComponent,
    CardComponent
];

@NgModule({
  imports: [ CommonModule ],
  declarations: componentList,
  exports: componentList,
})
export class ComponentsModule {}