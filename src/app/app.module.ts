import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// import { TodoComponent } from './components/todo/todo.component';
import { TaskComponent } from './components/task/task.component';
import { CompleteComponent } from './components/complete/complete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    CompleteComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      NgMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
