import {Component, ElementRef, ViewChild} from '@angular/core';
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

  totalElements: number = 0;

  constructor( private fb: FormBuilder,
               private itemService: ItemService) {

    this.editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      price: ['', Validators.required],
      createdDateTime: ['', Validators.required],
      endDateTime: ['',],
      image: ['fake/path',],
      description: ['',],
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
        this.totalElements = response.totalElements;
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

      if (this.item.id) {
        this.itemService.updateItem(this.item.id, this.item).subscribe(
          {
            next: (response) => {
              console.log('Item updated successfully:', response);
              this.items = [];
              this.pageNo = 0;
              this.getAllItems();
            },
            error: (error) => {
              console.error('Error updating item:', error);
            }
          }
        );
      }
      else {
        this.itemService.createItem(this.item).subscribe(
          {
            next: (response) => {
              console.log('Item created successfully:', response);
              this.items = [];
              this.pageNo = 0;
              this.getAllItems();
            },
            error: (error) => {
              console.error('Error creating item:', error);
            }
          }
        );
      }

      this.closeModal();
    }
  }

  closeModal() {
    const modal = document.getElementById('create-item-modal') as HTMLDialogElement;
    modal?.close();
    this.selectedItem = null;
    const detailsModal = document.getElementById('details-modal') as HTMLDialogElement;
    detailsModal?.close();
  }

  openCreateModal() {
    this.editForm.reset();
    const modal = document.getElementById('create-item-modal') as HTMLDialogElement;
    modal?.showModal();
  }

  selectedItem: Item = null;

  @ViewChild('detailsModal') detailsModal!: ElementRef<HTMLDialogElement>;

  openDetailsModal(item: any) {
    this.selectedItem = item;
    this.detailsModal.nativeElement.showModal();
  }

  closeDetailsModal() {
    this.detailsModal.nativeElement.close();
  }

  getTotalDaysUptoNow(item: Item): number {
    let createdDateTime: Date = item.createdDateTime;
    let endDateTime: Date = item.endDateTime;
    if (endDateTime==null) {
      const createdDateObj = new Date(createdDateTime);
      if (isNaN(createdDateObj.getTime())) {
        return 0; // Invalid date
      }
      const today = new Date();
      // Calculate the difference in milliseconds
      const diffTime = Math.abs(today.getTime() - createdDateObj.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }else {
      const createdDateObj = new Date(createdDateTime);
      if (isNaN(createdDateObj.getTime())) {
        return 0; // Invalid date
      }
      const endDateObj = new Date(endDateTime);
      if (isNaN(endDateObj.getTime())) {
        return 0; // Invalid date
      }
      // Calculate the difference in milliseconds
      const diffTime = Math.abs(endDateObj.getTime() - createdDateObj.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  openUpdateModal(item: Item) {
    // Patch form values
    const now = new Date();
    const localISO = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + 'T' +
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0');

    this.editForm.patchValue({
      ...item,
      endDateTime: localISO // "YYYY-MM-DDTHH:mm"
    });
    const modal = document.getElementById('create-item-modal') as HTMLDialogElement;
    modal?.showModal();
  }
}
