import { FavoritesService } from './../../core/services/favorites/favorites.service';
import { NotifierService } from 'angular-notifier';
import { Book } from './../../core/models/book.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { BooksService } from './../../core/services/books/books.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isbnForm: FormGroup;

  submitted = false;

  loading = false;

  errorMessages = [];

  books: Book[] = [];
  
  // [{
  //   title: 'Dummy book',
  //   isbn: 'TEST123',
  //   publishedDate: Date.now(),
  //   authors: ['John Lenon', 'Mark Richards'],
  //   source: 'Worlds library',
  //   is_fav: false
  // }];

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private favoritesService: FavoritesService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.isbnForm = this.formBuilder.group({
      isbn: ['', [Validators.required]]
    });
  }

  get form() { return this.isbnForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.isbnForm.invalid) {
      return;
    }

    this.loading = true;
    this.booksService.search(this.form.isbn.value)
      .subscribe((data: any) => {
        this.loading = false;
        this.books = data.books;
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.books = [];
        if (err.status === 422) {
          this.notifier.notify('info', err.error.message);
        } else {
          this.notifier.notify('error', 'There was an error. Please contact support');
        }
      });
  }

  addToFavorite($event, book) {
    $event.stopPropagation();
    book.is_fav = true;
    this.favoritesService.add(book.isbn)
      .subscribe((data) => {
        this.notifier.notify('success', 'Book added to favorites');
      }, () => {
        book.is_fav = false;
        this.notifier.notify('error', 'There was an error. Please try again');
      });
  }

  removeFromFavorite($event, book) {
    $event.stopPropagation();
    book.is_fav = false;
    this.favoritesService.delete(book.isbn)
      .subscribe((data) => {
        this.notifier.notify('success', 'Book removed from favorites');
      }, () => {
        book.is_fav = true;
        this.notifier.notify('error', 'There was an error. Please try again');
      });
  }

}
