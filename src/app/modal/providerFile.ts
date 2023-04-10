export class providerFile {
  public date: Date;
  public fileName: string;
  public isprocessed: boolean;
  public downloadLink: string;

  static from(data: any): providerFile {
    let oproviderFile: providerFile = new providerFile();
    oproviderFile.date = data.date;
    oproviderFile.downloadLink = data.downloadLink;
    oproviderFile.fileName = data.fileName;
    oproviderFile.isprocessed = data.isprocessed;
    return oproviderFile;
  }
}
