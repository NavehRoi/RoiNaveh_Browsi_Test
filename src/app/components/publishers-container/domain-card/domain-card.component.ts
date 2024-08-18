import {Component, Input} from '@angular/core';
import {Domain} from "../publishers-container.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { EditDomainComponent } from '../edit-domain/edit-domain.component'
import { DomainValidationsService } from '../../../../app/domain-validations.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-domain-card',
  standalone: true,
  imports: [CommonModule, FormsModule, EditDomainComponent, HttpClientModule],
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  @Input() domain!: Domain;
  @Input() selectedPublisherIndex: string = '';
  _domain!: Domain;

  constructor(private domainValidationsService: DomainValidationsService) {
  }

  ngOnInit(): void {
    this._domain = JSON.parse(JSON.stringify(this.domain));
  }

  onDomainSaved(domainData: Domain) {
    console.log(domainData.domain)
    let res =this.domainValidationsService.updateDomain( domainData, this._domain.domain).subscribe();
    //update the view
    window.location.reload();
  }

  onDelete() {
    console.log(this.domain.domain)
    let res =this.domainValidationsService.deleteDomain(this._domain.domain).subscribe();
    window.location.reload();
  }
}
