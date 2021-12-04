import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { scan, Subject, withLatestFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreState } from '../../../store/state';
import { formatNoteTextTags } from '../../../shared/helpers/format-note-text';
import { NotesActions } from '../../../store/actions';
import { NotesSelectors } from '../../../store/selectors';
import { NoteState } from '../../../store/state/notes.state';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit, OnDestroy {
  private readonly destroySubj$ = new Subject<void>();

  selectedNote$ = this.store.pipe(select(NotesSelectors.getSelected));

  form = this.formBuilder.group({
    title: this.formBuilder.control('', { updateOn: 'blur' }),
    text: this.formBuilder.control('', { updateOn: 'blur' }),
  });

  private textAreaElementShouldFocus = false;

  @ViewChild('textAreaElement')
  set viewAreaElement(val: ElementRef<HTMLTextAreaElement>) {
    if (this.textAreaElementShouldFocus) {
      this.textAreaElementShouldFocus = false;
      val.nativeElement.focus();
    }
  }

  private readonly toggleTextEditingSubj$ = new Subject<void>();
  isEditingText$ = this.toggleTextEditingSubj$.pipe(
    scan((value) => {
      if (!value) {
        this.textAreaElementShouldFocus = true;
      }
      return !value;
    }, false)
  );

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store<CoreState.State>) {}

  ngOnInit(): void {
    this.selectedNote$
      .pipe(takeUntil(this.destroySubj$))
      .subscribe((note) => note && this.form.setValue({ title: note.title, text: note.text }, { emitEvent: false }));

    this.form.valueChanges
      .pipe(takeUntil(this.destroySubj$), withLatestFrom(this.selectedNote$))
      .subscribe(([value, selectedNote]: [{ title: string; text: string }, NoteState | null]) => {
        if (selectedNote) {
          this.store.dispatch(
            NotesActions.updateRequest({
              note: {
                id: selectedNote.id,
                title: value.title,
                text: value.text,
              },
            })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubj$.next();
  }

  toggleTextEdit(): void {
    this.toggleTextEditingSubj$.next();
  }

  getTextFormValue(): string {
    return formatNoteTextTags(this.form.value.text);
  }
}
