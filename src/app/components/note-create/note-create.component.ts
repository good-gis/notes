import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiButton, TuiHint, TuiTextfield} from "@taiga-ui/core";
import {TuiInputModule, TuiTextareaModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiHint, TuiTextareaModule, NgIf, TuiButton,],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.css'
})
export class NoteCreateComponent implements OnInit {
  protected readonly addNoteForm = new FormGroup({
    headerNote: new FormControl(''),
    textNote: new FormControl(''),
  });
  isShowTextForm = false;

ngOnInit() {
  this.addNoteForm.get('headerNote')?.valueChanges.subscribe(value => {
    if (value === '') {
      this.toggleShowTextForm();
    }
  });
}

  toggleShowTextForm() {
    this.isShowTextForm = !this.isShowTextForm;
  }

  saveNote() {
    this.toggleShowTextForm();
    this.addNoteForm.reset();
  }
}
