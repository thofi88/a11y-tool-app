import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(items: any[], field: any): any[] {

    if (!items && !field) {
      console.log('sortByPipe no items or field for sorting');
      return [];

    }
    if (field === 'name'){
      items.sort((a, b) => a.name.localeCompare(b.name));
    }
    if ( field === 'ranking'){
      items.sort((a, b) => (a.ranking < b.ranking) ? 1 : (a.ranking === b.ranking) ? ((a.size < b.size) ? 1 : -1) : -1 )
    }
    return items;
  }

}
