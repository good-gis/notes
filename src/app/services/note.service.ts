import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly storageKey = 'notes';
  private notesSubject = new BehaviorSubject<Note[]>(
    this.getNotesFromLocalStorage(),
  );
  private colors: string[] = [
    '#FADADD',
    '#AEC6CF',
    '#B2F4B2',
    '#FFEBB7',
    '#C9A9FF',
    '#F7B3B3',
    '#B0E5B9',
  ];
  private colorIndex = 0;

  constructor() {}

  saveNote(note: Note): void {
    const currentNotes = this.getNotesFromLocalStorage();
    const noteWithColor = {
      ...note,
      color: this.getNextColor(),
    };
    currentNotes.push(noteWithColor);
    this.updateLocalStorage(currentNotes);
    this.notesSubject.next(currentNotes);
  }

  getNotes$() {
    return this.notesSubject.asObservable();
  }

  deleteNote(id: string): void {
    const currentNotes = this.getNotesFromLocalStorage();
    const updatedNotes = currentNotes.filter((note) => note.id !== id);
    this.updateLocalStorage(updatedNotes);
    this.notesSubject.next(updatedNotes);
  }

  getNote(id: string): Note {
    const currentNotes = this.getNotesFromLocalStorage();
    return currentNotes.filter((note) => note.id === id)[0];
  }

  private getNotesFromLocalStorage(): Note[] {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? JSON.parse(notes) : [];
  }

  private updateLocalStorage(notes: Note[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  private getNextColor(): string {
    const color = this.colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    return color;
  }
}
