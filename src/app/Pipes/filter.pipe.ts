import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  matchValue(data, value) {
    return Object.keys(data).map((key) => {
      return new RegExp(value, 'gi').test(data[key]);
    }).some(result => result);
  }

  transform(value: any, filterString) {

    /*rechercher avec plusieurs parametes*/
    if (!filterString) {
      return value;
    }
    return value.filter((data) => this.matchValue(data, filterString));

    /*rechercher uniquement par name*/
    return value ? value.filter(item => item.name.search(new RegExp(filterString, 'i')) > -1) : [];


    // à la place du code suivant
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const users = [];
    for (const user of value) {
      if (user['name'] === filterString) {
        users.push(user);
      }
    }
    return users;
  }


}
