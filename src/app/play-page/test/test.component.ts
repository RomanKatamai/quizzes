import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Test } from "../../shared/interfaces";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @Input() test!: Test;
  @Output() answerSelected = new EventEmitter<string>();

  respond(answer: string) {
    this.answerSelected.emit(answer);
  }
}
