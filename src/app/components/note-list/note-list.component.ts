import { Component } from '@angular/core';
import {NoteComponent} from "../note/note.component";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    NoteComponent
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {

}
