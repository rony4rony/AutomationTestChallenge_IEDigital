@DuckDuckGo

Feature: DuckDuckGo search engine featuers
    As a user
    I need to do try some featuers of duckduckgo.com search engine
    So that I can do search as well as change the settings of the website

    Background:
        Given I am browsing the duckduckgo.com website

    @AC1
    Scenario: Logo should be visible
        Then I expect to see the duckduckgo logo on the page

    @AC2
    Scenario: Typing the keyword "super" must show 10 matching results
        When I enter the keyword super in the search textbox
        Then I should see ten matching resuts in the dropdown

    @AC3
    Scenario: Search for keyword supercalafragalistic should give the result Supercalifragilisticexpialidocious
        When I enter a specific keyword in the search textbox 
        When I hit the search button
        Then I should see the expected result as the first item search list

    @AC4
    Scenario: The hamburger menu click should show the themes link
        When I enter the keyword super in the search textbox
        When I click on the hamburger menu in the top right
        Then I should see a themes link

    @AC5
    Scenario: The color change in themes should change the background color
        When I click on the hamburger menu in the top right
        When I click on the theme link and select the dark theme
        Then I will see the dark theme is applied

    @AC6
    Scenario: Search for the given datas in the datalist should give ten result each
        When I search keywords one after another, I see 10 results each

    
            

 


