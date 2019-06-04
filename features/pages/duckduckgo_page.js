const {Selector} = require('testcafe')

module.exports = {

    url: `${process.env.TESTCAFE_URL}`,
    trafficURL:`https://start.duckduckgo.com/traffic`,
    
    DDGElements: 
    {       
        websiteLogo: function()
        {
            return Selector('.logo-wrap--home').with({boundTestRun: testController})
        },
        searchTextbox: function()
        {
            return Selector('.js-search-input').with({boundTestRun: testController})
        },
        searchDropdown: function()
        {
            return Selector('.acp').with({ boundTestRun: testController })
        },
        searchButton: function()
        {
            return Selector('#search_button_homepage').with({ boundTestRun: testController })
        },
        searchButtonResultPage: function()
        {
            return Selector('#search_button').with({ boundTestRun: testController })
        },
        harmBurgerButton: function() 
        {
            return Selector('.js-side-menu-open').with({ boundTestRun: testController })
        },
        themesLink: function() 
        {
            return Selector('.clear > a').with({ boundTestRun: testController })
        },
        searchResults: function() 
        {
            return Selector('.result__a').with({ boundTestRun: testController })
        },
        darkTheme: function() 
        {
            return Selector('.set-themes__wrapper:nth-child(4) > .set-theme').with({ boundTestRun: testController })
        }, 
        pageSettings: function() 
        {
            return Selector('.page-settings').with({ boundTestRun: testController })
        },        
        TwoZeroOneEightTrafficSection: function()
        {
            return Selector('.blk__text:nth-child(3) > .traffic__year > .wrap').with({ boundTestRun: testController })
        },
        TwoZeroOneEightTotalTraffic: function()
        {
            return Selector('.blk__text:nth-child(3) .traffic__year__right > h2').with({ boundTestRun: testController })
        },
        elementsOfMonths: function(i, j)
        {
            switch (i)
            {
                case 1: //MONTH 2 to 13 (Dec to Jan)
                    {
                        return Selector('.blk__text:nth-child(3) .traffic__month:nth-child(' + j + ') h3').with({ boundTestRun: testController })
                    }
                case 2: //MONTHLY TRAFFIC - from child 2 to 13 (Dec to Jan) 
                    {
                        return Selector('.blk__text:nth-child(3) .traffic__month:nth-child(' + j + ') > div > div > h2').with({ boundTestRun: testController })
                    }
            }
        },        
    },

    commonFunctions:
    {
        fnArrayDataList: function(i) 
        {
            arrayDataList = [   "super",
                                "supercalafragalistic",
                                "Supercalifragilisticexpialidocious",
                                "Back to the future",
                                "BMX Bandits",
                                "Rocky IV",
                                "Short Circuit",
                                "The Terminator",
                                "Ferris Buellers day off"
                            ]
            if (i != "length")
                return arrayDataList[i] 
            else
                return arrayDataList.length
        },
        monthsOfYear: function(x)
        {
            var arrmonthsOfYear = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            arrmonthsOfYear.reverse()
            return arrmonthsOfYear[x]
        },
        isAddToChromePopupPresent: async function()
        {
            var addToChromeExists = await Selector('.js-badge-link-dismiss').with({ boundTestRun: testController }).exists
            if(addToChromeExists)
                await testController
                    .click(Selector('.js-badge-link-dismiss').with({ boundTestRun: testController })) 
        }
    }    
}