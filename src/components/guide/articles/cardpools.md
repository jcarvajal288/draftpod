
## Cardpools

For multi-player games where you play in person, you'll need to specify exactly what paper _cardpool_ you are drawing cards from. This is so that simulated booster packs accurately reflect the paper cards you have on hand. Once you've completed the draft or built your sealed deck, you will assemble decks for playing by pulling cards out of the cardpool. 

This article covers selecting a set of cards to play with, organizing them, and finally registering them with for use in multiplayer games.

### Selecting Cards 

The cards within a cardpool need to all come from the same set. Furthermore, you need at least 384 cards in the pool (8 players x 3 boosters x 15 cards/booster). In an ideal world, a cardpool will also have an equal number of cards of various rarities (for example, 3 of each common, 2 of each uncommon, and 1 of each rare and mythic). Having equal numbers of each card means that the cardpool will have no inherent bias towards specific cards, colors, or archetypes.

That said, it can be quite difficult to collect all of the cards in a set so your cardpool may not achieve a perfect balance. In our experience, if you purchase 2 booster boxes for a given set (72 packs) you will be able to assemble a cardpool that has 3 of each common, 2 of nearly all of the uncommons, and 1 of a significant majority of rares and mythics. It's also quite practical to build a cardpool from a single booster box and have lots of fun drafting it, it just won't have the same variety as one built from more cards.

It should also be noted that when booster packs are generated, lower-rarity cards are automatically substituted if there are not enough available of a given rarity level (for example, automatically substituting an uncommon if all of the rares have been utilized). This means it's also possible to build a cardpool consisting of only uncommons and commons (or even of only commons). 

See articles [Cube Design: Set Cubes](https://www.channelfireball.com/articles/cube-design-set-cubes/) and [9 Things You Need to Know about How to Make a Set Cube](http://www.metamox.com/blog/9-things-you-need-to-know-about-how-to-make-a-set-cube/) for additional discussion on creating set cubes.

### Organizing Cards

Once you've decided on the type of cardpool you want to build and obtained the cards for it, you need to organize it so it's ready for play. Organizing consists of 2 steps:

1. Sorting your cardpool by collector number (this is so it's easy to enter into a database and more importantly easy to pull cards from after drafting).

2. Entering the cardpool into an uploadable database (e.g. a CSV file).

The collector number of a Magic card indicates it's order within a given set. You can find the collector number for a card printed in the bottom left hand corner. For example, the collector numbers for these two cards (_Healer's Hawk_ and _Devious Cover Up_) are, respectively, 14 and 35:


<p>
<img src="/images/guide/grn-14-healer-s-hawk.png" width="48%" />&nbsp;&nbsp;
<img src="/images/guide/grn-35-devious-cover-up.png" width="48%" />
</p>

Sorting by collector number is actually easier that it sounds, since the order is essentially a grouping of cards by color, with cards arranged alphabetically within each color. So to sort by collector number, do the following:

1. Sort cards into a set of piles. There should be one pile for each color (multi-color cards, artifacts, and lands each get their own pile).

2. Sort cards alphabetically within each of these piles.

Once you've done this, you are ready to enter the cards into a cardpool database.


### Cardpool Database

Once you have a cardpool, you need register it so that it can build packs that correspond to the cards you have on hand. To do this you create a database of cards in the pool. We recommend using either <a href="https://www.deckedbuilder.com/">Decked Builder</a> or <a href="https://deckbox.org">Deckbox</a> for this, as both have excellent data entry features that make entering cards a snap (it takes about 20 minutes to enter an entire cardpool). 

Note that while we recommend Decked Builder or Deckbox, you can use any program you like for creating the database so long as it can export a file containing the cards in your pool. Export formats supported include Decked Builder collection files (.coll2), CSV files, as well as standard MTG decklist files (e.g. a line like "4x Arrester's Admonition" for each card).

#### Deckbox

If you are using Deckbox to manage your collection, you can export a compatible CSV file by using **Search &amp; Filter** to select the set you want to export cards from (in this example we've set **Edition Owned** to _Ravnica Allegiance_). 

Then, use the **Export** option available on the **Tools** menu to export a CSV:


<p>
<img src="/images/guide/deckbox.png" width="100%" />
</p>

When presented with the Deckbox CSV export options, you can accept the defaults. The downloaded CSV is now ready to use as a cardpool!

#### Decked Builder

To use Decked Builder, start by creating a new collection. Then, use the filtering UI in the top-left of the Decked Builder window to select your set, and order it by color. For example, here's Decked Builder setup to enter cards for a _Guilds of Ravnica_ cardpool:

<p>
<img src="/images/guide/decked-builder.png" width="100%" />
</p>

In this illustration we've already begun entering the quantities of cards within our cardpool (note the numbers overlaid on the cards in the middle pane). To enter the quantity of card, just select it (via mouse or arrow key) and press the number of you have. Since the display of cards in Decked Builder matches the way we've sorted our cardpool, it's very quick and easy to enter all of the cards.

Once you are done entering, be sure to save the collection to disk. You are now ready to use the cardpool!

### Uploading a Cardpool

When you create a new multi-player draft, you are given the option to use a variety of pre-set cardpools or a custom cardpool:

<p>
<img src="/images/guide/custom-cardpool.png" width="100%" />
</p>

Select the **New Custom Cardpool** option, then you'll be presented with the opportunity to upload your cardpool:

<p>
<img src="/images/guide/upload-cardpool.png" width="100%" />
</p>

Upload the collection file, CSV, or decklist file for your cardpool, assign the cardpool a name, then click the **Use Cardpool** button. You are now ready to use your cardpool.

Note that the cardpool is automatically saved for use in future drafts. Whenever you select the cardpool for play, you'll also be given the opportunity to update it's contents (in the case that you've added or removed cards from the pool):

<p>
<img src="/images/guide/update-cardpool.png" width="100%" />
</p>

As mentioned above, you aren't required to use Decked Builder or Deckbox when creating your cardpool database. Just about any CSV file exported by a collection manager or a standard MTG decklist file can be imported as a cardpool. If you find that the CSV you are importing doesn't work, please [submit an issue](https://github.com/jjallaire/draftpod/issues/new) and we'll try to make it work ASAP.

### Storing Cardpools

You should be sure to store your cardpool in collector number order, as decklists will be presented in that same order:

<p>
<img src="/images/guide/view-decklist.png" width="100%" />
</p>

Assuming your cards are ordered by collector number, pulling cards from a decklist takes only a couple of minutes.

#### Cases

A cardpool with 3 of every common, 2 of every uncommon, and 1 of each rare and mythic in a set will typically consist of around 550 cards. You can store 550 sleeved cards in a standard <a href="https://www.amazon.com/BCW-Count-Corrugated-Cardboard-Storage/dp/B07C5YZWYQ/">BCW 930 Count Cardboard Case</a> cardboard case:

<p>
<a href="https://www.amazon.com/BCW-Count-Corrugated-Cardboard-Storage/dp/B07C5YZWYQ/"><img src="/images/guide/bcw-case.jpg" width="100%" /></a>
</p>

You can also fit 550 sleeved cards into a <a href="https://www.amazon.com/Quiver-Carrying-Exterior-Dividers-Compatible/dp/B00XYC3MNI">Quiver Game Card Case</a>:

<p>
<a href="https://www.amazon.com/Quiver-Carrying-Exterior-Dividers-Compatible/dp/B00XYC3MNI"><img src="/images/guide/quiver-case.jpg" width="100%" /></a>
</p>

Finally, you may also want to pre-sleeve a set of lands. Assuming you use the same color sleeves for all of yours cardpools, the lands can of course be shared between multiple pools. <a href="https://www.amazon.com/Compartment-Trading-Pokemon-Gathering-Magnetic/dp/B07F96FH8P">The Monster Hydra 5 Deck Box</a> is a good way to store a set of lands:

<p>
<a href="https://www.amazon.com/Compartment-Trading-Pokemon-Gathering-Magnetic/dp/B07F96FH8P"><img src="/images/guide/monster-deckbox.jpg" width="100%" /></a>
</p>




















