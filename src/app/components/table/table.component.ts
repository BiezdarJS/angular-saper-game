import { Component } from '@angular/core';
// Animations
import { trigger, style, animate, transition } from '@angular/animations';
// Services
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('gradientOverlay', [
      transition(':enter', [
        style({
          backgroundPosition: '110% 110%'
        }),
        animate('1000ms ease-in-out', style({
          backgroundPosition: '-10% -10%'
        }))
      ])
    ]),
    trigger('stateOverlay', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 1000ms', style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class TableComponent {

  constructor(public gameLogicS: GameLogicService) {
    gameLogicS.newGame();
  }

  getTableStyle() {
    return {
      'grid-template-columns': `repeat(${this.gameLogicS.gridWidth}, ${this.gameLogicS.cellWidth}px)`,
      'grid-template-rows': `repeat(${this.gameLogicS.gridHeight}, ${this.gameLogicS.cellHeight}px)`,
    }
  }
}
