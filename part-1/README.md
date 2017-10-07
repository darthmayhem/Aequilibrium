# Part 1: Aequilibrium | The Castle Company

## The Problem Domain

Aequilibrium is in the business of building castles (we really aren’t, but let’s pretend). Now, we also
believe in quality aesthetics, so we only want to build castles in two types of places:

1. Peaks
2. Valleys

Let’s say you have an array of integers that describes a stretch of land, where each integer represents the
current height of the land. Can you write a function that reads that array and returns the number of
castles that Aequilibrium should build on that stretch of land? You can write this solution in whatever
language you like.

**You can make the following assumptions:**
* You can always build a castle at the start of the array, provided it is non-empty
* We only want to build one castle per peak or valley.
* A peak is an integer or series of integers that is above the immediately preceding and following
ints. For example, in the sequence [2,6,6,6,3] the sequence of 3 6s is a peak.
* A valley is an integer or series of integers that is below the immediately preceding and
following ints. For example, in the sequence [6,1,4] the "1" would be a valley.

### Execution

To run the completed example:

```
node app.js
```

A valid sample input array would look like:
```
105,102,112,115,120,119,102,101,100,103,105,110,109,105,100,106
```

## Developer Notes and Assumptions

* Assumes a non empty array of integer values for input.  All other inputs are determined invalid.
