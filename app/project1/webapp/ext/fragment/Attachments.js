sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (MessageToast, MessageBox) {
    'use strict';

    return {
        onInit: function () {
            console.log("Hello");
        },

        onAfterItemAdded: function (oEvent) {
            var oItem = oEvent.getParameter("item");

            var path = this.editFlow.getView().getBindingContext().getPath();
            var employeeId = path.match(/ID=([^,]+)/)[1];
            console.log(employeeId);

            var _createEntity = function (item) {
                var data = {
                    FILE_TYPE: item.getMediaType(),
                    FILE_NAME: item.getFileName(),
                    
                };

                var settings = {
                    url: `/odata/v4/employee-documents/EmployeeDocuments(ID=${employeeId},IsActiveEntity=false)/ATTACHMENTS`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(data)
                };

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results) => {
                            resolve(results.ID);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
            };

            _createEntity(oItem)
                .then((id) => {
                    var url = `/odata/v4/employee-documents/EmployeeDocuments(ID=${employeeId},IsActiveEntity=false)/ATTACHMENTS(ID=${id},IsActiveEntity=false)/FILE_CONTENT`;
                    oItem.setUploadUrl(url);

                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(oItem);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        onUploadCompleted: function (oEvent) {
            MessageToast.show("File uploaded successfully.");
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.getBinding("items").refresh();
           
        }
    };
});
