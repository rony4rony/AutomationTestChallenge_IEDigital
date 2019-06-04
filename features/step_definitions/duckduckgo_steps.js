const { Given, When, Then } = require('cucumber');
const ClientFunction = require('testcafe').ClientFunction;
const { Selector } = require('testcafe');
const pageElements = require('../pages/duckduckgo_page.js');

var i, varSearchValue, arrLength

Given('I am browsing the duckduckgo.com website', async function () {
    await testController
        .navigateTo(pageElements.url)
});

//AC1
Then('I expect to see the duckduckgo logo on the page', async function () {
    var LogoExists = await pageElements.DDGElements.websiteLogo().exists
    if(LogoExists)
        await testController
            .expect(pageElements.DDGElements.websiteLogo().visible).ok()
});

//AC2
When('I enter the keyword super in the search textbox', async function () {
    varSearchValue = pageElements.commonFunctions.fnArrayDataList(0)
    await testController
        .typeText(pageElements.DDGElements.searchTextbox(), varSearchValue)
});

Then('I should see ten matching resuts in the dropdown', async function () {
    await testController
        .expect(pageElements.DDGElements.searchDropdown().count).eql(10)
});

//AC3
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

//AC4
When('I click on the hamburger menu on the top right', async function () {
    pageElements.commonFunctions.isAddToChromePopupPresent()
    await testController
        .typeText(pageElements.DDGElements.searchTextbox(), 'enter a text to display the hamburger')  
        .click(pageElements.DDGElements.harmBurgerButton())
        //.wait(20000)
});

Then('I should see a themes link', async function () {
    var themesText = await pageElements.DDGElements.themesLink().innerText
    await testController
        .expect(pageElements.DDGElements.themesLink().innerText).eql(themesText)
});

//AC5
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

//AC6
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

//AC7
Given('I am on the traffic page', async function () {
    await testController
        .navigateTo(pageElements.trafficURL)
});

When('I click on the 2018 Traffic section', async function () {
    await testController
        .click(pageElements.DDGElements.TwoZeroOneEightTrafficSection())
        
});

Then('I should see all the months listed in the order from Dec to Jan and Total Direct Queries should be equal to the sum of months', async function () {
    var i, monthlyTraffic, yearlyTraffic = 0, monthFromWeb, monthFromFunction, totalTrafficFromWeb
    for (i = 2; i <= 13; i++)
    {
        monthFromWeb = await pageElements.DDGElements.elementsOfMonths(1, i).innerText
        monthFromWeb = monthFromWeb.substring(0, monthFromWeb.indexOf(' '))
        
        monthFromFunction = await pageElements.commonFunctions.monthsOfYear(i - 2)

        monthlyTraffic = await pageElements.DDGElements.elementsOfMonths(2, i).nth(1).innerText
        monthlyTraffic = parseInt(monthlyTraffic.replace(/\,/g,''))
        yearlyTraffic = yearlyTraffic + monthlyTraffic

        await testController
            .expect(monthFromWeb).eql(monthFromFunction)
        
        //console.log('monthFromWeb: ' + monthFromWeb + ', monthFromFunction: ' + monthFromFunction + ', yearlyTraffic: ' + yearlyTraffic)
    } 
    totalTrafficFromWeb = await pageElements.DDGElements.TwoZeroOneEightTotalTraffic().innerText
    totalTrafficFromWeb = parseInt(totalTrafficFromWeb.replace(/\,/g,''))

    await testController
        .expect(yearlyTraffic).eql(totalTrafficFromWeb)
});



