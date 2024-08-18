import {Component, Input, Output, EventEmitter } from '@angular/core';
import {Domain, Publisher} from "../publishers-container.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Data } from '@angular/router';

@Component({
  selector: 'app-edit-domain',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-domain.component.html',
  styleUrl: './edit-domain.component.css'
})
export class EditDomainComponent {
  @Input() domain!: Domain;
  //Button text changes depends on the action needed (Edit/Add)
  @Input() buttonText: string = "";
  @Output() domainSaved: EventEmitter<Domain> = new EventEmitter();
  isEdit: boolean = false;
  _domain!: Domain;


  constructor() {
  }

  ngOnInit(): void {
    this._domain = JSON.parse(JSON.stringify(this.domain));
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  editDomain() {
    const domainData = {
      domain: this._domain.domain,
      mobileAds: this._domain.mobileAds,
      desktopAds: this._domain.desktopAds
    };
    
    // Send the updated data to the parent
    this.domainSaved.emit(domainData); 
    this.toggleEdit()
  }

}
