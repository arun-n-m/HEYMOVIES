import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string | number): string {
    if (typeof value === 'string') {
      return value;
    }
    
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}
