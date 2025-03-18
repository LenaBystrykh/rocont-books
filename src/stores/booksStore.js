import { ref, computed } from 'vue'
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
      this.books.unshift({id: this.books.length + 1, ...book});
      localStorage.setItem('books', JSON.stringify(this.books));
    },
  },
})
