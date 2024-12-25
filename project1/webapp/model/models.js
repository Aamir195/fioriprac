sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        /**
         * Creates a JSONModel for user data (CRUD operations).
         * @returns {sap.ui.model.json.JSONModel} The user model.
         */

        createUserModel: function () {
            var oData = {
                newEntry: {
                    name: "",
                    age: null,
                    email: ""
                },
                users: [] // Array to store user data
            };

            var oModel = new JSONModel(oData);
            oModel.setDefaultBindingMode("TwoWay"); // Allow data to flow in both directions
            return oModel;
        }

    };

});