using {com.satinfotech.employee as db} from '../db/schema';

service EmployeeDocumentsService {
    entity EmployeeDocuments as projection on db.EmployeeDocuments;
    entity Attachments as projection on db.Attachments;
}

annotate EmployeeDocumentsService.EmployeeDocuments with @odata.draft.enabled;
//annotate EmployeeDocumentsService.Attachments with @odata.draft.enabled;

annotate EmployeeDocumentsService.EmployeeDocuments with @(
    UI.LineItem: [
        { Value: NAME, Label: 'Employee Name' },
        { Value: EMAIL, Label: 'Employee Email' }
    ],
    UI.FieldGroup#employee: {
        Data: [
            { Value: NAME, Label: 'Employee Name' },
            { Value: EMAIL, Label: 'Employee Email' },
        ]
    },
    UI.Facets             : [
        {
        $Type : 'UI.ReferenceFacet',
        ID    : 'emp_facet',
        Label : 'Employee',
        Target: '@UI.FieldGroup#employee'
    }, 
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'emp_doc_facet',
        Label : 'Documents',
        Target:'ATTACHMENTS/@UI.LineItem',
    },

    ]
    
    
);





annotate EmployeeDocumentsService.Attachments with @(
    UI.LineItem: [
        { Value: FILE_CONTENT, Label: 'File Content' },
        { Value: FILE_NAME, Label: 'File Name' },
        { Value: FILE_TYPE, Label: 'File Type' },
        {Value:emp_ID,Label:'Employee ID'}
    ],
    UI.FieldGroup#employeedocs: {
        Data: [
          { Value: emp_ID, Label: 'Emp ID' },
            { Value: FILE_CONTENT, Label: 'file Content' },
            { Value: FILE_NAME, Label: 'file Name' },
            { Value: FILE_TYPE, Label: 'file type' },
        ]
    },
        UI.Facets             : [
        {
        $Type : 'UI.ReferenceFacet',
        ID    : 'emp_doc_facet',
        Label : 'Documents',
        Target: '@UI.FieldGroup#employeedocs'
    },
  
    ]

);









