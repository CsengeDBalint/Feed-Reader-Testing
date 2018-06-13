/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); 
            expect(allFeeds.length).not.toBe(0); 
        });

        // This test ensures that every feed has a defined and not empty URL.
        it('have a working URL', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined(); //forEach loops through every feed to test whether it has a defined
                expect(feed.url.length).toBeGreaterThan(0); // and not empty url
            });    
        });

        //This test ensures that every feed has a defined and not empty name.
        it ('have a defined name', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined(); //forEach loop examines every feed whether it has a defined name
                expect(feed.name.length).not.toBe(0); //the feed name is not empty
            });   
        });
    });
    //The test suite named "The menu" contains tests about the slide-menu elements' behaviour.
    describe('The menu', function(){
        // This test ensures the menu element is hidden by default. 
        const body = $('.menu-hidden');
        const menuIcon = $('.menu-icon-link')
        
        it('menu is hidden by default', function (){ 
            expect(body.hasClass('menu-hidden')).toBe(true); //slide-menu is hidden by default
        });
    
         /* This test ensures that the menu changes visibility when the menu icon is clicked.
          * The test should have two expectations: 
          * does the menu display when clicked and does it hide when clicked again.
          */
        it('clicked menu is displayed', function(){
            menuIcon.click(); // When the menu icon is clicked 
            expect(body.hasClass('.menu-hidden')).toBe(false); // the slide-menu  appears (menu-hidden class toggles)
        });

       it('menu clicked again disappears', function(){
            menuIcon.click(); //When menu icon will be clicked again,
            expect(body.hasClass('slide-menu')).toBe(false); // the slide-menu disappears again
        });
    });

    /*The test suite named "Initial Entries" contains an asynchronous test 
     *that ensures the proper work of the loadFeed function.
     *The test ensures that after the loadFeed function is called, 
      *there is at least a single .entry element within the .feed container.
     */
    describe('Initial Entries', function(){     
        beforeEach(function(done) { //Make sure feed is loaded, before testing
            loadFeed(0, function(){
                done();
            });
        });

        it('there is at least one entry after loadFeed function been called', function(done){
            let newEntry = $('.feed .entry');
            expect(newEntry.length).toBeGreaterThan(0); //there is at least a single feed, that not empty is
            done();
        });
    });
  
    /*This test suite named "New Feed Selection" has an asynchronous test 
     *that ensures after a new feed is loaded the content actually changes.
     */
    describe('New Feed Selection', function(){
        let feed1;
        let feed2;

        beforeEach(function(done){ 
            loadFeed(0, function(){ //Make sure the first feed will be loaded...
                feed1 = $('.feed').html();
                loadFeed(1, function() {
                    feed2 = $('.feed').html(); //Make sure the first feed will be loaded...
                    done(); //... before testing
                });
            });
        });

        it('new feed changes the content', function(done){
            expect(feed1 === feed2).toBe(false); // The feeds are different, so the content changes    
            done();
        });     
    });
}());  