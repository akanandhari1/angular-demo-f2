import { Injectable } from '@angular/core';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ConfirmationDialogService {
  constructor(private modalService: MatDialog) {}

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    hasComment: boolean = false,
    isCancel: boolean = true
  ): Observable<any> {
    let data: any = {};
    data.title = title;
    data.message = message;
    data.btnOkText = btnOkText;
    data.btnCancelText = btnCancelText;
    data.isCancel = isCancel;
    data.hasComment = hasComment;
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      data: data,
    });

    return modalRef.afterClosed();
  }
}
