import { Output } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject } from 'rxjs/Subject';
export class TrainingService {

    excerciseChanged = new Subject<Excercise>();

    private availableExcercises: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 45, calories: 120 },
        { id: 'biceps', name: 'Biceps', duration: 50, calories: 80 }
    ];

    private runningExcercise: Excercise;
    getAvailableExcercises() {
        return this.availableExcercises.slice();
    }
    startExcercise(selectedId: string) {
        this.runningExcercise = this.availableExcercises.find(ex => ex.id === selectedId);
        this.excerciseChanged.next({
            ...this.runningExcercise
        });
    }
}
