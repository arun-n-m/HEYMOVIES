import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, limit: number = 26): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '..' : value;
  }

}
