"use strict";

var SendAppNotificationRequest = {
	title: "Welcome",
	recipient: "/systemusers(<GUID of the user>)",
	body: "Welcome to the world of app notifications!",
	priority: 200000000,
	iconType: 100000000,
	toastType: 200000000,
	getMetadata: function () {
		return {
			boundParameter: null,
			parameterTypes: {
				title: { typeName: "Edm.String", structuralProperty: 1 },
				recipient: { typeName: "Edm.String", structuralProperty: 1 },
				body: { typeName: "Edm.String", structuralProperty: 1 },
				priority: { typeName: "Edm.Int32", structuralProperty: 1 },
				iconType: { typeName: "Edm.Int32", structuralProperty: 1 },
				toastType: { typeName: "Edm.Int32", structuralProperty: 1 }
			},
			operationName: "SendAppNotification",
			operationType: 0
		};
	}
};

function sendAppNotification(userGuid) {
	var request = Object.assign({}, SendAppNotificationRequest, {
		recipient: "/systemusers(" + userGuid + ")"
	});

	return Xrm.WebApi.online.execute(request)
		.then(function (response) {
			if (response.ok) {
				console.log("Status: %s %s", response.status, response.statusText);

				return response.json();
			}

			throw new Error("La solicitud no se completó correctamente.");
		})
		.then(function (responseBody) {
			console.log("Response Body: %s", responseBody.NotificationId);
			return responseBody;
		})
		.catch(function (error) {
			console.log(error.message);
			throw error;
		});
}