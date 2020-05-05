# Shield titles

- These are purely aesthetic, but show a graphic/visual to show how YOU as a commander of your troops are ranking up.

The Java Clone uses this list of shield options (with their corresponding image having .jpg appended to their names):
["Stablehand","Serf","Peon","Page","Squire","Guard","High Guard","Knight","Baron","Earl","Duke","Lord"]

The Java Clones algorithm to determine what shield title a player is currently ranked at is as follows:
Using the list above, assume it's indexed from 1 (Stablehand) to 12 (Lord)
- If on mission 1, index = battle number (battle 1 = stablehand, battle 2 = serf, battle 3 = peon)
- If on mission 2+, index = mission number + 2 (mission 2 = Page, mission 3 = Squire, and so on)

We have only four pieces of data from guide screenshots.

- Mission 1 battle 1 shows Stablehand [Java clone shows correct value]
- mission 1 battle 2 appears to show Stablehand (cropped on youtube video) [Java clone incorrect, shows Serf]
- mission 1 battle 3 shows Peon [Java clone correct]
- mission 8 battle 1 shows Guard II [Java clone incorrect, shows Earl]

The screenshots show the existing of a status followed by a number (Guard II), which the Java clone does not use at all.
Therefore it's possible that many of the ranks had that concept - a Knight I and a Knight II, for example.
However, we simply don't know.

Java Clone also bases your rank based off your mission / battle progress.
However based on the context of the image in the game, it's possible it should be based off the villages saved (and possible the lost item being retrieved).

A decision has to be made for this clone - while it's clear the Java Clone is not 100% correct, anything we propose would be equally incorrect, and his solution seems 'good enough' so we will just adopt it. The risk is minimal here, as it does not affect gameplay.
