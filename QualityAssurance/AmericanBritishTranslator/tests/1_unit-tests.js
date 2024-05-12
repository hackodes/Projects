const chai = require("chai")
const assert = chai.assert

const Translator = require("../components/translator.js")
let translator = new Translator()

suite("Unit Tests", () => {
  test("Translate to British English - Mangoes are my favorite fruit", function (done) {
    const input = "Mangoes are my favorite fruit."
    const expectedOutput = "Mangoes are my favourite fruit."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - I ate yogurt for breakfast", function (done) {
    const input = "I ate yogurt for breakfast."
    const expectedOutput = "I ate yoghurt for breakfast."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - We had a party at my friend's condo", function (done) {
    const input = "We had a party at my friend's condo."
    const expectedOutput = "We had a party at my friend's flat."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - Can you toss this in the trashcan for me?", function (done) {
    const input = "Can you toss this in the trashcan for me?"
    const expectedOutput = "Can you toss this in the bin for me?"

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - The parking lot was full", function (done) {
    const input = "The parking lot was full."
    const expectedOutput = "The car park was full."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - Like a high tech Rube Goldberg machine.", function (done) {
    const input = "Like a high tech Rube Goldberg machine."
    const expectedOutput = "Like a high tech Heath Robinson device."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - To play hooky means to skip class or work.", function (done) {
    const input = "To play hooky means to skip class or work."
    const expectedOutput = "To bunk off means to skip class or work."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - No Mr. Bond, I expect you to die.", function (done) {
    const input = "No Mr. Bond, I expect you to die."
    const expectedOutput = "No Mr Bond, I expect you to die."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - Dr. Grosh will see you now.", function (done) {
    const input = "Dr. Grosh will see you now."
    const expectedOutput = "Dr Grosh will see you now."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to British English - Lunch is at 12:15 today.", function (done) {
    const input = "Lunch is at 12:15 today."
    const expectedOutput = "Lunch is at 12.15 today."

    assert.equal(translator.translateBritishEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - We watched the footie match for a while.", function (done) {
    const input = "We watched the footie match for a while."
    const expectedOutput = "We watched the soccer match for a while."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - Paracetamol takes up to an hour to work.", function (done) {
    const input = "Paracetamol takes up to an hour to work."
    const expectedOutput = "Tylenol takes up to an hour to work."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - First, caramelise the onions.", function (done) {
    const input = "First, caramelise the onions."
    const expectedOutput = "First, caramelize the onions."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - I spent the bank holiday at the funfair.", function (done) {
    const input = "I spent the bank holiday at the funfair."
    const expectedOutput = "I spent the public holiday at the carnival."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - I had a bicky then went to the chippy.", function (done) {
    const input = "I had a bicky then went to the chippy."
    const expectedOutput = "I had a cookie then went to the fish-and-chip shop."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - I've just got bits and bobs in my bum bag.", function (done) {
    const input = "I've just got bits and bobs in my bum bag."
    const expectedOutput = "I've just got odds and ends in my fanny pack."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - The car boot sale at Boxted Airfield was called off.", function (done) {
    const input = "The car boot sale at Boxted Airfield was called off."
    const expectedOutput = "The swap meet at Boxted Airfield was called off."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - Have you met Mrs Kalyani?", function (done) {
    const input = "Have you met Mrs Kalyani?"
    const expectedOutput = "Have you met Mrs. Kalyani?"

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - Prof Joyner of King's College, London.", function (done) {
    const input = "Prof Joyner of King's College, London."
    const expectedOutput = "Prof. Joyner of King's College, London."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Translate to American English - Tea time is usually around 4 or 4.30.", function (done) {
    const input = "Tea time is usually around 4 or 4.30."
    const expectedOutput = "Tea time is usually around 4 or 4:30."

    assert.equal(translator.translateAmericanEnglish(input)[0], expectedOutput)
    done()
  })

  test("Highlight translation - Mangoes are my favorite fruit", function (done) {
    const input = "Mangoes are my favorite fruit."
    const expectedOutput = 'Mangoes are my <span class="highlight">favourite</span> fruit.'

    assert.equal(translator.translateBritishEnglish(input)[1], expectedOutput)
    done()
  })

  test("Highlight translation - I ate yogurt for breakfast", function (done) {
    const input = "I ate yogurt for breakfast."
    const expectedOutput = 'I ate <span class="highlight">yoghurt</span> for breakfast.'

    assert.equal(translator.translateBritishEnglish(input)[1], expectedOutput)
    done()
  })

  test("Highlight translation - We watched the footie match for a while.", function (done) {
    const input = "We watched the footie match for a while."
    const expectedOutput = 'We watched the <span class="highlight">soccer</span> match for a while.'

    assert.equal(translator.translateAmericanEnglish(input)[1], expectedOutput)
    done()
  })

  test("Highlight translation - Paracetamol takes up to an hour to work.", function (done) {
    const input = "Paracetamol takes up to an hour to work."
    const expectedOutput = '<span class="highlight">Tylenol</span> takes up to an hour to work.'

    assert.equal(translator.translateAmericanEnglish(input)[1], expectedOutput)
    done()
  })
})
