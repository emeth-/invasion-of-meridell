JAVA CLONE (followed by screenshot verified values in parenthesis)

Mission 1:
    Draco_Moehog
        Health: 8-12 (8,9,10,11,12)
        Attack: 5-9 (6,7,8,9)
        Defense: 6-12 (6,7,8,9,12)

Mission 2:
    Draco_Techo
        Health: 12-16
        Attack: 9-13
        Defense: 8-14

Mission 3:
    Draco_Skeith
        Health: 12-16 (14)
        Attack: 9-13
        Defense: 8-14 (13)

Mission 4:
    Draco_Scorchio
        Health: 14-18
        Attack: 12-16
        Defense: 12-16

Mission 5:
    Draco_Grundo
        Health: 15-19
        Attack: 13-16
        Defense: 15-17

Mission 6:
    Draco_Moehog
        Health: 17
        Attack: 17
        Defense: 17
    Draco_Buzz
        Health: 21
        Attack: 21
        Defense: 21

Mission 7:
    Draco_Techo
        Health: 18
        Attack: 18
        Defense: 18
    Draco_Buzz*2
        Health: 21
        Attack: 21
        Defense: 21
    Draco_Buzz*1
        Health: 29
        Attack: 25
        Defense: 25

Mission 8:
    Draco_Skeith
        Health: 19
        Attack: 19
        Defense: 19
    Draco_Grarrl*2
        Health: 22
        Attack: 22
        Defense: 22
    Draco_Grarrl*2
        Health: 23
        Attack: 21
        Defense: 21

Mission 9:
    Draco_Scorchio
        Health: 20
        Attack: 20
        Defense: 20
    Draco_Grarrl*4
        Health: 22
        Attack: 22
        Defense: 22
    Draco_Grarrl*1
        Health: 29
        Attack: 26
        Defense: 26

Mission 10:
    Draco_Grundo
        Health: 23
        Attack: 23
        Defense: 23
    Draco_Buzz*1
        Health: 21
        Attack: 21
        Defense: 21
    Draco_Buzz*1
        Health: 29
        Attack: 27
        Defense: 27
    Draco_Grarrl*2
        Health: 22
        Attack: 22
        Defense: 22
    Draco_Grarrl*1
        Health: 29
        Attack: 27
        Defense: 27


////////Notes from various guides////////
[youtube description]
-In missions 1-5, the different attackers have different attack and defense stats from each other. It is smart to target the ones with weakest defense first, or if they have the same, the one with strongest attack first. [Java clone matches this fine]
- In missions 6+, the basic attackers all have identical stats so just try to defeat the ones that may be ganging up on a single troop of yours. [Java clone matches this fine]


http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
Mission 6
- Note the Meohogs are stronger than when you first faced them, so don't take them lightly but you should start by converting the Meohogs and then the buzzes, when you reach them you'll see why. [Java clone matches this fine]

Mission 8
- Mission 8 was the toughest for me, these Grarrls have high attack and low defence [Java clone does NOT match this]

Mission 9
- Mission 9 is easy just very very long, the Grarrls are back but don't hit nearly as often, however their defence has gotten boosted, shame. [Java clone does NOT match this]

[youtube description]
--Mission 6--
-Don't be scared off by the buzz's stats. They don't seem to be able to attack you much at all. The defence is true, however. [Java clone does NOT match this]

-------------

# Buzz/Graarl discussion

## Mission 6

Java clone has these values for Buzz in mission 6:

Draco_Buzz
  Health: 21
  Attack: 21
  Defense: 21

But based on this new text found in a guide:
> Mission 6: Concentrate on converting the invader Moehogs first as the invader Buzzes have a defence of 25 and are really tedious to convert.

And combined with this text found in a youtube video description on mission 6:
> Don't be scared off by the buzz's stats. They don't seem to be able to attack you much at all. The defence is true, however. [Java clone does NOT match this]

It seems like the java values are incorrect, and the defense should be higher and the attack lower. This matches my playthrough experience of the Java version, where I felt the Buzzes scaled too high too fast.

However... we do see [a guide](http://www.neopets.com/ntimes/index.phtml?section=66017&week=185) that says this:

> Normal Enemies: The limits are: 21 health, 19 strength, and 19 defense. Buzzes and Grarrls: Exactly 23 health, 21 strength, and 21 defense.

Unfortunately the guide is slightly ambiguous here. It speaks of the limits (max values) for normal enemies, but then for Buzzes and Grarrls it uses the word 'exactly', which feels out of place if it is speaking about the limits (max values) for them. So it could be saying Buzzes/Grarrls always have exactly those values, or it could be saying those are the highest values that Buzzes/Grarrls can have.

The source of the guide is a post in the Neopets 'newspaper' itself, but it is player submitted and shows a simplistic level of knowledge about the game, particularly in the second wave. The defense value of 21 directly contradicts what we see in another guide with more information about the second wave (which pegs the value at 25)... therefore, I'm inclined to believe this guide with these 'limit'/'exactly' values are incorrect as to the entire second wave, but may be correct at a specific point in time / specific mission (perhaps mission 9 - where another guide notes "Mission 9 is easy just very very long, the Grarrls are back but don't hit nearly as often, however their defence has gotten boosted, shame").

Factoring in all the above, we will adjust the mission 6 values to these numbers:

Draco_Buzz
  Health: 21
  Attack: 18
  Defense: 25

## Mission 7

Unfortunately, none of the resources I compiled have any notes on mission 7. However, as they contain tips on missions 6, 8, and 9, the lack of notes on mission 7 is itself telling. That means no new tricks, it likely feels/is played the same as mission 6. For that reason, I will keep the same stats for Buzz in mission 7, with the main change being more buzzes get spawned, and you fight the Invader Techos (which are slightly stronger than the invader Moehogs).

## Mission 8

Java clone values:

Draco_Skeith
    Health: 19
    Attack: 19
    Defense: 19
Draco_Grarrl*2
    Health: 22
    Attack: 22
    Defense: 22
Draco_Grarrl*2
    Health: 23
    Attack: 21
    Defense: 21

But text from guides:

> Mission 8 was the toughest for me, these Grarrls have high attack and low defence, you will need to keep 2 moves for your Grundo to heal each turn, make sure to keep all your characters up high in health.

> Mission 9 is easy just very very long, the Grarrls are back but don't hit nearly as often, however their defence has gotten boosted, shame. (implication being that Grarrls have higher attack and lower defense in the previous mission, mission 8)

That contradicts the Java clone values. Unfortunately we don't have specific numbers from any guides, but for diversity of gameplay I think it makes sense to make the the Grarrls be the inverse of Buzzes (high attack/low defense, instead of low attack/high defense). This matches the guides.

Factoring in all the above, we will adjust the mission 8 values for the Grarrls to be the inverse of the Buzz values in mission 6. It's still more difficult, because high attack and losing one of your troops is drastically worse than high defense just consuming more time.

Draco_Grarrl*4
Health: 21
Attack: 25
Defense: 18

## Mission 9

Java Clone values:

Draco_Scorchio
  Health: 20
  Attack: 20
  Defense: 20
Draco_Grarrl*4
  Health: 22
  Attack: 22
  Defense: 22
Draco_Grarrl*1
  Health: 29
  Attack: 26
  Defense: 26


Guide notes:

> Mission 9 is easy just very very long, the Grarrls are back but don't hit nearly as often, however their defence has gotten boosted, shame.

Accepting this guide's statement as truth, we start with the mission 8 values we decided on, then alter them as per the parenthesis:
  Health: 21
  Attack: 25 (lower)
  Defense: 18 (higher)

How much do we raise and lower the values, though? We could just increase defense by 3 (to 21), and lower attack by 3 (to 22).

However, we do have [this guide's](http://www.neopets.com/ntimes/index.phtml?section=66017&week=185) statement on wave 2, which we discarded earlier:

> Normal Enemies: The limits are: 21 health, 19 strength, and 19 defense. Buzzes and Grarrls: Exactly 23 health, 21 strength, and 21 defense.

There we decided they could not be correct with regards to all of wave 2 - but it is likely they were correct with regards to one specific point in phase 2 (perhaps the point they were at when they wrote the guide). Their numbers are nearly identical to what we are estimating we should set the values at, with just +2 health and -1 attack.

I think we adopt their numbers here, since they are within the range of what is reasonable. Therefore, the final Grarrl values for Mission 9 will be:

Health: 23
Attack: 21
Defense: 21

Which follows all guide statements, and is really close to the Java Clone version as well.

## Mission 10

Java Clone values:

Draco_Grundo
    Health: 23
    Attack: 23
    Defense: 23
Draco_Buzz*1
    Health: 21
    Attack: 21
    Defense: 21
Draco_Buzz*1
    Health: 29
    Attack: 27
    Defense: 27
Draco_Grarrl*2
    Health: 22
    Attack: 22
    Defense: 22
Draco_Grarrl*1
    Health: 29
    Attack: 27
    Defense: 27

It seems the big change in mission 10 is a combination of both Buzzes AND Grarrls attacking, rather than just one or the other.

We have no guide/screenshot information for this mission, and we've already deviated from the Java Clone values in the preceding few missions.

I think it best to assume the major innovation for this mission is the Buzz/Grarrl combo, and we just keep the stats for them from the preceding missions.

The biggest question is whether to use Mission 8 Grarrls (which have high attack and low defense) or Mission 9 Grarrls (with more normalized stats). Given that for now we are accepting the Java Clone's values for Draco_Grundo on this level (23/23/23), the mission 9 Grarrls (23/21/21) are just weaker than the Draco_Grundos - which isn't right, as the special units should be stronger than the normal units.

Because of that, we will use the Mission 8 Grarrls here - with the caveat that if we need to lower the Draco_Grundo stats in level 10 for balance purposes in the future, we should strongly consider swapping to Mission 9 Grarrls here as well.

Draco_Buzz
  Health: 21
  Attack: 18
  Defense: 25

Draco_Grarrl
  Health: 21
  Attack: 25
  Defense: 18
