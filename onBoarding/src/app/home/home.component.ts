import { Component, OnInit } from '@angular/core';
import { EscenaComponent } from '../escena/escena.component';
import { StepsService } from '../steps.service';
import { IStep } from '../interfaces/istep.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EscenaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit {
  onboardingSteps: IStep[] = [];

  constructor(private stepsService: StepsService) {}

  ngOnInit(): void {
    this.onboardingSteps = this.stepsService.getOnboardingSteps();
  }
}
