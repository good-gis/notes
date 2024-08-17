import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButton, TuiHint, TuiTextfield} from "@taiga-ui/core";
import {TuiInputModule, TuiTextareaModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {NgIf} from "@angular/common";
import {NoteService} from "../../services/note.service";
import { v4 as uuidv4 } from 'uuid';
import {Note} from "../../interfaces/note";

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    TuiInputModule,
    TuiTextfield,
    TuiHint, TuiTextareaModule, NgIf, TuiButton, TuiTextfieldControllerModule,],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.css'
})
export class NoteCreateComponent implements OnInit {

  @Output() noteCreated = new EventEmitter<{ headerNote: string, textNote: string }>();

  protected readonly addNoteForm = new FormGroup({
    headerNote: new FormControl(''),
    textNote: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  isShowTextForm = false;

  constructor(private readonly noteService: NoteService) {}

ngOnInit() {
  this.addNoteForm.get('headerNote')?.valueChanges.subscribe(value => {
    if (value === '') {
      this.toggleShowTextForm();
    }
  });
}

  toggleShowTextForm(isClosable = true) {
    if (this.isShowTextForm && !isClosable) {
      return;
    }
    this.isShowTextForm = !this.isShowTextForm;
  }

  saveNote() {
    if(this.addNoteForm.valid) {

      const note: Note = {
        headerNote: this.addNoteForm.value.headerNote || '',
        textNote: this.addNoteForm.value.textNote || '',
        id: uuidv4(),
      }
      this.noteService.saveNote(note);
      this.toggleShowTextForm();
      this.addNoteForm.reset();
    }
  }

  resetNote() {
    this.toggleShowTextForm();
    this.addNoteForm.reset();
  }
}
