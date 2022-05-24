import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-pipes',
  templateUrl: './filter-pipes.component.html',
  styleUrls: ['./filter-pipes.component.css']
})
export class FilterPipesComponent implements OnInit {
  filteredString: string = '';
  appStatus = new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve('Users Data received');
    }, 4000);
  })
  users = [{
    name: 'test',
    joinedDate: new Date(15, 2, 2022)
  }, {
    name: 'test1',
    joinedDate: new Date(21, 8, 2022)
  }, {
    name: 'test2',
    joinedDate: new Date(18, 4, 2022)
  }]
  constructor() { }

  ngOnInit(): void {
  }

  onAddUser() {
    this.users.push({
      name: 'sample',
      joinedDate: new Date(12, 2, 2009)
    });
  }

}
