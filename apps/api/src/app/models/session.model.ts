import { JsonObject, JsonProperty } from 'json2typescript';
import { Model } from '../utils/model-decorator';

@Model({ table: 'sessions' })
@JsonObject('SessionModel')
export class SessionModel {
  @JsonProperty('id', String, true)
  public id: string | null = null;
}
