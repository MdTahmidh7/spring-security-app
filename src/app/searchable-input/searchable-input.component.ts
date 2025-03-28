import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, debounceTime, distinctUntilChanged, map, mergeMap, OperatorFunction, of} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Environment} from "../environments/environment";
import * as http from "http";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-searchable-input',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbTypeaheadModule],
  templateUrl: './searchable-input.component.html',
  styleUrl: './searchable-input.component.css'
})
export class SearchableInputComponent {

  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef
  ) {}

  @Input() model: any;
  @Input() urlToSearch!: string;
  @Input() title: string = "Search Here";
  @Input() thresholdLength: number = 0;
  @Input() showLabel: boolean = true;
  @Input() showSmForm: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onSelect = new EventEmitter<any>();



  ngOnInit() {
    this.cdr.detectChanges();
  }

  // Custom formatter for dropdown results
  @Input() formatter: (result: any) => string = (result) => `${result.name.toUpperCase()}`;

  // Typeahead Search Logic
  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap((term: string) =>
        term.length < this.thresholdLength ? [] : this.getFromUrl(term).pipe(map((results: any[]) => results))
      )
    );

  // Emit selected value
  changeModel(model: any): void {
    if (this.onSelect) {
      this.onSelect.emit(model);
    }
  }

  // API Call
  private getFromUrl(text: string): Observable<any> {
    let params = new HttpParams().set('searchParam', text);
    console.log("search Param", text);
    return this.http.get<any>(`http://localhost:8080/${this.urlToSearch}`, { params }).pipe(
      map((response) => response.content || []),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }


  // Open dropdown on click
  openTypeahead(input: any) {
    input._nativeElement.value = '';
    input._nativeElement.dispatchEvent(new Event('input'));
    input._nativeElement.focus();
  }
}
