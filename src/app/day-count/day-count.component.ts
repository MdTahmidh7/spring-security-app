import { Component } from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ItemService} from "../service/item.service";
import {Item} from "../model/ItemModel";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@Component({
  selector: 'app-day-count',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DatePipe,
    InfiniteScrollDirective
  ],
  templateUrl: './day-count.component.html',
  styleUrl: './day-count.component.css'
})
export class DayCountComponent {

  editForm: FormGroup;
  item : Item;
  items: Item[] = [];
  pageNo: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  loading: boolean = false;

  constructor( private fb: FormBuilder,
               private itemService: ItemService) {

    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', Validators.required],
      createdDate: ['', Validators.required],
      image: ['fake/path',],
    });
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    if (this.loading || (this.totalPages && this.pageNo >= this.totalPages)) {
      return;
    }

    this.loading = true;
    this.itemService.getAllItems(this.pageNo, this.pageSize).subscribe({
      next: (response) => {
        this.items = [...this.items, ...response.content]; // Append new items
        this.totalPages = response.totalPages;
        this.pageNo++; // Increment for next call
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
        this.loading = false;
      }
    });
  }

  onScroll() {
    this.getAllItems(); // Load more data when scrolled
    console.log(
      "Scroll event fired"
    )
  }


  saveItem() {
    if (this.editForm.valid) {

      this.item = this.editForm.value
      console.log('Item input:',this.item);

      this.itemService.createItem(this.item).subscribe(
        {
          next: (response) => {
            console.log('Item created successfully:', response);
            this.getAllItems();
          },
          error: (error) => {
            console.error('Error creating item:', error);
          }
        }
      );

      this.closeModal();
    }
  }

  closeModal() {
    const modal = document.getElementById('create-item-modal') as HTMLDialogElement;
    modal?.close();
  }

  openCreateModal() {
    const modal = document.getElementById('create-item-modal') as HTMLDialogElement;
    modal?.showModal();
  }
}
