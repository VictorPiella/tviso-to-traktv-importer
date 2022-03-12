const hostUrl = "https://trakt.tv/dashboard";
const searchUrl = "https://trakt.tv/search?query="
const user= "***YOUR***USERNAME***";
const pass= "***YOUR***PASSWORD***";

const progres = require('../../progres2.json');

describe("Will update the progres after cypres crash", () => {

  it("update progres", () => {
    cy.writeFile('progres.json', progres);
  });
});