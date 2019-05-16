/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

Cypress.Commands.add("login", (login, password) => {
    if (login && password) {
        cy.get('input[name="user[email]"]', { timeout: 150000 }).type(login);

        cy.get('input[name="user[password]"]', { timeout: 150000 }).type(
            password
        );

        cy.get("input")
            .contains("Entrar")
            .click();
    } else {
        cy.get("input")
            .contains("Entrar")
            .click();
    }
});

Cypress.Commands.add("clickTest", (data) => {
    cy.get(data).click({ force: true });
});

Cypress.Commands.add("mockRequest", () => {
    let mocks;

    cy.request(
        "http://processoseletivo.enade.saraivaeducacao.com.br/api/v3/mocks/"
    ).then((response) => {
        mocks = response.body.data.in_progress.mock_list;

        if (mocks["0"]) {
            cy.executeNewSimulated(
                mocks["0"].questions_count,
                `button[id="Disp_Começar_${mocks["0"].id}"]`
            );
        } else {
            cy.get('a[id="start-mocks"]').click();
            cy.get("div").should("contain", "Nenhum simulado foi encontrado.");
        }
    });
});

Cypress.Commands.add("executeNewSimulated", (questions, button) => {
    cy.get(".icon-start").click();

    cy.get(button).click();

    cy.get("button")
        .contains("Iniciar")
        .click();

    let characters = "abcde";

    for (let index = 0; index < questions; index++) {
        let res = "";

        res += characters.charAt(Math.floor(Math.random() * characters.length));

        cy.get("span.style__squareContent__3DvbQ ")
            .contains(res.concat("."))
            .click();

        cy.clickTest('button[id="nextButton"]');
    }

    cy.get('button[id="sendButton"]').click({ force: true });

    cy.get("button")
        .contains("Entregar simulado")
        .click();

    cy.get("label").should("contain", "MEU DESEMPENHO");
});

Cypress.Commands.add("executeNewSimulatedEmpty", (questions, button) => {
    cy.get(".icon-start").click();

    cy.get(button).click();

    cy.get("button")
        .contains("Iniciar")
        .click();

    for (let index = 0; index < questions; index++) {
        cy.clickTest('button[id="nextButton"]');
    }

    cy.get('button[id="sendButton"]').click({ force: true });

    cy.get("button")
        .contains("Entregar simulado")
        .click();

    cy.get("label").should("contain", "MEU DESEMPENHO");
});

Cypress.Commands.add("mockRequestEmpty", () => {
    let mocks;

    cy.request(
        "http://processoseletivo.enade.saraivaeducacao.com.br/api/v3/mocks/"
    ).then((response) => {
        mocks = response.body.data.in_progress.mock_list;

        if (mocks["0"]) {
            cy.executeNewSimulatedEmpty(
                mocks["0"].questions_count,
                `button[id="Disp_Começar_${mocks["0"].id}"]`
            );
        } else {
            cy.get('a[id="start-mocks"]').click();
            cy.get("div").should("contain", "Nenhum simulado foi encontrado.");
        }
    });
});
