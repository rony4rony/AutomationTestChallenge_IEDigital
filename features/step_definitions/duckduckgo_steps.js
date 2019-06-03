const { Given, When, Then } = require('cucumber');
const ClientFunction = require('testcafe').ClientFunction;
const { Selector } = require('testcafe');
const pageElements = require('../pages/duckduckgo_page.js');

var i, varSearchValue, arrLength

Given('I am browsing the duckduckgo.com website', async function () {
    await testController
        .navigateTo(pageElements.url)
});

Then('I expect to see the duckduckgo logo on the page', async function () {
    await testController
        .expect(pageElements.DDGElements.websiteLogo().visible).ok()
});

When('I enter the keyword super in the search textbox', async function () {
    varSearchValue = pageElements.commonFunctions.fnArrayDataList(0)
    await testController
        .typeText(pageElements.DDGElements.searchTextbox(), varSearchValue)
});

Then('I should see ten matching resuts in the dropdown', async function () {
    await testController
        .expect(pageElements.DDGElements.searchDropdown().count).eql(10)
});

When('I enter a specific keyword in the search textbox', async function () {
    varSearchValue = pageElements.commonFunctions.fnArrayDataList(1)
    await testController
        .typeText(pageElements.DDGElements.searchTextbox(), varSearchValue)
});

When('I hit the search button', async function () {
    await testController
        .click(pageElements.DDGElements.searchButton())
});

Then('I should see the expected result as the first item search list', async function () {
    var searchResult = await pageElements.commonFunctions.fnArrayDataList(2)
    await testController
        .expect(pageElements.DDGElements.searchResults().nth(0).innerText).contains(searchResult)
});

When('I click on the hamburger menu in the top right', async function () {
    await testController
        .typeText(pageElements.DDGElements.searchTextbox(), 'enter a text to display the hamburger')
        .click(pageElements.DDGElements.harmBurgerButton())
});

Then('I should see a themes link', async function () {
    await testController
        .expect(pageElements.DDGElements.themesLink().visible).ok()
});

When('I click on the theme link and select the dark theme', async function () {
    await testController
        .click(pageElements.DDGElements.themesLink())
        .click(pageElements.DDGElements.darkTheme())
});

Then('I will see the dark theme is applied', async function () {
    var themeColor = await pageElements.DDGElements.darkTheme().getStyleProperty('background-color')
    var pageColor = await pageElements.DDGElements.pageSettings().getStyleProperty('background-color')
    await testController
        .expect(themeColor).eql(pageColor)  
});

When('I search keywords one after another, I see 10 results each', async function () {
    arrLength = await pageElements.commonFunctions.fnArrayDataList("length")
    for (var i = 3; i < arrLength; i++)
    {
        varSearchValue = pageElements.commonFunctions.fnArrayDataList(i)
        await testController
            .typeText(pageElements.DDGElements.searchTextbox(), varSearchValue)
        if (i == 3)
            await testController
                .click(pageElements.DDGElements.searchButton())
        else
            await testController
                .click(pageElements.DDGElements.searchButtonResultPage())
                .expect(pageElements.DDGElements.searchResults().count).gte(10)  
                .selectText(pageElements.DDGElements.searchTextbox())
                .pressKey('delete')
    }
});



