import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoteEditorService {
  get noteEditor$(): Observable<string> {
    return this._noteEditor$.asObservable();
  }
  private _noteEditor$ = new BehaviorSubject<string>('');

  constructor() {}

  openNoteEditor(noteId: string) {
    this._noteEditor$.next(noteId);
  }
}
