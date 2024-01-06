import { Component, Input } from '@angular/core';
import { IStep } from '../interfaces/istep.interface';
import { trigger, transition, query, style, animate, group } from '@angular/animations';


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
  imports: [],
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

  next() {
    if (this.counter != this.onboardingSteps.length - 1) {
      this.counter++;
    }
  }

  isLastCard(): boolean {
    return this.counter === this.onboardingSteps.length - 1;
  }

  getRightButtonImage(): string {
    return this.isLastCard() ? 'url(../assets/right-no.png)' : 'url(../assets/right.png)';
  }

  previous() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  isFirstCard(): boolean {
    return this.counter === 0;
  }

  getLeftButtonImage(): string {
    return this.isFirstCard() ? 'url(../assets/left-no.png)' : 'url(../assets/left.png)';
  }

  getStatusDots(): string {
    const dotsArray = Array.from({ length: this.onboardingSteps.length }, (_, index) => {
      return index === this.counter ? '-' : '·';
    });
    return dotsArray.join('');
  }

  changeCard(event: MouseEvent): void {
    const statusElement = event.target as HTMLElement;
    const dotIndex = Array.from(statusElement.children).indexOf(event.target as Element);

    if (dotIndex !== -1) {
      this.counter = dotIndex;
    }
  }
  
}
