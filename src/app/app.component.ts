import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone-book';

  searchValue;

  todaysDate = new Date();

  contacts = [];

  isRegisterOrEdit = false;

  public contact = {
    name: '',
    email: [],
    contactNumber: [],
    dateOfBirth: null,
  }
  public contactEmail = [];

  public numberOfPages = [];

  baseUrl = 'https://phone-book-app-node.herokuapp.com';
  startIndex: number;
  showContactDetailsIndex: any;
  constructor(private httpSerice: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public paginationItems = 3;

  ngOnInit() {

    this.httpSerice.get(this.baseUrl + '/contact', { headers: this.httpOptions.headers }).subscribe((result: any) => {
      this.contacts = result.data;
      const page = Math.ceil(this.contacts.length / this.paginationItems);
      for (let i = 0; i < page; i++) {
        this.numberOfPages.push(i + 1);
      }
      this.startIndex = 0;
    });

  }

  searchContacts(event) {
    this.searchValue = event;
  }

  showContactDetails(contact, id) {
    contact.showContactDetails = !contact.showContactDetails;
    if (this.showContactDetailsIndex) {
      this.contacts[this.showContactDetailsIndex - 1].showContactDetails = false;
    }
    if(id + this.startIndex + 1 !== this.showContactDetails) {
      this.showContactDetailsIndex = id + this.startIndex + 1;
    }

  }

  showEditDialog(contact) {
    this.isRegisterOrEdit = true;
    this.contact = {
      name: contact.name,
      email: contact.email,
      contactNumber: contact.contactNumber,
      dateOfBirth: contact.dateOfBirth,
    }

  }

  deleteContact(contact) {
    this.httpSerice.get(this.baseUrl + '/contact/' + contact._id, { headers: this.httpOptions.headers }).subscribe((result: any) => {
      const dataIndex = this.contacts.findIndex(x => x._id === contact._id);
      if (dataIndex != -1) {
        this.contacts.splice(dataIndex, 1);
      }
    });
  }

  registerUser() {
    this.isRegisterOrEdit = true;
    this.contact = {
      name: '',
      email: [''],
      contactNumber: [+91],
      dateOfBirth: null,
    };
  }
  createEmptyEmail() {
    const emailLength = this.contact.email.length - 1;
    if (this.contact.email[emailLength].length > 0) {
      this.contact.email.unshift('');
    }
  }
  createEmptyContact() {
    const length = this.contact.contactNumber.length - 1;
    if (this.contact.contactNumber[length]) {
      this.contact.contactNumber.unshift(+91);
    }
  }

  changeStartIndex(index) {
    this.startIndex = index * this.paginationItems;
  }
}
