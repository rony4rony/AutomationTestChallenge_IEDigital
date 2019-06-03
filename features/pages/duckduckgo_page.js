const {Selector} = require('testcafe')

module.exports = {

    url: `${process.env.TESTCAFE_URL}`,
    
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
        /*privacyLink: function()
        {
            return Selector('.js-popout-link').with({ boundTestRun: testController })
        },
        trafficLink: function()
        {
            return Selector('.fix:nth-child(2) > .showcase__text').with({ boundTestRun: testController })
        },
        TwoZeroOneEightTraffic: function()
        {
            return Selector('.blk__text:nth-child(3) > .traffic__year > .wrap').with({ boundTestRun: testController })
        },*/
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
        }
    }
}