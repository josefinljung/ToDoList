// Här skriver vi våra UI tester
describe("UI tests for Todo app", () => {      // rubrik som beksriver samling av test av ens app/sida

    it("visit starting page for app", () => {

        cy.visit("http://localhost:8001/todo")

        cy.contains("My To Do List")

        // cy.url().should("include", "/createtodo")

        // För att testa att skriva en ny todo
        cy.get("#mytodoinput").type("Köp blompinnar").should("have.value", "Köp blompinnar")
        cy.get("#mypriorityinput").type("3").should("have.value", "3")
        cy.contains("ADD").click()



        //delete det man nyss la till
        cy.contains(".tododiv", "Köp blompinnar").as("deleteitem")
        cy.get("body > main > div:nth-child(5) > div.todo-buttons > span.delete-button > a").click()

    


        // cy.get("")
        


        //För att editera en todo som redan finns (FUNGERAR)
        // cy.get(".edit-button").first().as("editlink")
        // cy.get("@editlink").click()
        // cy.get("#thisinput").type(" 2").should("have.value", "Finish my list 2")
        // cy.contains("UPDATE").click()
    })

})



