import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inner-component',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.css']
})
export class InnerComponent implements OnInit {

  constructor() { }
  nickName: string = "techie";
  @Input() firstInput;
  @Output() emitOutput = new EventEmitter();
  ngOnInit(): void {
  }

  onSubmit(formValue){
    console.log(formValue)
    this.emitOutput.emit(formValue.value.nickName)
  }
}
