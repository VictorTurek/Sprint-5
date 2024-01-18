import { Component, Input } from '@angular/core';
import { IStep } from '../interfaces/istep.interface';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { CommonModule } from '@angular/common';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];


@Component({
  selector: 'app-escena',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escena.component.html',
  styleUrl: './escena.component.sass',
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class EscenaComponent {
  counter: number = 0;
  @Input() onboardingSteps: IStep[] = [];
  currentStep: number = 0; // Variable que controla en qué frase estamos

  next() {
    if (this.counter != this.onboardingSteps.length - 1) {
      this.counter++;
      this.currentStep = this.counter;
    }
  }

  previous() {
    if (this.counter > 0) {
      this.counter--;
      this.currentStep = this.counter;
    }
  }

  isFirstCard(): boolean {
    return this.counter === 0;
  }

  isLastCard(): boolean {
    return this.counter === this.onboardingSteps.length - 1;
  }

  getRightButtonImage(): string {
    return this.isLastCard() ? 'url(../assets/right-no.png)' : 'url(../assets/right.png)';
  }

  getLeftButtonImage(): string {
    return this.isFirstCard() ? 'url(../assets/left-no.png)' : 'url(../assets/left.png)';
  }

  changeCard(index: number): void {
    this.currentStep = index;
    this.counter = index;
  }

}