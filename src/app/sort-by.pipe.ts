import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(items: any[], field: string): any[] {

    if (!items && !field) {
      console.log('sortByPipe no items or field for sorting');
      return [];

    }
    items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }

}
