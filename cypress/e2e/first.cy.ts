describe('First spec', () => {
  it('Customer Route', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/customer',
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response);
      // expect(response.body.results).length.to.be.greaterThan(1);
      // expect(response.body.name).to.eq('Jane');
    });
  });
});
