import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService,
  TuiHint,
  TuiTextfield,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { NgIf } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../interfaces/note';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { TuiHeader } from '@taiga-ui/layout';
import { tap } from 'rxjs';
import { NoteEditorService } from '../../services/note-editor.service';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfield,
    TuiHint,
    TuiTextareaModule,
    NgIf,
    TuiButton,
    TuiTextfieldControllerModule,
    TuiHeader,
  ],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.css',
})
export class NoteCreateComponent implements OnInit {
  @Output() noteCreated = new EventEmitter<{
    headerNote: string;
    textNote: string;
  }>();
  @ViewChild('template') dialogContent: any;
  public note: Note | undefined;
  public isShowTextForm = false;

  protected readonly addNoteForm = new FormGroup({
    headerNote: new FormControl(''),
    textNote: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  private readonly dialogs = inject(TuiDialogService);
  private readonly noteEditorService = inject(NoteEditorService);
  private readonly noteService = inject(NoteService);

  ngOnInit() {
    this.initOpenFullNoteViewSubscription();
  }

  public toggleShowTextForm(isClosable = true) {
    if (this.isShowTextForm && !isClosable) {
      return;
    }
    this.isShowTextForm = !this.isShowTextForm;
  }

  public saveNote() {
    if (this.addNoteForm.valid) {
      const note: Note = {
        headerNote: this.addNoteForm.value.headerNote || '',
        textNote: this.addNoteForm.value.textNote || '',
        id: uuidv4(),
      };
      this.noteService.saveNote(note);
      this.toggleShowTextForm();
      this.addNoteForm.reset();
    }
  }

  public resetNote() {
    this.toggleShowTextForm();
    this.addNoteForm.reset();
  }

  private showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  private initOpenFullNoteViewSubscription(): void {
    this.noteEditorService.noteEditor$
      .pipe(
        tap((id) => {
          this.note = this.noteService.getNote(id);
          if (this.note) {
            this.showDialog(this.dialogContent);
          }
        }),
      )
      .subscribe();
  }
}
