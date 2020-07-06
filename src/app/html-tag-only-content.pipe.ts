import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlTagOnlyContent'
})
export class HtmlTagOnlyContentPipe implements PipeTransform {

  transform(items: string): any {
    if (!items) {
        return items;
    }
    else {
      const regex = /<("[^"]*"|'[^']*'|[^'">])*>/g;
      const newItem = items.replace(regex, '');
      return newItem;
    }
}

}
