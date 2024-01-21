import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/api/category.service';
import { status } from '../enums/enum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  sortedColumn: string = 'id';
  isAscending: boolean = true;
  listOfCategoryTable: any[] = [];
  currentPage: number = 1;
  pageSize: number = 7;
  totalPages: number = 1;
  categoryFormVisible = false;
  public categoryForm: FormGroup;
  public nameFormControl: FormControl;
  public descriptionFormControl: FormControl;
  public imageFormControl: FormControl;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.descriptionFormControl = new FormControl('', [Validators.required]);
    this.imageFormControl = new FormControl('', [Validators.required]);

    this.categoryForm = this.fb.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
      image: this.imageFormControl,
    });
  }

  ngOnInit() {
    this.loadData();
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.getCategoryTable();
  }

  loadData(): void {
    Promise.all([this.getCategoryTable()]);
  }

  getCategoryTable(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.categoryService.getCategories().subscribe((res: any) => {

        if (res && res.status === status.SUCCESS) {
          this.listOfCategoryTable = res.data;
          this.totalPages = Math.ceil(res.data.length / this.pageSize);
        }
        resolve();
      });
    });
  }

  toggleCategoryForm() {
    this.categoryFormVisible = !this.categoryFormVisible;
  }

  cancelCategoryForm() {
    this.categoryForm.reset();
    this.categoryFormVisible = false;
  }


  addCategory(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.categoryService.getCategories().subscribe((res: any) => {

        if (res && res.status === status.SUCCESS) {
          this.listOfCategoryTable = res.data;
          this.categoryForm.reset();
          this.categoryFormVisible = false;
        }
        resolve();
      });
    });
  }

}
