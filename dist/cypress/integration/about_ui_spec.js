"use strict";

describe("About page", function () {
        it("Should load about page", function () {
                cy.visit("http://localhost:8001/todo");

                cy.contains("About").click();

                cy.url().should("include", "/about");

                cy.contains("This to do app was created by Josefin");
        });
});