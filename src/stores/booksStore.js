import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => {
    const data = localStorage.getItem('books');
    return {
        books: data ? JSON.parse(data) : [],
    }
  },
  actions: {
    addBook(book) {
      let id = -1;
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].id > id) {
          id = this.books[i].id;
        }
      }
      this.books.unshift({id: id + 1, ...book});
      localStorage.setItem('books', JSON.stringify(this.books));
    },
    editBook(book) {
      const index = this.books.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        this.books[index] = book;
      }
      localStorage.setItem('books', JSON.stringify(this.books));
    },
    deleteBook(id) {
      this.books = this.books.filter((item) => {
        return item.id !== id;
      })
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  },
})