import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation.model';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
  this.apiService.loadProfile();
 console.log(this.apiService.accessToken)

}

}
