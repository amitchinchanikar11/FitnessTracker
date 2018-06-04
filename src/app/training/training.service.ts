import { Output } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject } from 'rxjs/Subject';
export class TrainingService {

    excerciseChanged = new Subject<Excercise>();
    excercises: Excercise[] = [];

    private availableExcercises: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 45, calories: 120 },
        { id: 'biceps', name: 'Biceps', duration: 100, calories: 80 }
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
    getRunningExcercise() {
        return { ...this.runningExcercise };
    }
    completeExcercise() {
        this.excercises.push({ ...this.runningExcercise, date: new Date(), state: 'Completed' });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }
    cancelExcercise(progress: number) {
        this.excercises.push({
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress / 100),
            calories: this.runningExcercise.calories * (progress / 100),
            date: new Date(),
            state: 'Cancelled'
        });
        console.log(this.excercises);
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    getCompletedOrCancelledExcercises() {
        return this.excercises.slice();
    }
}
