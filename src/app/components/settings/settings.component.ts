import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
// Animations
import { trigger, style, animate, transition, query, animateChild, group } from '@angular/animations';
// Forms
import { FormControl } from '@angular/forms';
// Services
import { GameLogicService } from 'src/app/services/game-logic.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('modal', [
      transition(':enter', [
        group([
          query('@overlay', animateChild()),
          query('@container', animateChild())
        ])
      ]),
      transition(':leave', [
        group([
          query('@overlay', animateChild()),
          query('@container', animateChild())
        ])
      ])
    ]),
    trigger('overlay', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('100ms', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('100ms', style({
          opacity: 0
        })),
      ])
    ]),
    trigger('container', [
      transition(':enter', [
        style({
          marginTop: '100px'
        }),
        animate('100ms', style({
          marginTop: '0px'
        })),
      ]),
      transition(':leave', [
        style({
          marginTop: '0px'
        }),
        animate('100ms', style({
          marginTop: '-100px'
        })),
      ]),
    ])
  ],
})
export class SettingsComponent implements AfterViewChecked {

  width = new FormControl(this.gameLogicS.gridWidth);
  height = new FormControl(this.gameLogicS.gridHeight);
  bombs = new FormControl(this.gameLogicS.bombs);

  constructor(
    private cdr: ChangeDetectorRef,
    public gameLogicS: GameLogicService
  ) { }

  saveSettings() {
    this.gameLogicS.settingsVisible = false;
    this.gameLogicS.gridWidth = this.width.value!;
    this.gameLogicS.gridHeight = this.height.value!;
    this.gameLogicS.bombs = this.bombs.value!;
    this.gameLogicS.newGame();
  }

  getMaxBombs() {
    return Math.floor(this.width.value! * this.height.value! * 0.9);
  }

  ngAfterViewChecked() {
    this.bombs.setValue(Math.min(this.getMaxBombs(), this.bombs.value!));
    this.cdr.detectChanges();
  }
}
