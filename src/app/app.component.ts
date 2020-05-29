import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
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
    _id: null,
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
  contactsList: any[];
  constructor(private httpSerice: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public paginationItems = 4;

  ngOnInit() {

    this.httpSerice.get(this.baseUrl + '/contact', { headers: this.httpOptions.headers }).subscribe((result: any) => {
      this.contacts = result.data;
      this.contactsList = result.data;
      const page = Math.ceil(this.contacts.length / this.paginationItems);
      for (let i = 0; i < page; i++) {
        this.numberOfPages.push(i + 1);
      }
      this.showContactDetailsIndex = null;
      this.startIndex = 0;
    });

  }

  searchContacts(event) {
    this.searchValue = event;
    if (event.length === 0) {
      this.contacts = this.contactsList;
      const page = Math.ceil(this.contacts.length / this.paginationItems);
      for (let i = 0; i < page; i++) {
        this.numberOfPages.push(i + 1);
      }
      this.startIndex = 0;

    } else {
      this.contacts = this.contactsList.filter(contact => {
        const name = contact.name.includes(this.searchValue);
        if (name) {
          return true;
        }
        const email = contact.email.find(email => email.includes(this.searchValue));
        if (email) {
          return true;
        }
        const phoneNumber = contact.contactNumber.find(number => (number + '').includes(this.searchValue));
        if (phoneNumber) {
          return true;
        }
      });
    }

    this.showContactDetailsIndex = null;
  }

  showContactDetails(contact, id) {
    contact.showContactDetails = !contact.showContactDetails;
    if (this.showContactDetailsIndex) {
      this.contacts[this.showContactDetailsIndex - 1].showContactDetails = false;
    }
    if (contact.showContactDetails) {
      this.showContactDetailsIndex = id + this.startIndex + 1;
    } else {
      this.showContactDetailsIndex = 0;
    }

  }

  showEditDialog(contact) {
    this.isRegisterOrEdit = true;
    this.contact = {
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      contactNumber: contact.contactNumber,
      dateOfBirth: contact.dateOfBirth,
    }

  }

  deleteContact(contact) {
    this.httpSerice.delete(this.baseUrl + '/contact/' + contact._id, { headers: this.httpOptions.headers }).subscribe((result: any) => {
      const dataIndex = this.contacts.findIndex(x => x._id === contact._id);
      if (dataIndex != -1) {
        this.contacts.splice(dataIndex, 1);
      }
    });
  }

  registerUser() {
    this.isRegisterOrEdit = true;
    this.contact = {
      _id: null,
      name: '',
      email: [''],
      contactNumber: [+91],
      dateOfBirth: null,
    };
  }


  convertToDateFormat(date) {
    const dateInISOFormat = moment(date).format('DD-MM-YYYY');
    return dateInISOFormat;
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

  submit() {
    if (!this.contact._id) {
      this.httpSerice.post(this.baseUrl + '/contact', this.contact, { headers: this.httpOptions.headers }).subscribe((result: any) => {
        this.contacts.push(result.data);
        this.isRegisterOrEdit = false;
      });
    } else {
      this.httpSerice.put(this.baseUrl + '/contact', this.contact, { headers: this.httpOptions.headers }).subscribe((result: any) => {
        const dataIndex = this.contacts.findIndex(x => x._id === this.contact._id);
        this.contact[dataIndex] = result.data;
        this.isRegisterOrEdit = false;
      });
    }
  }

  removeEmail(contact, id) {
    contact.email.splice(id, 1);
  }

  removeContact(contact, id) {
    contact.contactNumber.splice(id, 1);
  }
}
