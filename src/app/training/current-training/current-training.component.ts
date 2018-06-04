import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrStopTimer();
  }

  startOrStopTimer() {
    const step = this.trainingService.getRunningExcercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExcercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.trainingService.cancelExcercise(this.progress);
        } else {
          this.startOrStopTimer();
        }
      }

    );

  }

}
