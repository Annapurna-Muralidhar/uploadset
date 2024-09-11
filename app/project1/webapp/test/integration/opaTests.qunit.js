sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/EmployeeDocumentsList',
		'project1/test/integration/pages/EmployeeDocumentsObjectPage',
		'project1/test/integration/pages/AttachmentsObjectPage'
    ],
    function(JourneyRunner, opaJourney, EmployeeDocumentsList, EmployeeDocumentsObjectPage, AttachmentsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEmployeeDocumentsList: EmployeeDocumentsList,
					onTheEmployeeDocumentsObjectPage: EmployeeDocumentsObjectPage,
					onTheAttachmentsObjectPage: AttachmentsObjectPage
                }
            },
            opaJourney.run
        );
    }
);