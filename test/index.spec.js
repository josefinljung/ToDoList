const mocha = require("mocha")
const expect = require("chai").expect
const app = require("../index")



describe("Test of index.js", () => {
    it("Should test my index page", () => {
        expect(app).to.exist
      
    })

    afterEach((done) => {
        server.close()
    })
});