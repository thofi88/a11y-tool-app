import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    if (filter === 'Kein') {
      return items;
    }
    else {
      return items;

      // TODO implements filter by category
      // return items.filter(item => item.category_id.indexOf(filter) !== -1);
    }
}

}
