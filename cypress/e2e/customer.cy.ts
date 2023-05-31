import res from './mocks.json';

describe('Customer spec', () => {
  let customer = { id: 0, ...res.customers.DIEGO };
  let customer2 = { id: 0, ...res.customerWithAddress['CUSTOMER-01'] };

  it('shoud Create Customer', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customer`,
      failOnStatusCode: false,
      body: customer,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      customer.id = response.body.id;
    });
  });

  it('shoud Create Customer with Address', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customer`,
      failOnStatusCode: false,
      body: customer2,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      customer2.id = response.body.id;
    });
  });

  it('should return all Customers', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/customer`,
      failOnStatusCode: false,
    })
      .its('body.data')
      .should('have.length', 2)
      .then((customers) => {
        cy.log(JSON.stringify(customers));
      });
  });

  it('should return Customer by Phone', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/customer/${customer.phone}`,
      failOnStatusCode: false,
    })
      .its('body.phone')
      .should('equal', customer.phone)
      .then((phone) => {
        cy.log(JSON.stringify(phone));
      });
  });

  it('should Edit Customer', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/customer/${customer.id}`,
      body: { id: customer.id, name: 'Diego Ferreira' },
    })
      .its('body')
      .then((body) => {
        expect('Diego Ferreira').to.eq(body.name);
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Customer', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/customer/${customer.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should Delete Customer with Address', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/customer/${customer2.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });
});
