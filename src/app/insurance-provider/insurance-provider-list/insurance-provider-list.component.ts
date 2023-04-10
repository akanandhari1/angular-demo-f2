import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AnyForUntypedForms, FormControl } from '@angular/forms';
import { FileValidators } from 'ngx-file-drag-drop';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-insurance-provider-list',
  templateUrl: './insurance-provider-list.component.html',
  styleUrls: ['./insurance-provider-list.component.scss'],
})
export class InsuranceProviderListComponent implements OnInit {
  public files: any[] = [];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    console.log('length', $event.target?.files.length);
    console.log('filelength', this.files.length);

    if ($event.target?.files?.length > 1) {
      this._snackBar.open('Only one file can be uploaded', 'Close', {
        duration: 2000,
        verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
        horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
      return;
    }
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    if (event.target.files.length > 1) {
      this._snackBar.open('Only one file can be uploaded', 'Close', {
        duration: 2000,
        verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
        horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
      return;
    } else {
      this.prepareFilesList(event.target.files);
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    if (files.length === 1) {
      for (const item of files) {
        console.log('item', item);
        if (
          item?.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          item.progress = 0;
          this.files.push(item);
        } else {
          console.log('inclad');
          this._snackBar.open(
            'File extension .xlsx is only supported',
            'Close',
            {
              duration: 6000,
              panelClass: 'failure-snackbar',
              verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
              horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
            }
          );
        }
      }
      this.uploadFilesSimulator(0);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  ngOnInit(): void {}
  openDialog(index: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '  330px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFile(index);
      }
    });
  }

  submit() {
    this._snackBar.open('File submitted successfully', 'Close', {
      panelClass: 'success-snackbar',
      duration: 6000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
