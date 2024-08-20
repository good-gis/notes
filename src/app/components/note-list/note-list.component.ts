import { Component, inject } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { NoteService } from '../../services/note.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteComponent, AsyncPipe],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  noteService = inject(NoteService);
}
