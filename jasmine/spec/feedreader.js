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


    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('urls are defined', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('names are defined', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });


  /* A test suite for "The hamburger menu" */
  describe('Hamburger Menu', function() {
    /* A test that ensures the menu element is
     * hidden by default.
     */
    it('menu is hidden by default', function() {
      var $body = $('body');
      expect($body.hasClass('menu-hidden')).toBe(true);
    });

    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('menu click toggles visibility', function() {
      var $body = $('body'),
        $menuIcon = $('.menu-icon-link');

      $menuIcon.click();
      expect($body.hasClass('menu-hidden')).toBe(false);
      $menuIcon.click();
      expect($body.hasClass('menu-hidden')).toBe(true);
    });
  });

  /* A test suite for "Initial Entries" */
  describe('Initial Entries', function() {
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    //use beforeEach to setup async call to loadFeed
    beforeEach(function(done) {
      loadFeed(1, done);
    });

    it("there is at least one .entry element within the .feed container", function(done) {
      var entries = document.querySelector(".feed").getElementsByClassName("entry").length;
      expect(entries).toBeGreaterThan(0);
      done();
    });
  });

  /* A test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
     var $origContent = '';
     var $newContent = '';

     /* Use beforeEach to setup async call to loadFeed
      * Call loadFeed once to get the original content
      * which is saved to the $origContent variable.
      * Call loadFeed a seond time to get the updated content
      * which is saved to the $newConent variable.
      */
     beforeEach(function(done) {
       loadFeed(0, function() {
         $origContent = $('.feed .entry');
         console.log($origContent.html());
         loadFeed(1, done);
       });
     });

     it('when new feed is loaded content actually changes', function(done) {
       $newContent = $('.feed .entry');
       console.log($newContent.html());
       expect($newContent.html()).not.toBe($origContent);
       done();
     });
  });
}());
