import { Component } from '@angular/core';
import {TuiIslandDirective} from "@taiga-ui/legacy";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    TuiIslandDirective
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

}
