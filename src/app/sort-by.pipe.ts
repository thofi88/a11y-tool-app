import { Pipe, PipeTransform } from '@angular/core';

// SECTION sortPipe to sort the website array

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(items: any[], field: any): any[] {

    if (!items && !field) {
      return [];
    }
    if (field === 'name'){
      items.sort((a, b) => a.name.localeCompare(b.name));
    }
    if ( field === 'ranking-'){
      items.sort((a, b) => (a.ranking < b.ranking) ? 1 : (a.ranking === b.ranking) ? ((a.size < b.size) ? 1 : -1) : -1);
    }
    if ( field === 'ranking+'){
      items.sort((a, b) => (a.ranking > b.ranking) ? 1 : (a.ranking === b.ranking) ? ((a.size > b.size) ? 1 : -1) : -1);
    }
    return items;
  }
}

// !SECTION
