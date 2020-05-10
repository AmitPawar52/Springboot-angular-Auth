import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {

  @Input() modalObject;
  @Input() display: string;
  @Output() displayChange = new EventEmitter();
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    this.displayChange.emit(this.display);
    this.router.navigate(['/login'])
  }

}
