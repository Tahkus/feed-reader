/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    describe('RSS Feeds', function() {
        /* Test to determine if the allFeeds variable is defined
         * and that it is not empty. This expects allFeeds to be 
         * defined, and that the length is not 0.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Test which loops through allFeeds to make sure each
         * feed has a URL and that the URL is not empty. This 
         * expects a URL for each feed to be defined, and that
         * the URL length is not 0.
         */
        it('each feed has a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test which loops through allFeeds to make sure each
         * feed has a name and that the name is not empty. This
         * expects that each feed's name is defined and that the
         * length of the name is not 0.
         */
         it('each feed has a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    describe('The menu', function() {

        /* This test makes sure the menu is hidden by default. It
         * expects it to be true that the body has a class of 
         * 'menu-hidden'.
         */
         it('is hidden as default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         /* This test makes sure that the menu changes (visible
          * or hidden) when clicked on. After the first click, we
          * check that the body no longer has the class of 'menu-hidden'.
          * We then run another click and check to confirm that the 
          * body DOES now have the class of 'menu-hidden'.
          */
         it('changes position when clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });


    describe('Initial Entries', function() {

        /* This test is to make sure there is at least one .entry element
         * present in the .feed container after loading the application.
         * We run the loadFeed function first within beforeEach (since it is
         * asynchronous), set the feed variable, and then test that the feed's
         * children (entries) have length greater than 0.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('should have at least a single .entry element in the .feed container', function (done) {
            const feed = document.querySelector('.feed');
            expect(feed.children.length).toBeGreaterThan(0);
            done();
         });

    });


    describe('New Feed Selection', function() {

        /* This test makes sure that when the loadFeed function runs,
         * the content within the feed actually changes. We first run
         * loadFeed within beforeEach (since loadFeed is asynchronous),
         * We then set the feed1 variable to be what is currently in
         * the feed. We then load the feed again, and expect the current
         * feed not to equal feed1.
         */
        const feed = document.querySelector('.feed');
        const feed1 = [];
        const feed2 = [];

        beforeEach(function(done) {
            loadFeed(0)
            Array.from(feed.children).forEach(function(entry) {
                feed1.push(entry.innerText);
            })
            loadFeed(1, done);
        });

        it('should have content that changes when the loadFeed function runs', function() {
            Array.from(feed.children).forEach(function(entry) {
                feed2.push(entry.innerText);
            });
            expect(feed1 === feed2).toBe(false);
        });
    });
}());
