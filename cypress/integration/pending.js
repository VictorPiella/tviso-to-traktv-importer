const hostUrl = "https://trakt.tv/dashboard";
const searchUrl = "https://trakt.tv/search?query="
const user= "***YOUR***USERNAME***";
const pass= "***YOUR***PASSWORD***";

const tests = require('../../tviso.json')

describe("The application loads", () => {

  it("log in", () => {
    cy.visit(hostUrl);
    cy.get("body").then($body => {
      if($body.find("#accept-choices").length > 0){
        cy.get("#accept-choices").click();
      }
      if ($body.find(".btn-signup").length > 0) {   
        cy.get(".btn-signup").click();

        cy.get("#user_login")
        .type(user);
        cy.get("#user_password")
        .type(pass);
        
        cy.get('.form-signin').submit();
        cy.wait(5000)
      }
    });

  });


  const pending = tests.filter(function(item){
    return item.status == "pending";         
  });
  const pendingNoFounds = []
  pending.forEach(test => {
    it("mark pending"+ test.title , () => {

      cy.visit(searchUrl+test.title);


      cy.get("body").then($body => {
        if($body.find("#accept-choices").length > 0){
          cy.get("#accept-choices").click();
        }
        if ($body.find(".no-results").length > 0) {   
          pendingNoFounds.push(test.title);
          console.log(pendingNoFounds);
        } else {
          cy.get(".grid-item").then($body => {
            if ($body.find(".actions > .list.selected").first().length > 0) {   
            }else{
              cy.get('.grid-item').find('.actions > .list').first().click();
            }
          });

        }
      });
    });
  });



  it("write a file with missing ones", () => {
    cy.writeFile('pendingNoFounds.json', pendingNoFounds, { flag: 'a+' });
  });

});