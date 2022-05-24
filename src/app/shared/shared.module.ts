import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../Pipes/shorten.pipe';
import { FilterPipe } from '../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { DummyService } from '../services/dummy.service';



@NgModule({
  declarations: [
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ShortenPipe,
    FilterPipe,
    CommonModule,
    FormsModule,
  ],
  providers:[
    DummyService
  ]
})
export class SharedModule { }
