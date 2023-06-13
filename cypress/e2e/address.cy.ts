import res from './mocks.json';

describe('Address Spec', () => {
  let customer = { id: 0, ...res.customers.DIEGO };
  let customer2 = { id: 0, ...res.customers.PRISCILA };

  let address = { id: 0, customer, ...res.addressess.addss01 };
  let address2 = { id: 0, customer: customer2, ...res.addressess.addss03 };

  before(() => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customers`,
      failOnStatusCode: false,
      body: customer,
    }).then((response) => {
      customer.id = response.body.id;
      cy.log(JSON.stringify(customer));
    });

    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/customers`,
      failOnStatusCode: false,
      body: customer2,
    }).then((response) => {
      customer2.id = response.body.id;
      cy.log(JSON.stringify(customer2));
    });
  });

  it('should create address', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/addressess`,
      body: address,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      address.id = response.body.id;
    });
  });

  it('should create address2', () => {
    cy.request({
      method: 'POST',
      url: `${res.BASE_URL}/addressess`,
      body: address2,
    }).then((response) => {
      expect(201).equal(response.status);
      cy.log(JSON.stringify(response.body));
      address2.id = response.body.id;
    });
  });

  it('should return all addressess', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/addressess`,
    })
      .its('body.data')
      .should('have.length', 2)
      .then((addresses) => {
        cy.log(JSON.stringify(addresses));
      });
  });

  it('should return address by id', () => {
    cy.request({
      method: 'GET',
      url: `${res.BASE_URL}/addressess/${address2.id}`,
    })
      .its('body')
      .then((adrs) => {
        expect(adrs.id).equal(address2.id);
        cy.log(JSON.stringify(adrs));
      });
  });

  it('should update address by id', () => {
    cy.request({
      method: 'PUT',
      url: `${res.BASE_URL}/addressess/${address.id}`,
      body: res.addressess.addss02,
    })
      .its('body')
      .then((adrs) => {
        address = adrs;
        expect(adrs.id).equal(address.id);
        expect(adrs.number).equal(res.addressess.addss02.number);
        expect(adrs.district).equal(res.addressess.addss02.district);
      });
  });

  it('should delete address 1', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/addressess/${address.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  it('should delete address 2', () => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/addressess/${address2.id}`,
    })
      .its('body')
      .then((body) => {
        cy.wrap(body).should('be.empty');
        cy.log(JSON.stringify(body));
      });
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/customers/${customer.id}`,
    });
    cy.request({
      method: 'DELETE',
      url: `${res.BASE_URL}/customers/${customer2.id}`,
    });
  });
});
