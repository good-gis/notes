import { Component, inject, Input, OnInit } from '@angular/core';
import { TuiCardLarge, TuiCardMedium, TuiHeader } from '@taiga-ui/layout';
import {
  TuiButton,
  TuiDialogService,
  TuiHintDirective,
  TuiLink,
  TuiSurface,
  TuiTitle,
} from '@taiga-ui/core';
import { TUI_CONFIRM, TuiAvatar, TuiConfirmData, TuiFade } from '@taiga-ui/kit';
import { TuiIslandDirective } from '@taiga-ui/legacy';
import { marked } from 'marked';
import { NgIf, NgStyle } from '@angular/common';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { NoteEditorService } from '../../services/note-editor.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    TuiCardLarge,
    TuiSurface,
    TuiHeader,
    TuiTitle,
    TuiCardMedium,
    TuiFade,
    TuiHintDirective,
    TuiIslandDirective,
    TuiLink,
    NgStyle,
    TuiButton,
    TuiAvatar,
    NgIf,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent implements OnInit {
  @Input() note: Note | undefined;
  public transformedTextNote: string = '';

  private readonly dialogs = inject(TuiDialogService);
  private readonly noteService = inject(NoteService);
  private readonly noteEditorService: NoteEditorService =
    inject(NoteEditorService);

  async ngOnInit() {
    if (this.note) {
      this.transformedTextNote = await marked(this.note.textNote || '');
    }
  }

  public deleteNote(id: string | undefined) {
    if (id) {
      const data: TuiConfirmData = {
        yes: 'Да',
        no: 'Нет',
      };

      this.dialogs
        .open<boolean>(TUI_CONFIRM, {
          label: 'Удалить заметку?',
          size: 's',
          data,
        })
        .subscribe((response) => {
          if (response) {
            this.noteService.deleteNote(id);
          }
        });
    }
  }

  public showEditor(id: string | undefined) {
    if (id) {
      this.noteEditorService.openNoteEditor(id);
    }
  }
}
