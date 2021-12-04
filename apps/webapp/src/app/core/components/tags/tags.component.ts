import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { CoreState } from '../../../store/state';
import { getVisibleTags, TagsSelectors } from '../../../store/selectors';
import { TagsActions } from '../../../store/actions';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  tags$ = this.store.pipe(select(getVisibleTags));
  selectedTag$ = this.store.pipe(select(TagsSelectors.getSelectedTag));

  constructor(private readonly store: Store<CoreState.State>) {}

  toggleTag(tag: string) {
    this.store.dispatch(TagsActions.toggleSelected({ tag }));
  }

  trackBy(index: number, item: string): string {
    return item;
  }
}
