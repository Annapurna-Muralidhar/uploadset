namespace com.satinfotech.employee;
using {managed, cuid} from '@sap/cds/common';
entity Attachments :cuid,managed{
        FILE_CONTENT: LargeBinary @Core.MediaType: FILE_TYPE @Core.ContentDisposition.Filename:FILE_NAME @Core.ContentDisposition.Type:'inline';
    FILE_NAME: String;
    FILE_TYPE: String @Core.IsMediaType: true; 
    emp : Association to one EmployeeDocuments;
}
entity EmployeeDocuments : cuid,managed {
    NAME: String;
    EMAIL: String;
   ATTACHMENTS: Composition of many  Attachments on ATTACHMENTS.emp= $self;

}
