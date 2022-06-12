const injuryTable = [
    null,
    {
        name: '-',
        effect: 'Woe.',
        recovery: 'immediate'
    },
    {
        name: 'Shattered Nerves',
        effect: 'You are Frightened of the one who injured you until they die or you recover. You can attempt a DC 15 Wisdom save on your turn to overcome the fear until your next turn.',
        recovery: 'short rest / attacker dies'
    },
    {
        name: 'Winded',
        effect: 'On your next turn, you cannot both move and act, only one or the other.',
        recovery: 'end of your next turn'
    },
    {
        name: 'Retaliation',
        effect: 'Without using your reaction, you may make a weapon attack or cast a cantrip against the creature that had you make this roll, or the nearest hostile creature.',
        recovery: 'immediate'
    },
    {
        name: 'Battlescar',
        effect: 'A part of you is violently and forever marked.',
        recovery: 'short rest'
    },
    {
        name: 'Hurled Back',
        effect: 'Exhaustion. You are knocked back 15 ft. and fall prone with a sickening thud.',
        recovery: 'short rest'
    },
    {
        name: 'Smashed Mouth',
        effect: 'Blood, spit and teeth go flying everywhere. Gain tempoary hit points equal to your level.',
        recovery: 'long rest'
    },
    {
        name: 'Black Eye',
        effect: 'You are Blinded until the end of your next turn.',
        recovery: 'long rest'
    },
    {
        name: 'Crippling Blow',
        effect: 'Exhaustion. You are Stunned by the pain.',
        recovery: 'end of your next turn'
    },
    {
        name: '-',
        effect: 'Woe.',
        recovery: 'immediate'
    },
    {
        name: 'Concussion',
        effect: 'Unconscious. Wake up at the end of your turn after d4 rounds.',
        recovery: 'long rest'
    },
    {
        name: 'Lost Finger',
        effect: "One of your fingers is severed or torn off. You drop whatever's in that hand.",
        recovery: 'long rest'
    },
    {
        name: 'Broken Nose',
        effect: 'You are unable to use your sense of smell.',
        recovery: 'long rest'
    },
    {
        name: 'Head Trauma',
        effect: 'Exhaustion. Unconscious for d10 minutes. You gain a new Flaw: you have memory issues, a tic, or other mannerism.',
        recovery: 'long rest'
    },
    {
        name: 'Cold Fury',
        effect: 'The next attack roll you make that hits will critically hit.',
        recovery: 'immediate'
    },
    {
        name: 'Broken Toes',
        effect: 'You immediately fall Prone. You can no longer Dash.',
        recovery: 'long rest'
    },
    {
        name: 'Broken Ribs',
        effect: 'Exhaustion. You cannot add Dexterity to your AC or to Dexterity saving throws.',
        recovery: 'extended rest'
    },
    {
        name: 'Bloody Mess',
        effect: "Exhaustion. You're gonna need a lot of stitches after this!",
        recovery: 'long rest'
    },
    {
        name: 'Broken Hand',
        effect: 'Cannot hold anything with that hand nor use it for somatic spellcasting.',
        recovery: 'extended rest'
    },
    {
        name: '-',
        effect: 'Woe.',
        recovery: 'immediate'
    },
    {
        name: 'Adrenaline',
        effect: 'Lose one level of exhaustion. Gain temp HP equal to twice your level. You have advantage on all d20 rolls until the end of your next turn.',
        recovery: 'immediate'
    },
    {
        name: 'Severed Ear',
        effect: 'Disadvantage on perception checks relying on hearing.',
        recovery: 'long rest'
    },
    {
        name: 'Gouged Eye',
        effect: 'Disadvantage on perception checks relying on sight and on ranged attack rolls.',
        recovery: 'extended rest'
    },
    {
        name: 'Surprise Recovery',
        effect: "Recover from a random injury.",
        recovery: 'immediate'
    },
    {
        name: 'Broken Arm',
        effect: 'Exhaustion. Cannot use that arm. You can still hold items, but cannot attack using that arm, nor benefit from an equipped shield, nor use it for Somatic spellcasting.',
        recovery: 'extended rest'
    },
    {
        name: 'Broken Leg',
        effect: 'Exhaustion. You immediately fall Prone. From now on, your walking speed is halved and you cannot Dash.',
        recovery: 'extended rest'
    },
    {
        name: 'Shattered Jaw',
        effect: 'You suffer great pain when talking. Verbal spellcasting requires a DC 15 Concentration check. If you fail, the spell fails and the spell slot is wasted.',
        recovery: 'extended rest'
    },
    {
        name: 'Skull Fracture',
        effect: 'Exhaustion. Unconscious for d4 hours. Your head now has a nasty dent. Make DC 15 Intelligence save or gain a form of indefinite madness.',
        recovery: 'extended rest'
    },
    {
        name: 'Severed Arm',
        effect: 'Exhaustion. Your arm is cut or torn off, or otherwise requires amputation.',
        recovery: 'extended rest'
    },
    {
        name: '-',
        effect: 'Woe.',
        recovery: 'immediate'
    },
    {
        name: 'Frenzy',
        effect: 'You experience a moment of boundless fury. You may immediately take an extra turn.',
        recovery: 'immediate'
    },
    {
        name: 'Ruptured Organ',
        effect: 'Exhaustion. Death’s Door. You suffer an injury that could easily lead to your death.',
        recovery: 'extended rest'
    },
    {
        name: 'Mental Breakdown',
        effect: 'Exhaustion. Death’s Door. You are a nervous wreck. Roll for indefinite madness.',
        recovery: 'extended rest'
    },
    {
        name: 'Severed Leg',
        effect: 'Exhaustion. Death’s Door. Your Speed is halved, you cannot Dash, and you are permanently Prone.',
        recovery: 'extended rest'
    },
    {
        name: 'Shattered Spine',
        effect: 'Exhaustion. Your walking Speed is reduced to 5 and you are permanently Prone.',
        recovery: 'extended rest'
    },
    {
        name: 'Heroic Death',
        effect: 'You know your time has come. Immediately take a turn, during which time you have no exhaustion and have advantage on all rolls. Afterwards, you die gloriously.',
        recovery: 'revivify'
    },
    null,
    null,
    null,
    null,
    {
        name: 'Sudden Death',
        effect: 'You die immediately, with only enough time to utter your final words.',
        recovery: 'revivify'
    },
    null,
    null,
    null,
    null,
    {
        name: 'Annihilation',
        effect: 'You die immediately and your broken body is destroyed. Nothing remains of your passing but bloody pulp and a grisly stain.',
        recovery: 'resurrection'
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {
        name: 'What Have You Done?',
        effect: "Seriously, you've really blown it this time.",
        recovery: "perhaps you could bribe your dungeon master?"
    }
]

function getInjury(result, injuries, size) {
    let injury = injuryTable[result]

    if (injury) {
        if (injuries.find(i => i == injuryTable.indexOf(injuryTable[result]))) {
            
            let duplicate = rollDice('1d' + size)
            log.push("Duplicate (" + injury.name + ", " + result + "+" + duplicate + ')')
            console.log("Duplicate! ", injury.name, injury.result)
            
            injury = getInjury(result + duplicate, injuries, size)
        }
        else if (injury.effect == 'Woe.') {
            let woe = rollDice('1d10')
            log.push("Woe! (" + result + "+" + woe + ')')
            injury = getInjury(result + woe, injuries, size, log)
            console.log("Woe!", injury.result)
            
        } else {
            injury.result = result
        }
    } else if (result > 0) {
        let newResult = result
        do {
            newResult--
        } while (!injuryTable[newResult])
        injury = injuryTable[newResult]
        injury.result = result
    } 

    if (injury) return injury
    else console.log('Error: invalid injury result: ' + result)
}