import { Component, Input } from '@angular/core';
import { Card } from "../../shared/interfaces";

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})

export class ResultCardComponent {
  @Input() card!: Card;
}
