# Reading Controls Tester

This app is intended as a framework for creating experiments to study how different aspects of various text display 
properties affect readability. 
Users view short passages in a reading pane. 
A control panel allows the user to 
select values for many aspect of text presentation, e.g. font family, font size, spacings, colors, several kinds of 
reading rules, etc.

## Basic operation

In its simplest form, the Reading Controls Tester is a straightforward React-based web app.
Internally to Adobe, the app can be accessed at `https://reading-controls.labs.acrobat.com/`.
The user chooses one of a set of pre-installed reading passages with the **File name** drop-down.
The user may then vary the settings on any of the controls on the left, and immediately see their effect on the 
display of the passage.

For slider controls, clicking on the left and right arrows move the slider by one step, allowing for finer-grain 
precision.
Clicking on the Undo arrow on the right resets the slider to its original default value.

The **Reset all controls** button in the lower right resets all controls to their default value.

## Recipes

A *Recipe* is a collection of saved control settings.
To create a Recipe, set the controls as you see fit. 
Then in the **Recipes** area at the bottom of the controls panel, click on the plus sign to create a new Recipe.
This will save all the current control values internally. 
You will be prompted for a name for the Recipe. Type `Enter` to save the name.

You can create as many Recipes as you like. 
Clicking on one of the Recipe buttons will restore the saved values in that Recipe.

To remove a recipe, click on the `x` in the Recipe's button.

## Custom reading passages

***NOTE: This functionality must not be used outside of Adobe at this time***

Double-clicking on the **File name** control reveals a file chooser control. 
Use this to select a PDF file on your local machine.
The file will be uploaded and converted into the format needed by the Tester.

The feature has not been extensively tested, and there may be many kinds of PDFs which will not function well. 
Use at your own risk.

## Developers

See [DEVELOPERS.md](./DEVELOPERS.md)

## Release notes

### 2021/11/04

- Moved backend code to a different project
- Added Apache 2.0 license and copyrights
- Move git origin to VRL (https://github.com/virtual-readability-lab/research-readability-toolbox)

### 2021/11/02

- New admin menu, accessed via Shift-DoubleClick on the word "Recipes"
- Recipes can now be imported and exported (via controls on the admin menu)
- Admin menu also allows disabling of recipe creation and/or deletion

### 2021/10/04

- Slider controls now have increase and decrease buttons. Click on the left or right arrows to increase or decrease 
  the value of the slider by one step.
- Renamed Settings => Recipe
- README, DEVELOPERS, and LOGGING documentation pages
- Switched to a reusable React hook for making REST requests
- Reformatted and refactored the logging system. See LOGGING.md for details.

### 2021/09/28a

- Saved settings: the ability to save control settings (locally and only for the session).  
  When you have a settings collection you like, press the + button next to Saved Settings. You'll be prompted for a 
  name and a button will be created. Just press that button to restore your saved settings. Make as many saved sets 
  as you'd like. Press on the 'x' to delete a saved set.
- CSS adjusted to use the whole vertical space in the screen

### 2021/09/28

- Reading ruler now auto-aligns to the lines in the text.  
  The scroll wheel will move the ruler to the next or previous line with each click. You can still use the scroll bar 
  to move longer distances, but when you end a scroll move, we get lined up on the nearest line.
  Touch doesn't work well yet - need more thought on what the analog of a mouse wheel click should be.
- The sliders are aligned to make things look a bit neater.


### 2021/09/07

- changed extension for log to .doc
- added individual reset controls for slider
- changed some control min values

### 2021/09/02

- moved ruler to 25% from top (vs. middle ot the screen)
- lowered the step value for paragraph indent
- changed some control labels
- fixed disable cursor
- contrast slider disabled when background color is white

### 2021/09/01

- center the reading panel horizontally
- pass scroll events thru ruler
- underline ruler wasn't turning off when it should
- added a passage from Change Agent
- logged the color order
- dark mode
- contrast control
- paragraph spacing control

### 2021/08/30

- text-indent limits
- randomize the color order - couldn't randomize the controls, however.
- moved scroll bar closer to reading view
- fixed alignment of ruler overlay
- switched colors of underline rules based on text background color
- ruler height is now proportional to font size and line height (but not synchronized with text yet)
- removed shadow root logic - since we're not using LM CSS any more we don't need it
- text-indent only works for paragraphs now.
- removed units from control labels
- text colors
- using the fonts from Tian's study

### 2021/08/23

- added some sample documents and a simple file chooser
- double click on simple file chooser to get to the arbitrary upload
- fix the shadow root problem when we had one previously installed
- hide <stem> element
- exclude Orchestrator from Dockerfile
- Reset all controls button
- Activity logging

### 2021/08/20

- new color pickers
- text indent control
- we now use the "shadow DOM" technique to load the LM HTML. That keeps the very aggressive CSS from affecting the rest of the web app, but still allows us to adjust the styling.
- attempted to isolate the LM HTML inside an iframe, to limit the affect of the LM CSS, which is very aggressive.
however, CORS won't let us affect the styles inside the iframe, so our controls don't work.
- generated html goes into a folder per file, so refs to css, images, etc. now handled correctly
- deployment for backend
- favicon
- change some props to ems - allow negative word/char spacing

### 2021/07/31

- call out to non-streaming colorado to convert to FTPDF before invoking pdfStructure
- iniital backend implementation. file chooser in UI uploads file to backend where it is processed via pdfStructure to return the html.
- padding on reading view with ruler

### 2021/07/20

- More controls for formatting the ruler
- Makefile working on windows
- deployment of web container is working~~~~
- lots of text controls working
- Initial controls and viewing panes
- showing canned content

### 2021/07/16

- initial version
