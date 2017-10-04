import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <form>
  <h2 md-dialog-title>确认删除吗？</h2>
  <div md-dialog-content>
    删除后不可恢复噢
  </div>
  <div md-dialog-actions>
    <button type="button" md-raised-button color="primary" (click)="onConfirm()">确认</button>
    <button type="button" md-raised-button md-dialog-close (click)="onCancel()">取消</button>
  </div>
</form>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MdDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }
  onConfirm() {
    this.dialogRef.close('yes!');
  }
  onCancel() {
    this.dialogRef.close('cancel!');
  }

}
