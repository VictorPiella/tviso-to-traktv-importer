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

  const watched = tests.filter(function(item){
    return item.status == "watched";         
  });
  const watchedNoFounds = []

  watched.forEach(test => {
    it("mark watched"+ test.title , () => {

      cy.visit(searchUrl+test.title);


      cy.get("body").then($body => {
        if($body.find("#accept-choices").length > 0){
          cy.get("#accept-choices").click();
        }
        if ($body.find(".no-results").length > 0) {   
          watchedNoFounds.push(test.title);
          console.log(watchedNoFounds);
        } else {
          cy.get('.grid-item').find('.poster').first().click();
          cy.wait(5000);
          cy.get("body").then($film => {
            if($film.find(".btn-watch.selected").length > 0){
              cy.get(".rated-text").then($rated => {
                if ($rated.is(':visible')){
                  return;
                } else {
                  if (test.rating === null) {
                    return
                  } else {
                    cy.get(".summary-user-rating").click();
                    const rate = "label.needsclick.rating-"+ test.rating;
                    cy.get(rate).click({force: true});
                  }
                }
              })
            }else {   
              cy.get(".btn-watch").find(".trakt-icon-time-plus").first().click();
              cy.get(".other-date").click();
              cy.get(".watch-date").clear().type(test.checkedDate);
              cy.get(".icon.yes").click();

              cy.get(".rated-text").then($rated => {
                if ($rated.is(':visible')){
                  return;
                } else {
                  if (test.rating === null) {
                    return
                  } else {
                    cy.get(".summary-user-rating").click();
                    const rate = "label.needsclick.rating-"+ test.rating;
                    cy.get(rate).click({force: true});
                  }
                }
              })
            }
          });
        }
      });
    });
  });


  it("write a file with missing ones", () => {
    cy.writeFile('watchedNoFounds.json', watchedNoFounds, { flag: 'a+' });
  });

});