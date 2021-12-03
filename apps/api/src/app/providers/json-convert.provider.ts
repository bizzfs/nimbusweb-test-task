import { FactoryProvider } from '@nestjs/common';
import { JsonConvert } from 'json2typescript';

export const jsonConvertProvider: FactoryProvider = {
  provide: JsonConvert,
  useFactory: () => new JsonConvert(),
};
