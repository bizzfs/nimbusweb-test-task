import { JsonObject, JsonProperty } from 'json2typescript';

import { Note } from '@nimbusweb-test-task/ws-interfaces';

import { Model } from '../utils/model-decorator';

@Model({ table: 'notes' })
@JsonObject('NoteModel')
export class NoteModel {
  @JsonProperty('id', String, true)
  public id: string | null = null;
  @JsonProperty('title', String)
  public title: string | null = null;
  @JsonProperty('text', String)
  public text: string | null = null;
  @JsonProperty('sid', String)
  public sid: string | null = null;

  static fromNote(note: Note): NoteModel {
    return Object.assign(new NoteModel(), note);
  }
  toNote = (): Note => {
    return { ...this };
  };
}
