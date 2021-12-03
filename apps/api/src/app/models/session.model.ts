import { JsonObject, JsonProperty } from 'json2typescript';
import { Model } from '../utils/model-decorator';

@Model({ table: 'sessions' })
@JsonObject('SessionModel')
export class SessionModel {
  @JsonProperty('id', String, true)
  public id: string | null = null;
  @JsonProperty('timestamp', Number, true)
  public timestamp: number | null = null;

  static fromTimestamp(timestamp: number) {
    return Object.assign(new SessionModel(), { timestamp });
  }
}
