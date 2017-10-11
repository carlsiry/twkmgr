
/**
 * 2017.10.09 修复确认删除对话框的确定、取消功能
 */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <form>
  <h2 matDialogTitle>确认删除吗？</h2>
  <div mat-dialog-content>
    删除后不可恢复噢
  </div>
  <div mat-dialog-actions>
    <button type="button" mat-raised-button color="primary" (click)="onConfirm()">确认</button>
    <button type="button" mat-raised-button matDialogClose (click)="onCancel()">取消</button>
  </div>
</form>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }

}
