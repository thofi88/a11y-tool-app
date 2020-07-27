import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    if (filter === 0) {
      return items;
    }
    else {
      return items.filter(item => item.category_id.indexOf(filter) !== -1);
    }
}

}
