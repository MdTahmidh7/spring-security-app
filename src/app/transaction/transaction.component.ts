import { Component } from '@angular/core';

import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchableInputComponent} from "../searchable-input/searchable-input.component";
import {TransactionType} from "../enum/TransactionType";
import {TransactionMedium} from "../enum/TransactionMedium";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchableInputComponent, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  transactionForm: FormGroup = this.fb.group({
    depositAmount: [null],
    withdrawAmount: [null],
    transactionType: [null, Validators.required],
    transactionDate: [null, Validators.required],
    receiverId: [null, Validators.required],
    senderId: [null, Validators.required],
    transactionMedium: [null, Validators.required],
    transactionDescription: ['', [Validators.maxLength(255)]],
    depositMonth: [null]
  });

  showModal = false;
  showConfirm = false;

  transactionTypes: string[] = Object.values(TransactionType);
  transactionMedium : string[] = Object.values(TransactionMedium);
  selectedReceiverId : any;
  transactions: any;
  private apiUrl = 'http://localhost:8080';

  ngOnInit() {
    this.setDefaultDateRange();
    this.loadTransactions();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showConfirm = false;
    this.transactionForm.reset();
  }

  confirmSubmit() {
    this.submitTransaction();
    this.loadTransactions();
  }

  submitTransaction() {
    const formData = this.transactionForm.value;
    this.http.post(this.apiUrl+'/transaction', formData).subscribe({
      next: (res) => {
        console.log('Transaction created:', res);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error creating transaction:', err);
      }
    });
  }

  memberSearch : MemberSearch;
  selectedSenderId: any;
  memberSearchResultFormatter: (result: any) => string = (result) => `${result.name}`;
  startDate?: string;  // Changed from `Date` to `string` (matches HTML input)
  endDate?: string;

  onSelectSenderId($event: any) {
    console.log('Selected Sender:', $event.item);
    this.selectedSenderId = $event.id;
    this.memberSearch = $event;
    //patch value and update senderId
    this.transactionForm.patchValue(
      {senderId: this.selectedSenderId}
    );
  }

  onSelectReceiverId($event: any) {
    console.log('Selected Referrer:', $event.item);
    this.selectedReceiverId = $event.id;
    this.memberSearch = $event;
    //patch value and update senderId
    this.transactionForm.patchValue(
      {receiverId: this.selectedReceiverId}
    );
  }

  filterTransactions() {
    this.loadTransactions(this.startDate, this.endDate);
  }

  private loadTransactions(filterFromDate?: string, filterToDate?: string) {

    const pageNo = 0;
    const pageSize = 10;

    // Use provided dates or fall back to component's current dates
    const fromDate = filterFromDate || this.startDate;
    const toDate = filterToDate || this.endDate;

    const params = {
      pageNo,
      pageSize,
      filterFromDate: fromDate,
      filterToDate: toDate
    };

    this.http.get<any>(`${this.apiUrl}/transactions`, { params }).subscribe({
      next: (res) => this.transactions = res.content,
      error: (err) => console.error('Error:', err)
    });
  }

  private setDefaultDateRange() {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    // Format as 'YYYY-MM-DD' (HTML date input format)
    this.startDate = this.formatDateForInput(oneMonthAgo);
    this.endDate = this.formatDateForInput(today);
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}


export class MemberSearch {
  id?: any;
  name: string;

  toString(): string {
    return this.name;
  }
}
