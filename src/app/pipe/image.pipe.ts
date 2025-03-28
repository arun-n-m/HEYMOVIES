import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${environment.tmdb_base_image_url}/${value}`;
  }

}
