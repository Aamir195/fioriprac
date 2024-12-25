sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
  "use strict";

  return Controller.extend("com.aamir.fiori.app.project1.controller.App", {
      onInit: function () {
          // Initialize the model if it doesn't exist
          if (!this.getView().getModel("userModel")) {
              const oModel = new sap.ui.model.json.JSONModel({
                  newEntry: {
                      name: "",
                      age: "",
                      email: ""
                  },
                  editEntry: {
                      name: "",
                      age: "",
                      email: "",
                      index: -1
                  },
                  users: []
              });
              this.getView().setModel(oModel, "userModel");
          }
      },

      onAddEntry: function () {
          // Get the model
          const oModel = this.getView().getModel("userModel");
          const oData = oModel.getData();

          // Validate the input fields
          if (!oData.newEntry.name || !oData.newEntry.age || !oData.newEntry.email) {
              MessageToast.show("Please fill in all fields before adding.");
              return;
          }

          // Create a copy of the new entry
          const newEntry = {
              name: oData.newEntry.name,
              age: oData.newEntry.age,
              email: oData.newEntry.email
          };

          // Add the new entry to the users array
          oData.users.push(newEntry);

          // Clear the form
          oData.newEntry = {
              name: "",
              age: "",
              email: ""
          };

          // Update the model
          oModel.setData(oData);
          MessageToast.show("Entry added successfully!");
      },

      onDeleteEntry: function (oEvent) {
          const oItem = oEvent.getSource().getBindingContext("userModel").getObject();
          const oModel = this.getView().getModel("userModel");
          const oData = oModel.getData();
          
          const iIndex = oData.users.findIndex(user => 
              user.name === oItem.name && 
              user.age === oItem.age && 
              user.email === oItem.email
          );
          
          if (iIndex > -1) {
              oData.users.splice(iIndex, 1);
              oModel.setData(oData);
              MessageToast.show("Entry deleted successfully!");
          }
      },

      onEditPress: function(oEvent) {
          const oModel = this.getView().getModel("userModel");
          const oData = oModel.getData();
          const oItem = oEvent.getSource().getBindingContext("userModel").getObject();
          const iIndex = oData.users.findIndex(user => 
              user.name === oItem.name && 
              user.age === oItem.age && 
              user.email === oItem.email
          );

          // Set the edit entry data
          oData.editEntry = {
              name: oItem.name,
              age: oItem.age,
              email: oItem.email,
              index: iIndex
          };

          oModel.setData(oData);

          // Open edit dialog
          if (!this._oEditDialog) {
              Fragment.load({
                  name: "com.aamir.fiori.app.project1.view.EditDialog",
                  controller: this
              }).then(function(oDialog) {
                  this._oEditDialog = oDialog;
                  this.getView().addDependent(this._oEditDialog);
                  this._oEditDialog.open();
              }.bind(this));
          } else {
              this._oEditDialog.open();
          }
      },

      onSaveEdit: function() {
          const oModel = this.getView().getModel("userModel");
          const oData = oModel.getData();
          const editEntry = oData.editEntry;

          // Validate the input fields
          if (!editEntry.name || !editEntry.age || !editEntry.email) {
              MessageToast.show("Please fill in all fields before saving.");
              return;
          }

          // Update the entry in the users array
          if (editEntry.index > -1) {
              oData.users[editEntry.index] = {
                  name: editEntry.name,
                  age: editEntry.age,
                  email: editEntry.email
              };

              // Update the model
              oModel.setData(oData);
              MessageToast.show("Entry updated successfully!");
              this._oEditDialog.close();
          }
      },

      onCancelEdit: function() {
          this._oEditDialog.close();
      }
  });
});