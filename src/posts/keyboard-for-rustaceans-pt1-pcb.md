---
title: Keyboard for Rustaceans - PCB Design
date: 2022-08-07 13:39:40
tags:
    - rust
    - keyboards
    - electronics
---

As I sat down to write some Rust one weekend, I felt that my keyboard did not
reflect my deep love for [Ferris the crab](https://rustacean.net/).

I dreamed of a keyboard perfect for a growing rustling:

- 34 keys, because minimalism.
- Bluetooth, because why not?
- Ferrises. Plural. Ferisi?

Nothing that can't be fixed. Let's get to work.

## The PCB

Lucky for me, some Rustaceans have come before me to build the perfect hand
temple to Ferris - there's the
[ferris](https://github.com/pierrechevalier83/ferris) and
[sweep](https://github.com/davidphilipbarr/Sweep) keyboard. Bless the open
source community.

I decided to fork off sweep, for a few reasons:

- Sweep is very close to what I wanted - 34 keys + Rust themed.
- Firmware support.
- Minimal number of components.

The last point in particular was very attractive. Sweep only requires a
ProMicro-like daughterboard - (almost) no surface mount components are needed.
Instead of a [matrix circuit](https://docs.qmk.fm/#/how_a_matrix_works) with
many diodes, each switch is wired directly to the controller:

![Schematic for Sweep](/img/ferris_keyboard_schematic.png)

For this keyboard to be exactly what I wanted, I only needed to make two
modifications:

- Customize the board shape for top edge to sit close to the keys.
- Feature more Ferris art.

While I've never used [KiCad](https://www.kicad.org/) before, I was able to
kickstart off Ben Vallack's excellent video on [editing Sweep's project
files](https://www.youtube.com/watch?v=JqpBKuEVinw). The internet always
provides.

Few learnings:

- Design Rules Checker is my friend. For KiCad it's in `Inspect` menu.
- Use `E` and `CMD+E` to edit footprints - e.g. scaling, rotating, flipping
  Ferris art.

After some fiddling, I have my dream keyboard PCB. It features a total 3x
Ferrises - two on the front soldermask, and one on the back screenprint. Art by
[whoisaldeka](https://twitter.com/whoisaldeka).

The edited KiCad files are available on
[Github](https://github.com/imlzo/Sweep).

![The Final Keyboard PCB](/img/ferris_keyboard_render.png)

## What's Next?

The gerber files are sent to the fab. Next up is assembly.

