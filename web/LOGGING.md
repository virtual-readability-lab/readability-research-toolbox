# Logging format

### Current Version 2.0.0

## Overview

To allow recording and review of experimental results, a log is kept of all user interaction with the application.
The log is kept as a JSON array; one entry for each control value change or other activity.
The values are kept in the browser's session settings. Each entry has an integer key, in the order of creation of 
each log record.

The log only records events where there is a change. 
So, for example, if **Reset all controls** is pressed, only those control values which differ from the default will 
be logged.

## Format details

Each log record is a JSON object, which contains the following keys:

 - datetime: The current date and time, in UTC form. Resolution to the ms.
 - controlName: The (internal) name of the affected controls. 
 - source: What kind of event or control caused the change. See **Sources** below for details.
 - oldValue: The current value of the control before the change occurs.
 - newValue: The value of the control after the change is made.

## Sources

 - init: items logged at the beginning of each session. The pseduo-control names are:
   - releaseVersion: the date of the web app's release - corresponds to the release notes in README.md
   - logFormat: a version number for the log format in use
   - colorOrder: since we randomize the ordering of the color swatches, the value is a comma-delimited list of the 
     background colors in the display order.
 - slider: a slider control where the user moved the slider - note that you will typically get several events for 
   one slider motion
 - step: the user clicked on the increase or decrease arrows on a slider
 - switch: the user toggled a binary switch
 - picker: the user chose a value from a drop down control
 - server: the user chose a local file to upload as a Custom reading passage
 - recipeCreate: <recipe name>: A new recipe was created. A record is logged for each non-default value in the recipe
 - recipeRestore: <recipe name>: A recipe button was clicked, restoring the controls to the value of the settings in 
   that recipe. A record is logged for each control which changed value. 
 - recipeDelete: <recipe name>: A recipe was deleted.
 - resetAll: The Reset all controls button was pressed. A record is logged for each control which changed value.
 - downloadLog: The log file was downloaded. The newValue is the name of the log file.