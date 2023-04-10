import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { providerFile } from 'src/app/modal/providerFile';
import { IProviderService } from '../i-provider.service';

@Component({
  selector: 'app-i-provider-list',
  templateUrl: './i-provider-list.component.html',
  styleUrls: ['./i-provider-list.component.scss'],
})
export class IProviderListComponent implements OnInit, OnChanges {
  @Input()
  public provider: any;

  public fileList: any[] = [];
  dataSource: MatTableDataSource<providerFile>;
  displayedColumns: string[] = [
    'date',
    'fileName',
    'downloadLink',
    'isprocessed',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public oService: IProviderService) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.provider) {
      if (this.provider) {
        this.oService
          .getProviderFiles(this.provider)
          .subscribe((result: providerFile[]) => {
            this.fileList = result;
            this.dataSource = new MatTableDataSource(result);
            if (this.dataSource) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
      }
    }
  }
  ngOnInit() {
    console.log(this.provider);
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  downloadFile(downloadLink: string) {}
}
