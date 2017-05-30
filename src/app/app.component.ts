import { Component } from '@angular/core';

@Component({

  selector: 'app-root',
  template: `
        <h1>Text ({{textValue}})</h1>
        <input #textbox type="text" [(ngModel)]="textValue" required> 
        <button (click)="logText(textbox.value)">Update Log</button>
        <button (click)="textValue=''">Clear</button>
        
        <h2>Template Reference Variable</h2>
        Type: '{{textbox.type}}', required: '{{textbox.hasAttribute('required')}}',
        upper: '{{textbox.value.toUpperCase()}}'
        
        
        <pre>{{log}}</pre>`
,  styles: ['h1{color: red;}'],



})
export class AppComponent {
private textValue = "initial value";
    private log: string ='';

    private logText(value: string): void {
        this.log += `Text changed to '${value}'\n`
    }
}
