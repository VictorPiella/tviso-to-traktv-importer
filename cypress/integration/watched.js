const hostUrl = "https://trakt.tv/dashboard";
const searchUrl = "https://trakt.tv/search?query="
const user= "***YOUR***USERNAME***";
const pass= "***YOUR***PASSWORD***";

const tests = require('../../tviso.json');
import lastrun from'../../progres.json';

function traktLogin() {
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
          cy.wait(2000)
        }
      });

}

function rate(rating) {
  cy.get(".rated-text").then($rated => {
    if ($rated.is(':visible')){
      cy.log('already rated')
    } else {
      if (rating === null) {
        cy.log('I don´t have rate for this bro')
      } else {
        cy.get(".summary-user-rating").click();
        const rate = "label.rating-"+ rating;
        cy.get(rate).click();
        cy.wait(2000);
        cy.get(".toast-success").contains("rated")

      }
    }
  })
}



describe("The application loads", () => {

  it("log in", () => {
    cy.visit(hostUrl);
    traktLogin();
  });

  const watched = tests.filter(function(item){
    return item.status == "watched";         
  });
  const watchedNoFounds = [];
  let progres = [];
  progres = lastrun;

  watched.forEach(test => {
    it("mark watched "+ test.title , () => {
      if(progres.indexOf(test.title) >= 0 ) {
        cy.log('loged')
      }else{
        cy.visit(searchUrl+test.title);
        cy.wait(2000)
        
        traktLogin();
        cy.get("body").then($body => {
          if($body.find("#accept-choices").length > 0){
            cy.get("#accept-choices").click();
          }
          if ($body.find(".no-results").length > 0) {   
            watchedNoFounds.push(test.title);
            console.log(watchedNoFounds);
            cy.writeFile('watchedNoFounds.json', watchedNoFounds, { flag: 'a+' });
          } else {
            cy.get('.grid-item').find('.poster').first().click();
            cy.wait(5000);
            cy.get("body").then($film => {
              if($film.find(".btn-watch.selected").length > 0){
                rate(test.rating);
              }else {   
                cy.get(".btn-watch").find(".trakt-icon-time-plus").first().click();
                cy.get(".other-date").click();
                cy.get(".watch-date").clear().type(test.checkedDate);
                cy.get(".icon.yes").click();
                rate(test.rating);
              }
            });
            progres.push(test.title);
            cy.wait(2000)
            cy.writeFile('progres2.json', progres);
            cy.log('progress')
          }
        });
      }
    });
  });
});