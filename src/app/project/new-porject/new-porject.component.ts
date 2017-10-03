import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-porject',
  templateUrl: './new-porject.component.html',
  styleUrls: ['./new-porject.component.scss']
})
export class NewPorjectComponent implements OnInit {

  title: string;
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewPorjectComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
  }
  onClick() {
    this.dialogRef.close('I Recived your msg!');
  }

}
