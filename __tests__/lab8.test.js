describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    const entry1 = entries[0];
    // await entry1.click();
    // await page.goto('http://127.0.0.1:5500/#entry1');
    const [response] = await Promise.all([
      entry1.click(), // Clicking the link will indirectly cause a navigation
      page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
    ]);
    const url = page.url();
    // console.log(url);
    const includeEntry = url.includes('/#entry1');
    expect(includeEntry).toBe(true);
    
    // const header = headerText.innerHTML;
    // expect(header).toBe("Entry 1");

  },30000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    // const entries = await page.$$('journal-entry');
    // const entry1 = entries[0];
    // const [response] = await Promise.all([
    //   entry1.click(), // Clicking the link will indirectly cause a navigation
    //   page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
    // ]);
    // const textContent = await page.evaluate(() => {
    //   return document.querySelector('header > h1');
    // });
    const element = await page.waitForSelector("header > h1");
    const title = await page.evaluate(element => element.textContent, element);
    expect(title).toBe("Entry 1");

  },30000);

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    const expectEntry = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };
    const entry = await page.$eval('entry-page', (e) => e.entry);
    expect(entry).toEqual(expectEntry);

    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    const bodyClass = await page.$eval('body', (e) => e.className);
    expect(bodyClass).toBe('single-entry');
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const settingsBtn = await page.$('header > img');
    const [response] = await Promise.all([
      settingsBtn.click(), // Clicking the link will indirectly cause a navigation
      page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
    ]);
    const url = page.url();
    const includeSetting = url.includes('/#settings');
    expect(includeSetting).toBe(true);

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toEqual("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyClass = await page.$eval('body', (e) => e.className);
    expect(bodyClass).toBe('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    page.waitForNavigation('networkidle2');
    const url = page.url();
    const includeSetting = url.includes('/#entry1');
    expect(includeSetting).toBe(true);



  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    // implement test10: Clicking on the back button should update the URL to be homepage
    await page.goBack();
    page.waitForNavigation('networkidle2');
    const url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');



  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    // implement test10: When the user if on the homepage, the header title should be “Journal Entries”
    const header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toEqual("Journal Entries");



  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On home page - checking <body> element classes', async () => {
    // implement test9: should update the class attribute of <body> to null
    const bodyClass = await page.$eval('body', (e) => e.className);
    expect(bodyClass).toBe('');

  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second<journal-entry>, new URL should contain /#entry2', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry2”
    const entries = await page.$$('journal-entry');
    const entry2 = entries[1];
    const [response] = await Promise.all([
      entry2.click(), // Clicking the link will indirectly cause a navigation
      page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
    ]);
    const url = page.url();
    const includeEntry = url.includes('/#entry2');
    expect(includeEntry).toBe(true);

  },30000);


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    // implement test15: pdate the header to be “Entry 2”
    const header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toEqual("Entry 2");

  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    const expectEntry = {
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    };
    const entry = await page.$eval('entry-page', (e) => e.entry);
    // console.log(entry);
    expect(entry).toEqual(expectEntry);

    
  }, 10000);

  it('Test17: Clicking on the title text will redirect to home page', async() =>{
    const homeBtn = await page.$('header > h1');
    const [response] = await Promise.all([
      homeBtn.click(), // Clicking the link will indirectly cause a navigation
      page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
    ]);
    const url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  });

  it('Test18: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    // implement test3: Clicking on the third journal entry should update the URL to contain “/#entry3”
    const entries = await page.$$('journal-entry');
    const entry3 = entries[2];
    const [response] = await Promise.all([
      entry3.click(), // Clicking the link will indirectly cause a navigation
      page.waitForNavigation('networkidle2') // The promise resolves after navigation has finished after no more than 2 request left
    ]);
    const url = page.url();
    const includeEntry = url.includes('/#entry3');
    expect(includeEntry).toBe(true);

  },30000);


  // define and implement test15: Verify the title is current when clicking on the third entry
  it('Test19: Verify the title is current when clicking on the third entry', async () => {
    // implement test15: pdate the header to be “Entry 2”
    const header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toEqual("Entry 3");

  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the third entry
  it('Test20: On Third Entry page - checking <entry-page> contents', async () => {
    const expectEntry = {
      title: 'Ogres are like onions',
      date: '4/27/2021',
      content: 'Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.',
      image: {
        src: 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg',
        alt: 'shrek and donkey looking confused'
      }
    };
    const entry = await page.$eval('entry-page', (e) => e.entry);
    // console.log(entry);
    expect(entry).toEqual(expectEntry);

    
  }, 10000);

});
