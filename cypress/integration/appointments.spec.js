describe("Appointments", () => {

  beforeEach(()=> {
    // reset DB
    cy.request('GET', '/api/debug/reset');
    // 1. Visits the root of our web server
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // 2. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();
    // 3.Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    // Clicks the save button(No testid or alt attribute on the save button
    // Use the text content, contains command is a good choice
    cy.contains("Save")
      .click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
    
  });

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    // you need to force it because it's hiding 
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true});
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Edited Name");
    
    cy.get("[alt='Tori Malcolm']")
    .click();
    // Clicks the save button
    cy.contains("Save")
      .click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Edited Name");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true});
    // Clicks the confirm button
    cy.contains("Confirm")
      .click();
    // Sees that the appointment slot is empty
    //Check if there is "Deleting" indicator exists
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
