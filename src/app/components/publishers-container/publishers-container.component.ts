import {Component, OnInit} from '@angular/core';
import {PublisherCardComponent} from "./publisher-card/publisher-card.component";
import {CommonModule} from "@angular/common";
import { EditDomainComponent } from './edit-domain/edit-domain.component';
import { FormsModule } from '@angular/forms';
import { DomainValidationsService } from '../../../app/domain-validations.service';
import { HttpClientModule } from '@angular/common/http';


export type Publisher = {
  publisher: string;
  domains: Array<Domain>
};

export type Domain = {
  domain: string,
  desktopAds: number,
  mobileAds: number
};

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [
    PublisherCardComponent,
    CommonModule,
    EditDomainComponent,
    FormsModule,
    HttpClientModule,
    
  ],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css'
})
export class PublishersContainerComponent implements OnInit {
    
  domain: Domain = {
    domain: "",
    desktopAds: 0,
    mobileAds: 0
  };
  selectedPublisherIndex: number = 0;
  data: Publisher[] = [];

  constructor(private domainValidationsService: DomainValidationsService) {}

  
  ngOnInit(): void {
      this.loadPublishers();
  }


  loadPublishers(): void {
    this.domainValidationsService.getPublishers().subscribe((publishers: Publisher[]) => {
    this.data = publishers;
    });
  }


  onDomainSaved(domainData: Domain) {
      const selectedPublisherIndex = this.selectedPublisherIndex;
      
      if (selectedPublisherIndex >= 0 && selectedPublisherIndex < this.data.length) {
          const success = this.domainValidationsService.createDomain(
              selectedPublisherIndex,
              domainData
          ).subscribe();
          if (success) {
            window.location.reload();
              //this.loadPublishers();
              console.log("Domain saved successfully");
          } else {
              console.log("Failed to save domain");
          }
      }
  }


  addPublisher() {
      let name = "Publisher " +(this.data.length + 1) 
      let res = this.domainValidationsService.addPublisher(name).subscribe() ;
      this.loadPublishers();
      console.log("Publisher added successfully");
  }
}
