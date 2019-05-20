/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

Cypress.Commands.add("containsClick", (type, contains) => {
    cy.get(type)
        .contains(contains)
        .click();
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

    cy.containsClick("button", "Iniciar");

    let characters = "abcde";

    for (let index = 0; index < questions; index++) {
        let res = "";

        res += characters.charAt(Math.floor(Math.random() * characters.length));

        cy.containsClick("span.style__squareContent__3DvbQ ", res.concat("."));

        cy.clickTest('button[id="nextButton"]');
    }

    cy.get('button[id="sendButton"]').click({ force: true });

    cy.containsClick("button", "Entregar simulado");

    cy.get("label").should("contain", "MEU DESEMPENHO");
});

Cypress.Commands.add("executeNewSimulatedEmpty", (questions, button) => {
    cy.get(".icon-start").click();

    cy.get(button).click();

    cy.containsClick("button", "Iniciar");

    cy.get('button[id="sendButton"]').click({ force: true });

    cy.get("p").should(
        "contain",
        "Responda pelo menos uma questão para entregar o simulado."
    );

    cy.get(".theme__navigation__wgwdj > .theme__button__2Agdx").click();

    cy.containsClick("span.style__squareContent__3DvbQ ", "a.").click();

    cy.get('button[id="sendButton"]').click({ force: true });

    /*    cy.get(".style__confirmButton__1dTBL").should(
        "contain",
        "Você não respondeu todas as questões."
    ); */

    cy.get(".style__answered__6Dm3n").should(
        "contain",
        "Você não respondeu todas as questões."
    );

    cy.get(".style__modal__Q0Khc > :nth-child(2)").should(
        "contain",
        "Deseja realmente entregar o simulado?"
    );

    cy.get(".style__confirmButton__1dTBL").click();
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

Cypress.Commands.add("mockRequestTime", () => {
    let mocks;

    cy.request(
        "http://processoseletivo.enade.saraivaeducacao.com.br/api/v3/mocks/"
    ).then((response) => {
        mocks = response.body.data.in_progress.mock_list;

        if (mocks["0"]) {
            console.log(mocks["0"]);

            cy.executeNewSimulatedDelay(
                mocks["0"].questions_count,
                `button[id="Disp_Começar_${mocks["0"].id}"]`,
                mocks["0"].duration_ms
            );
        } else {
            cy.get('a[id="start-mocks"]').click();
            cy.get("div").should("contain", "Nenhum simulado foi encontrado.");
        }
    });
});

Cypress.Commands.add(
    "executeNewSimulatedDelay",
    (questions, button, duration) => {
        cy.get(".icon-start").click();

        cy.get(button).click();

        cy.containsClick("button", "Iniciar");

        cy.wait(duration);

        cy.get("section").should("contain", "Atenção");
    }
);
