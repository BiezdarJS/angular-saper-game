import { Component, EventEmitter, Input, Output } from '@angular/core';
// Models
import { Cell } from 'src/app/models/cell.model';
// Services
import { GameLogicService } from 'src/app/services/game-logic.service';


@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input('index') index!: number;
  @Input('cell') cell!: Cell;
  flagSymbol = '';
  symbol = '';
  symbolColor = 'cyan';

  @Output() onClickEvent = new EventEmitter<number>();

  constructor(public gameLogicS: GameLogicService) { }

  ngOnInit() {
    if (this.cell.value == -1) {
      this.symbol = '💣';
    }
    else if (this.cell.value > 0) {
      this.symbol = this.cell.value.toString();
      switch (this.cell.value) {
        case 1: this.symbolColor = '#00ffff'; break;
        case 2: this.symbolColor = '#00ff00'; break;
        case 3: this.symbolColor = '#ffbe00'; break;
        case 4: this.symbolColor = '#2f0076'; break;
        case 5: this.symbolColor = '#8c0000'; break;
        case 6: this.symbolColor = '#34b200'; break;
        case 7: this.symbolColor = 'black'; break;
        case 8: this.symbolColor = '#aeaeae'; break;
      }
    }
  }

  onClick() {
    this.gameLogicS.startTimer();
    if (this.cell.value == -1) {
      this.symbol = '💥';
    }
    this.gameLogicS.onCellClick(this.index);
  }

  onRightClick() {
    this.gameLogicS.startTimer();
    this.gameLogicS.onCellFlag(this.index);
    switch (this.cell.flag) {
      case 0: this.flagSymbol = ''; break;
      case 1: this.flagSymbol = '🚩'; break;
      case 2: this.flagSymbol = '?'; break;
    }
    return false;
  }
}
